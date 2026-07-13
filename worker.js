const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const CERTIFICATE_ROUTE = "/certificados";
const API_ROUTE = "/api/certificados";
const CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Accept, Content-Type",
};

function jsonResponse(body, status = 200, extraHeaders = {}) {
    return new Response(JSON.stringify(body), {
        status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-Content-Type-Options": "nosniff",
            ...CORS_HEADERS,
            ...extraHeaders,
        },
    });
}

function normalizeId(rawValue) {
    try {
        return decodeURIComponent(String(rawValue || "")).trim().toLowerCase();
    } catch {
        return "";
    }
}

function isUuid(id) {
    return UUID_REGEX.test(id);
}

function safeCertificatePayload(record) {
    const certificate = record?.certificate || {};
    const holder = record?.holder || {};

    return {
        number: record?.certificateNumber || null,
        score: typeof record?.score === "number" ? record.score : record?.score ?? null,
        holder: {
            fullName: holder?.fullName || null,
            documentType: holder?.documentType || null,
            document: holder?.document || null,
        },
        activity: certificate?.activity || null,
        issueDate: certificate?.issueDate || null,
        expirationDate: certificate?.expirationDate || null,
        hours: typeof certificate?.hours === "number" ? certificate.hours : certificate?.hours ?? null,
        additionalInfo: certificate?.additionalInfo || null,
        issuer: record?.issuer?.name || record?.issuer?.title || record?.issuerName || null,
    };
}

function buildCacheHeaders(cacheControl) {
    return {
        "Cache-Control": cacheControl,
        "X-Content-Type-Options": "nosniff",
    };
}

async function fetchAsset(env, request, pathname) {
    const url = new URL(request.url);
    url.pathname = pathname;
    return env.ASSETS.fetch(new Request(url.toString(), request));
}

async function fetchCertificatePage(env, request) {
    const candidates = [CERTIFICATE_ROUTE, `${CERTIFICATE_ROUTE}.html`, `${CERTIFICATE_ROUTE}/index.html`, "/index.html"];

    for (const pathname of candidates) {
        const response = await fetchAsset(env, request, pathname);
        if (response.status !== 404) {
            return response;
        }
    }

    return new Response("Not found", { status: 404 });
}

function parseCertificateIdFromPath(pathname) {
    const parts = pathname.split("/").filter(Boolean);

    if (parts.length !== 3 || parts[0] !== "api" || parts[1] !== "certificados") {
        return null;
    }

    return normalizeId(parts[2]);
}

async function handleCertificateApi(request, env) {
    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: {
                ...CORS_HEADERS,
                "X-Content-Type-Options": "nosniff",
            },
        });
    }

    if (request.method !== "GET") {
        return jsonResponse(
            {
                valid: false,
                status: "METHOD_NOT_ALLOWED",
                message: "El método no está permitido.",
            },
            405,
            buildCacheHeaders("no-store")
        );
    }

    const url = new URL(request.url);
    const id = parseCertificateIdFromPath(url.pathname);

    if (!id || !isUuid(id)) {
        console.log({
            event: "certificate_validation",
            result: "INVALID_ID",
            certificateNumber: null,
            dni: "X",
            country: request.cf?.country ?? "XX",
        });

        return jsonResponse(
            {
                valid: false,
                status: "INVALID_ID",
                message: "El código del certificado no es válido.",
            },
            400,
            buildCacheHeaders("no-store")
        );
    }

    try {
        const rawValue = await env.CERTIFICADOS.get(`cert:${id}`);

        if (!rawValue) {
            console.log({
                event: "certificate_validation",
                result: "NOT_FOUND",
                certificateNumber: null,
                dni: "X",
                country: request.cf?.country ?? "XX",
            });

            return jsonResponse(
                {
                    valid: false,
                    status: "NOT_FOUND",
                    message: "No existe un certificado asociado al código escaneado.",
                },
                404,
                buildCacheHeaders("public, max-age=300, s-maxage=300")
            );
        }

        const stored = JSON.parse(rawValue);
        const payload = safeCertificatePayload(stored);

        console.log({
            event: "certificate_validation",
            result: "VALID",
            certificateNumber: stored?.certificateNumber ?? null,
            dni: String(stored?.holder?.document || "X").replace(/\D/g, "").slice(0, 3) || "X",
            country: request.cf?.country ?? "XX",
        });

        return jsonResponse(
            {
                valid: true,
                certificate: payload,
                certificateNumber: stored?.certificateNumber ?? null,
                issuer: {
                    name: stored?.issuer?.name || stored?.issuer?.title || stored?.issuerName || null,
                },
            },
            200,
            buildCacheHeaders("public, max-age=31536000, s-maxage=31536000, immutable")
        );
    } catch (error) {
        console.log({
            event: "certificate_validation",
            result: "ERROR",
            certificateNumber: null,
            dni: "X",
            country: request.cf?.country ?? "XX",
        });

        return jsonResponse(
            {
                valid: false,
                status: "SERVICE_ERROR",
                message: "No fue posible verificar el certificado en este momento.",
            },
            502,
            buildCacheHeaders("no-store")
        );
    }
}

export default {
    async fetch(request, env) {
        const url = new URL(request.url);
        const pathname = url.pathname;

        if (pathname === "/api" || pathname === API_ROUTE || pathname.startsWith(`${API_ROUTE}/`)) {
            return handleCertificateApi(request, env);
        }

        if (pathname === CERTIFICATE_ROUTE || pathname.startsWith(`${CERTIFICATE_ROUTE}/`)) {
            return fetchCertificatePage(env, request);
        }

        return env.ASSETS.fetch(request);
    },
};
