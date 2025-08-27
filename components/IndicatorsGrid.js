import Counter from "@/components/Counter";

export default function IndicatorsGrid({ items }) {
    return (
        <section className="section my-20" aria-labelledby="indicadores">
            <h2 id="indicadores" className="h2 mb-6">Lo que hemos hecho</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {items.map((it, i) => (
                    <div key={it.id ?? i} className={`rounded-4xl text-white p-5 flex items-center gap-8 ${it.color} `}>
                        <img className="h-16 object-cover" src={"/images/" + it.image} alt={it.title}/>
                        <div>
                            {
                                <Counter value={it.value} className={"text-3xl font-extrabold"}/>
                            }
                        </div>
                        <div className="mt-1">{it.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}