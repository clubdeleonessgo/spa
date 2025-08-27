export default function PhotoMosaic() {
    return (
        <section className="section my-16">
            <div className="grid md:grid-cols-3 gap-4">
                <img className="w-full h-64 object-cover rounded-lg" src="/images/m1.jpg" alt="Actividad 1" />
                <div className="rounded-lg bg-orange-500 text-white p-6">
                    <h3 className="h2 mb-2">Cómo podés ayudar</h3>
                    <p>Sumate como voluntario/a, difundí nuestras acciones o colaborá con donaciones.</p>
                </div>
                <img className="w-full h-64 object-cover rounded-lg" src="/images/m2.jpg" alt="Actividad 2" />

                <div className="rounded-lg bg-sky-500 text-white p-6 md:col-span-2">
                    <h3 className="h2 mb-2">Impacto real</h3>
                    <p>Trabajamos con comunidades, escuelas y comedores. Cada aporte cuenta.</p>
                </div>
                <img className="w-full h-64 object-cover rounded-lg" src="/images/m3.jpg" alt="Actividad 3" />
            </div>
        </section>
    );
}