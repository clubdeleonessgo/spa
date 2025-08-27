import Counter from "@/components/Counter";

export default function CounterCard({ label, value }) {
    return (
        <div className="p-6 rounded-lg bg-ong-blue-2 flex flex-col items-start">
            <Counter className={"text-4xl sm:text-5xl font-extrabold text-white"} value={value}/>
            <p className="mt-1 text-white">{label}</p>
        </div>
    );
}