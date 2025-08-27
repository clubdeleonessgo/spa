import HoverRevealCard from "@/components/HoverCard";

export default function Causes({items}) {
    return (
        <section className="section my-20" aria-labelledby="causes">
            <h2 id="causes" className="h2 mb-6">Causas que trabajamos</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((it, i) => (
                    <HoverRevealCard data={it}/>
                ))}
            </div>
        </section>
    );
}