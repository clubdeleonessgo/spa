export default function PhotoMosaic() {
    return (
        <section className="section my-16">
            <div className="grid md:grid-cols-3 gap-4">
                <img className="w-full h-64 object-cover rounded-lg" src="/images/m1.jpg" alt="Actividad 1" />
                <div className="rounded-lg bg-ong-purple text-white p-6">
                    <h3 className="h2 mb-2">Sé parte del cambio</h3>
                    <p>Sumate como <strong>voluntario/a</strong>, difundí nuestras <strong>actividades</strong> o colaborá con <strong>donaciones</strong>.</p>
                </div>
                <img className="w-full h-64 object-cover rounded-lg" src="/images/m2.jpg" alt="Actividad 2" />

                <div className="rounded-lg bg-ong-purple-2 text-white p-6 md:col-span-2">
                    <h3 className="h2 mb-2">Impacto real</h3>
                    <p className="max-w-2xl mx-auto">
                        Trabajamos junto a <strong>comunidades, escuelas y comedores</strong>,
                        en <strong>alianza con instituciones del medio</strong>, para llegar más lejos.
                    </p>
                </div>
                <img className="w-full h-64 object-cover rounded-lg" src="/images/m3.jpg" alt="Actividad 3"/>
            </div>
        </section>
    );
}