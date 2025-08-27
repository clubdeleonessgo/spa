"use client";
import { useState } from "react";

export default function HoverRevealCard({ data }) {
    const enabled = (data?.src);

    const [active, setActive] = useState(false);
    const onEnter = () => { if (enabled) setActive(true); };
    const onLeave = () => { if (enabled) setActive(false); };
    const toggle   = () => { if (enabled) setActive(v => !v); };

    return (
        <div
            className="relative overflow-hidden h-full"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            <div
                className={
                    enabled
                        ? `transition-opacity duration-300 ease-out ${active ? "opacity-0 pointer-events-none" : "opacity-100"}`
                        : "opacity-100"
                }
            >
                <div
                    key={data.id}
                    className={`rounded-lg text-white p-5 flex h-45 items-center flex-col justify-center ${data.color}`}
                >
                    <img
                        className="h-24 object-cover rounded-lg"
                        src={"/images/" + data.image}
                        alt={data.title}
                    />
                    <div className="mt-1 text-xl text-center font-bold">{data.title}</div>
                </div>
            </div>

            {enabled && (
                <div
                    className={`absolute inset-0 transition-all duration-300 ease-out ${
                        active ? "opacity-100 scale-100" : "opacity-0 scale-105"
                    }`}
                    aria-hidden={!active}
                >
                    <img
                        src={"/images/cause/" + data.src}
                        alt=""
                        className="inset-0 h-full w-full object-cover rounded-lg bg-black"
                        draggable={false}
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute inset-x-0 bottom-0">
                        <div className="p-4">
                            <div
                                className="w-full rounded-lg bg-black/40 backdrop-blur
                           px-4 py-2 text-white text-base font-semibold shadow"
                            >
                                {data.title}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {enabled && (
                <button
                    type="button"
                    onClick={toggle}
                    aria-pressed={active}
                    aria-label={active ? "Ocultar imagen" : "Mostrar imagen"}
                    className="absolute inset-0 md:hidden"
                />
            )}
        </div>
    );
}