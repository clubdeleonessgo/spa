"use client";

import { useEffect, useMemo, useState } from "react";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const CERTIFICATE_PATH = "/certificados";
const LOCAL_MOCK_ENABLED = process.env.NEXT_PUBLIC_CERTIFICADOS_LOCAL_MOCK === "true";
const LOCAL_MOCK_CERTIFICATE_JSON = process.env.NEXT_PUBLIC_CERTIFICADOS_LOCAL_CERTIFICATE_JSON || "";
const CERTIFICADOS_API_BASE_URL = process.env.NEXT_PUBLIC_CERTIFICADOS_API_BASE_URL || "";

const normalizeId = (rawValue) => {
    try {
        return decodeURIComponent(String(rawValue || "")).trim().toLowerCase();
    } catch {
        return "";
    }
};

const getIdFromPathname = (pathname) => {
    const cleanPath = pathname.replace(/\/+$/, "") || "/";

    if (cleanPath === CERTIFICATE_PATH) {
        return "";
    }

    if (!cleanPath.startsWith(`${CERTIFICATE_PATH}/`)) {
        return "";
    }

    return normalizeId(cleanPath.slice(CERTIFICATE_PATH.length + 1).split("/")[0]);
};

const formatDocument = (documentValue) => {
    return String(documentValue || "").trim();
};

const buildApiUrl = (id) => {
    const path = `/api/certificados/${encodeURIComponent(id)}`;
    return CERTIFICADOS_API_BASE_URL ? `${CERTIFICADOS_API_BASE_URL.replace(/\/+$/, "")}${path}` : path;
};

const isValidationSuccess = (payload) => {
    return payload && payload.valid === true && payload.certificate;
};

const parseLocalMockResponse = () => {
    if (!LOCAL_MOCK_ENABLED) {
        return null;
    }

    if (!LOCAL_MOCK_CERTIFICATE_JSON) {
        return {
            valid: false,
            status: "SERVICE_ERROR",
            message: "No fue posible verificar el certificado en este momento.",
        };
    }

    try {
        const parsed = JSON.parse(LOCAL_MOCK_CERTIFICATE_JSON);
        const certificate = parsed?.certificate || {};
        const holder = parsed?.holder || {};

        return {
            valid: true,
            certificate: {
                number: parsed?.certificateNumber || null,
                holder: {
                    fullName: holder?.fullName || null,
                    documentType: holder?.documentType || null,
                    document: holder?.document || null,
                },
                activity: certificate?.activity || null,
                issueDate: certificate?.issueDate || null,
                hours: typeof certificate?.hours === "number" ? certificate.hours : certificate?.hours ?? null,
                additionalInfo: certificate?.additionalInfo || null,
                issuer: parsed?.issuer?.name || parsed?.issuer?.title || parsed?.issuerName || null,
            },
            certificateNumber: parsed?.certificateNumber || null,
            issuer: {
                name: parsed?.issuer?.name || parsed?.issuer?.title || parsed?.issuerName || null,
            },
        };
    } catch {
        return {
            valid: false,
            status: "SERVICE_ERROR",
            message: "No fue posible verificar el certificado en este momento.",
        };
    }
};

const DetailRow = ({ label, value }) => {
    if (value === null || value === undefined || value === "") {
        return null;
    }

    return (
        <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</p>
            <p className="mt-1 text-base font-medium text-zinc-900">{value}</p>
        </div>
    );
};

const StatusCard = ({ tone, title, message, action }) => {
    const toneStyles = {
        green: "border-emerald-200 bg-emerald-50 text-emerald-950",
        red: "border-red-200 bg-red-50 text-red-950",
        amber: "border-amber-200 bg-amber-50 text-amber-950",
        zinc: "border-zinc-200 bg-zinc-50 text-zinc-900",
    };
    const titleStyles = {
        green: "bg-emerald-600 text-white",
        red: "bg-red-700 text-white",
        amber: "bg-amber-600 text-white",
        zinc: "bg-zinc-900 text-white",
    };

    return (
        <section className={`rounded-3xl border p-6 shadow-sm sm:p-8 ${toneStyles[tone] || toneStyles.zinc}`}>
            <div className="flex flex-col gap-4">
                <div className={`inline-flex w-fit rounded-full px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] ${titleStyles[tone] || titleStyles.zinc}`}>
                    {title}
                </div>
                <p className="max-w-2xl text-base leading-7">{message}</p>
                {action}
            </div>
        </section>
    );
};

const CertificateValidationPage = () => {
    const [mounted, setMounted] = useState(false);
    const [pathname, setPathname] = useState("");
    const [refreshToken, setRefreshToken] = useState(0);
    const [state, setState] = useState({
        phase: "loading",
        data: null,
        error: null,
        id: "",
    });

    useEffect(() => {
        setMounted(true);

        const updatePath = () => setPathname(window.location.pathname);
        updatePath();

        window.addEventListener("popstate", updatePath);

        return () => window.removeEventListener("popstate", updatePath);
    }, []);

    useEffect(() => {
        if (mounted && pathname === CERTIFICATE_PATH) {
            window.location.replace("/");
        }
    }, [mounted, pathname]);

    const id = useMemo(() => getIdFromPathname(pathname), [pathname]);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        if (!id) {
            setState({
                phase: "invalid",
                data: null,
                error: "Ingresá un código de certificado válido.",
                id: "",
            });
            return;
        }

        if (!UUID_REGEX.test(id)) {
            setState({
                phase: "invalid",
                data: null,
                error: "El código del certificado no es válido.",
                id,
            });
            return;
        }

        const controller = new AbortController();

        setState({
            phase: "loading",
            data: null,
            error: null,
            id,
        });

        if (LOCAL_MOCK_ENABLED) {
            const mockResponse = parseLocalMockResponse();

            setState({
                phase: mockResponse?.valid ? "valid" : "service_error",
                data: mockResponse,
                error: mockResponse?.message || null,
                id,
            });
            return () => controller.abort();
        }

        (async () => {
            try {
                const response = await fetch(buildApiUrl(id), {
                    method: "GET",
                    headers: { Accept: "application/json" },
                    signal: controller.signal,
                });

                const payload = await response.json().catch(() => null);

                if (!response.ok) {
                    const message = payload?.message || "No fue posible verificar el certificado en este momento.";

                    setState({
                        phase: response.status === 404 ? "not_found" : "service_error",
                        data: payload,
                        error: message,
                        id,
                    });
                    return;
                }

                if (!isValidationSuccess(payload)) {
                    setState({
                        phase: "service_error",
                        data: payload,
                        error: payload?.message || "No fue posible verificar el certificado en este momento.",
                        id,
                    });
                    return;
                }

                setState({
                    phase: "valid",
                    data: payload,
                    error: null,
                    id,
                });
            } catch (error) {
                if (error?.name === "AbortError") {
                    return;
                }

                setState({
                    phase: "service_error",
                    data: null,
                    error: "No fue posible verificar el certificado en este momento.",
                    id,
                });
            }
        })();

        return () => controller.abort();
    }, [mounted, id, refreshToken]);

    const retry = () => {
        setRefreshToken((value) => value + 1);
    };

    const payload = state.data?.certificate || null;
    const holder = payload?.holder || {};

    const content = useMemo(() => {
        if (state.phase === "loading" || !mounted) {
            return (
                <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 w-56 rounded-full bg-zinc-200" />
                        <div className="h-10 w-full rounded-2xl bg-zinc-100" />
                        <div className="h-5 w-3/4 rounded bg-zinc-100" />
                        <div className="h-5 w-2/3 rounded bg-zinc-100" />
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="h-20 rounded-2xl bg-zinc-100" />
                            <div className="h-20 rounded-2xl bg-zinc-100" />
                        </div>
                    </div>
                </section>
            );
        }

        if (state.phase === "valid") {
            return (
                <StatusCard
                    tone="green"
                    title="CERTIFICADO VÁLIDO"
                    message=""
                    action={(
                        <div className="space-y-4">
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-900/70">
                                El presente certificado corresponde a:
                            </p>
                            <div className="rounded-3xl bg-white/80 p-4 sm:p-6">
                                <h1 className="h2 text-emerald-950">{holder.fullName}</h1>
                                {holder.document ? (
                                    <p className="mt-2 text-base font-semibold text-emerald-950">
                                        {holder.documentType ? `${holder.documentType}: ` : ""}
                                        {formatDocument(holder.document)}
                                    </p>
                                ) : null}
                            </div>
                            <div className="grid gap-3 sm:grid-cols-2">
                                <DetailRow label="Certificado N.º" value={state.data?.certificateNumber} />
                                <DetailRow label="Actividad" value={payload?.activity} />
                                <DetailRow label="Fecha de Actividad" value={payload?.issueDate} />
                                <DetailRow label="Carga horaria" value={typeof payload?.hours === "number" ? `${payload.hours} horas` : payload?.hours} />
                                <DetailRow label="Institución emisora" value={payload?.issuer || state.data?.issuer?.name || state.data?.issuerName} />
                                <DetailRow label="Información adicional" value={payload?.additionalInfo} />
                            </div>
                        </div>
                    )}
                />
            );
        }

        if (state.phase === "not_found") {
            return (
                <StatusCard
                    tone="amber"
                    title="CERTIFICADO NO ENCONTRADO"
                    message={state.error || "No existe un certificado asociado al código indicado."}
                    action={(
                        <a
                            href="/"
                            className="inline-flex w-fit items-center justify-center rounded-md bg-ong-blue px-5 py-3 font-semibold text-white transition-colors hover:bg-ong-blue-2"
                        >
                            Volver al inicio
                        </a>
                    )}
                />
            );
        }

        if (state.phase === "invalid") {
            return (
                <StatusCard
                    tone="zinc"
                    title="CÓDIGO INVÁLIDO"
                    message={state.error || "El código del certificado no es válido."}
                    action={(
                        <a
                            href="/"
                            className="inline-flex w-fit items-center justify-center rounded-md bg-ong-yellow px-5 py-3 font-semibold text-black transition-colors hover:bg-amber-500"
                        >
                            Volver al inicio
                        </a>
                    )}
                />
            );
        }

        return (
            <StatusCard
                tone="red"
                title="ERROR DE SERVICIO"
                message="No fue posible verificar el certificado en este momento."
                action={(
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={retry}
                            className="inline-flex w-fit items-center justify-center rounded-md bg-ong-yellow px-5 py-3 font-semibold text-black transition-colors hover:bg-amber-500"
                        >
                            Reintentar
                        </button>
                        <a
                            href="/"
                            className="inline-flex w-fit items-center justify-center rounded-md bg-white px-5 py-3 font-semibold text-ong-blue border border-ong-blue transition-colors hover:bg-zinc-50"
                        >
                            Volver al inicio
                        </a>
                    </div>
                )}
            />
        );
    }, [holder.document, holder.documentType, holder.fullName, mounted, payload?.activity, payload?.additionalInfo, payload?.hours, payload?.issueDate, payload?.issuer, retry, state.data, state.error, state.phase]);

    return (
        <main className="bg-zinc-50">
            <div className="section py-10 sm:py-14">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-6 sm:mb-8">
                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-ong-blue">
                            Validador de certificados
                        </p>
                        <h1 className="h1 mt-3 text-ong-blue">Consulta de certificados</h1>
                    </div>

                    {content}

                    <p className="mt-6 text-sm text-zinc-500">
                        La información mostrada proviene de la base de datos de la ONG.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default CertificateValidationPage;
