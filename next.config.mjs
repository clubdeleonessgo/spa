/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',           // habilita next export
    images: { unoptimized: true }, // si usas <Image/>, desactiva optimizaciones
};
export default nextConfig;
