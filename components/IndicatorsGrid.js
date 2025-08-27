import Counter from "@/components/Counter";

const palette = [
    "bg-orange-500", "bg-sky-500", "bg-emerald-500", "bg-rose-500",
    "bg-yellow-500", "bg-purple-500", "bg-blue-500", "bg-lime-600"
];

export default function IndicatorsGrid({ items }) {
    return (
        <section className="section my-20" aria-labelledby="indicadores">
            <h2 id="indicadores" className="h2 mb-6">Indicadores</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {items.map((it, i) => (
                    <div key={it.id ?? i} className={`rounded-lg ${palette[i % palette.length]} text-white p-5`}>
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