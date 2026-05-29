import HoverRevealCard from "@/components/HoverCard";

export default function Causes({items}) {
    return (
        <section className="section my-20" aria-labelledby="actividades">
            <h2 id="actividades" className="h2 mb-6 scroll-mt-20">Qué hacemos</h2>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
                {items.map((it) => (
                    <HoverRevealCard key={it.id} data={it}/>
                ))}
            </div>
        </section>
    );
}
