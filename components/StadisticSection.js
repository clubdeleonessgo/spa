import {topStats} from "@/data/siteData";
import CounterCard from "@/components/CounterCard";

export const StadisticSection = () => {
    return <section className="section my-16" aria-labelledby="stats">
        <h2 id="stats" className="h2 mb-6">Nuestro trabajo en números</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topStats.map(s => (
                <CounterCard key={s.id} label={s.label} value={s.value} />
            ))}
        </div>
    </section>;
}