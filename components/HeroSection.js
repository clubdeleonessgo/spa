"use client";
import { useState, useEffect } from "react";

export default function HeroSection() {
    const images = [
        "/header_0.jpg",
        "/header_1.jpg",
        "/header_2.avif",
        "/header_3.avif",
        "/header_4.avif",
        "/header_5.avif",
        "/header_6.avif",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(
            () => setCurrentIndex((prev) => (prev + 1) % images.length),
            5000
        );
        return () => clearInterval(interval);
    }, [images.length]);

    // Evita /images//archivo.ext
    const toSrc = (p) => `/images/${p.replace(/^\//, "")}`;

    return (
        <section className="relative h-[48vh]">
            {/* Cross-fade: imágenes apiladas con transición SOLO en el cambio */}
            <div className="absolute inset-0 pointer-events-none select-none">
                {images.map((img, i) => (
                    <img
                        key={img}
                        src={toSrc(img)}
                        alt={i === currentIndex ? "ONG" : ""}
                        aria-hidden={i !== currentIndex}
                        className={`absolute inset-0 h-full w-full object-cover
                        transition-opacity duration-700 ease-in-out
                        motion-reduce:transition-none motion-reduce:duration-0
                        ${i === currentIndex ? "opacity-100" : "opacity-0"}`}
                        loading={i === 0 ? "eager" : "lazy"}
                        draggable={false}
                        style={{ willChange: "opacity" }}
                    />
                ))}
            </div>

            {/* Contenido superpuesto */}
            <div className="section absolute inset-0 flex items-center">
                <div className="max-w-xxl bg-white/85 backdrop-blur p-6 rounded-lg">
                    <h1 className="h1">Sigamos cambiando el mundo</h1>
                    <p className="lead mt-2">Una vida, una familia, una comunidad a la vez.</p>
                    <a
                        href="#donar"
                        className="mt-4 inline-block bg-ong-yellow hover:bg-amber-500
                       text-black font-semibold px-5 py-2 rounded-md"
                    >
                        AYUDAR
                    </a>
                </div>
            </div>
        </section>
    );
}
