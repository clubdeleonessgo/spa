import Header from "@/components/Header";
import CounterCard from "@/components/CounterCard";
import PhotoMosaic from "@/components/PhotoMosaic";
import IndicatorsGrid from "@/components/IndicatorsGrid";
import { topStats, indicators } from "@/data/siteData";

export default function HomePage() {
    return (
        <>
            <Header />

            {/* HERO */}
            <section className="relative">
                <img src="/images/hero.jpg" alt="ONG" className="w-full h-[48vh] object-cover" />
                <div className="section absolute inset-0 flex items-center">
                    <div className="max-w-xl bg-white/85 backdrop-blur p-6 rounded-lg">
                        <h1 className="h1">Protejamos y cuidemos</h1>
                        <p className="lead mt-2">Acciones concretas para transformar realidades.</p>
                        <a href="#donar" className="mt-4 inline-block bg-orange-600 text-white px-5 py-2 rounded-md">Donar</a>
                    </div>
                </div>
            </section>

            {/* ESTADÍSTICAS DINÁMICAS (lista abierta) */}
            <section className="section my-16" aria-labelledby="stats">
                <h2 id="stats" className="h2 mb-6">Nuestro trabajo en números</h2>
                {/* En mobile: una debajo de otra. En desktop: grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {topStats.map(s => (
                        <CounterCard key={s.id} label={s.label} value={s.value} />
                    ))}
                </div>
            </section>

            {/* MOSAICO DE FOTOS INTERCALADAS */}
            <PhotoMosaic />

            {/* OTRA SECCIÓN DE ESTADÍSTICAS (8 indicadores, 8 colores) */}
            <IndicatorsGrid items={indicators} />

            {/* SECCIONES SPA */}
            <section id="quienes" className="section my-20">
                <h2 className="h2 mb-2">Quiénes somos</h2>
                <p className="lead">Somos una organización civil sin fines de lucro dedicada a …</p>
            </section>

            <section id="actividades" className="section my-20">
                <h2 className="h2 mb-2">Nuestras actividades</h2>
                <ul className="list-disc pl-6 text-zinc-700 space-y-1">
                    <li>Talleres de salud y bienestar</li>
                    <li>Capacitaciones laborales</li>
                    <li>Campañas solidarias</li>
                </ul>
            </section>

            <section id="sumarse" className="section my-20">
                <h2 className="h2 mb-2">Cómo sumarse</h2>
                <p className="lead">Completá el formulario para ser voluntario/a o escribinos a contacto@tuong.org</p>
                <a href="https://forms.gle/" className="mt-4 inline-block bg-sky-600 text-white px-5 py-2 rounded-md">Quiero sumarme</a>
            </section>

            <section id="donar" className="section my-20">
                <h2 className="h2 mb-2">Cómo donar</h2>
                <p className="lead">Transferencia, mercado pago o donación de insumos. ¡Todo suma!</p>
                <a href="#" className="mt-4 inline-block bg-emerald-600 text-white px-5 py-2 rounded-md">Donar ahora</a>
            </section>

            <footer className="mt-24 border-t">
                <div className="section py-10 text-sm text-zinc-600">
                    © {new Date().getFullYear()} ONG — Hecho con Next.js y Tailwind
                </div>
            </footer>
        </>
    );
}