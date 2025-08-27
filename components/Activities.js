export const Activities = ({items}) => {
    return <section id="actividades" className="section my-20">
        <h2 className="h2 mb-2">Qué hacemos</h2>
        <ul className="list-disc pl-6 text-zinc-700 space-y-1">
            {items.map((a, i) => {
                const [title, ...rest] = a.split(':');
                const detail = rest.join(':').trim();
                return (
                    <li key={i}>
                        <strong>{title}:</strong> {detail}
                    </li>
                );
            })}
        </ul>
    </section>
}