# Certificados

Este directorio guarda los ejemplos y la guía para cargar certificados en Cloudflare Workers KV.

## Crear el namespace KV

```bash
npx wrangler kv namespace create CERTIFICADOS
```

El comando devuelve un `id` que debes copiar en `wrangler.jsonc` en el binding `CERTIFICADOS`.

## Preparar el archivo editable

1. Copia `certificados.example.json` como `certificados.json`.
2. Edita los datos reales.
3. No subas `certificados.json` si contiene información personal real.

## Probar localmente sin consultar el Worker

Si querés probar una URL real en `next dev` sin depender del Worker, copiá `.env.local.example` como `.env.local` y ajustá:

- `NEXT_PUBLIC_CERTIFICADOS_LOCAL_MOCK=true`
- `NEXT_PUBLIC_CERTIFICADOS_LOCAL_CERTIFICATE_JSON`

Si querés que el frontend local consulte un Worker remoto en vez de usar el mock, agregá:

- `NEXT_PUBLIC_CERTIFICADOS_API_BASE_URL=https://tu-worker.tu-dominio.workers.dev`

También acepta el dominio sin protocolo, pero es mejor usar la URL completa.

El componente leerá ese certificado localmente para cualquier UUID válido que abras en la URL.

Ejemplo:

```text
http://localhost:3000/certificados/8b958cf8-9ff0-43d6-ae4c-d58d074cc942
```

Si el modo local está activo, la página mostrará el certificado local sin consultar `/api/certificados/:id`.
Si definís `NEXT_PUBLIC_CERTIFICADOS_API_BASE_URL`, el frontend consultará ese Worker remoto desde local.

## Generar el archivo para carga masiva

```bash
npm run certificados:generar
```

Esto genera `data/certificados/certificados-kv.json` a partir de `data/certificados/certificados.json`.

## Cargar en KV

La sintaxis habitual de Wrangler es:

```bash
npx wrangler kv bulk put data/certificados/certificados-kv.json --binding CERTIFICADOS --remote
```

Si tu versión de Wrangler usa otra variante, revisa:

```bash
npx wrangler kv bulk put --help
```

## Archivo editable y archivo de carga

- `certificados.example.json`: ejemplo legible para edición manual.
- `certificados.json`: archivo real, ignorado por git.
- `certificados-kv.example.json`: ejemplo del formato final para KV.
- `certificados-kv.json`: archivo real de carga, ignorado por git.

## Formato de almacenamiento

Cada registro debe tener un `id` UUID y se guarda en KV con la clave:

```text
cert:UUID
```

El valor queda serializado como JSON string.
