"use client";
import {useEffect, useState} from "react";
import Counter from "@/components/Counter";

export default function HoverRevealCard({data}) {
    const enabled = (data?.src || data.activities);

    const [active, setActive] = useState(false);
    const onEnter = () => {
        if (enabled) setActive(true);
    };
    const onLeave = () => {
        if (enabled) setActive(false);
    };
    const toggle = () => {
        if (enabled) setActive(v => !v);
    };

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!enabled || !data.src || data.src.length <= 1) return;
        const interval = setInterval(
            () => setCurrentIndex(prev => (prev + 1) % data.src.length),
            5000
        );
        return () => clearInterval(interval);
    }, [enabled, data.src?.length]);

    const height = 'h-60 xs:h-45';

    return (<div
            className="relative overflow-hidden h-full rounded-lg"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            <div
                className={enabled ? `rounded-lg transition-opacity duration-300 ease-out 
            ${active ? "opacity-0 pointer-events-none" : "opacity-100"}` : "opacity-100"}
            >
                <div
                    key={data.id}
                    className={`rounded-lg text-white p-5 flex ${height} items-center flex-col 
                justify-center ${data.color}`}
                >
                    <img
                        className="h-24 object-cover rounded-lg"
                        src={"/images/" + data.image}
                        alt={data.title}
                    />
                    <div className="mt-1 text-xl text-center font-bold">{data.title}</div>
                </div>
            </div>

            <div
                className={`absolute inset-0 transition-all duration-300 ease-out rounded-lg
                    grid grid-cols-3
                    ${active ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
                aria-hidden={!active}
            >
                <div className={`relative overflow-hidden rounded-l-lg ${height} 'col-span-1`}>
                    {
                        data.src ?
                            data.src.map((img, i) => (
                                <img
                                    key={img}
                                    src={"/images/cause/" + img}
                                    alt={i === currentIndex ? "ONG" : ""}
                                    aria-hidden={i !== currentIndex}
                                    className={`absolute  inset-0 h-full w-full object-cover ${data.color}
                        transition-opacity duration-700 ease-in-out
                        motion-reduce:transition-none motion-reduce:duration-0
                        ${i === currentIndex ? "opacity-100" : "opacity-0"}`}
                                    loading={i === 0 ? "eager" : "lazy"}
                                    draggable={false}
                                    style={{willChange: "opacity"}}
                                />))
                            : <div className={`${height}  ${data.color}`}/>
                    }
                    <div className="absolute inset-0 pointer-events-none select-none">
                    </div>
                </div>
                <div className={`flex flex-col justify-center xs:justify-start xs:flex-row items-center rounded-r-lg col-span-2
            text-white p-3 xs:p-5 ${height}  ${data.color}`}>
                    <div className={'flex items-center flex-col w-24'}>
                        <img
                            className="h-16 xs:h-18 sm:h-20 lg:h-12 object-cover rounded-lg"
                            src={"/images/" + data.image}
                            alt={data.title}
                        />
                        {
                            data.value > 0  &&
                            <Counter value={data.value} className={"lg:text-3xl sm:text-4xl font-extrabold mt-2"}/>
                        }
                    </div>
                    <ul className={`list-disc text-base pl-1 xs:pl-5 ml-4 ${data.black ? 'text-black' : 'text-white'}`}>
                        {
                            data?.activities?.map((act, i) => {
                                return <li key={i}>{act}</li>
                            })
                        }
                    </ul>

                </div>
                <div className="absolute inset-x-0 bottom-0">
                    <div className="p-2">
                        <div
                            className="rounded-lg bg-black/40 px-2 py-1 text-white font-semibold w-fit"
                        >
                            {data.title}
                        </div>
                    </div>
                </div>
            </div>

            {enabled && (<button
                type="button"
                onClick={toggle}
                aria-pressed={active}
                aria-label={active ? "Ocultar imagen" : "Mostrar imagen"}
                className="absolute inset-0 md:hidden"
            />)}
        </div>
    );
}