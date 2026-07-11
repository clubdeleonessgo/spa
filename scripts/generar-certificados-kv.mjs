import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const rootDir = process.cwd();
const inputPath = resolve(rootDir, "data/certificados/certificados.json");
const outputPath = resolve(rootDir, "data/certificados/certificados-kv.json");

function fail(message) {
    throw new Error(message);
}

function assertUuid(id, index) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (typeof id !== "string" || !uuidRegex.test(id.trim())) {
        fail(`El registro #${index + 1} no tiene un id UUID válido.`);
    }
}

async function main() {
    const raw = await readFile(inputPath, "utf8").catch(() => {
        fail(`No se pudo leer ${inputPath}. Primero crea data/certificados/certificados.json.`);
    });

    let parsed;

    try {
        parsed = JSON.parse(raw);
    } catch {
        fail("data/certificados/certificados.json no contiene JSON válido.");
    }

    if (!Array.isArray(parsed)) {
        fail("data/certificados/certificados.json debe contener un array.");
    }

    const seen = new Set();
    const bulkRecords = parsed.map((record, index) => {
        if (!record || typeof record !== "object" || Array.isArray(record)) {
            fail(`El registro #${index + 1} debe ser un objeto.`);
        }

        assertUuid(record.id, index);

        if (seen.has(record.id)) {
            fail(`El id ${record.id} está duplicado.`);
        }

        seen.add(record.id);

        const { id, ...value } = record;

        return {
            key: `cert:${id}`,
            value: JSON.stringify(value),
        };
    });

    await writeFile(outputPath, `${JSON.stringify(bulkRecords, null, 2)}\n`, "utf8");
    console.log(`Generado ${outputPath} con ${bulkRecords.length} registros.`);
}

main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});
