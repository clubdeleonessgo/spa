"use client"
import { useEffect, useRef, useState } from "react";

function useInViewport() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.3 });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return { ref, visible };
}

function useCountUp(enabled, end, duration = 1200) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!enabled) return;
        let raf, start;
        const step = t => {
            if (!start) start = t;
            const p = Math.min((t - start) / duration, 1);
            setVal(Math.round(end * p));
            if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [enabled, end, duration]);
    return val;
}

export default function CounterCard({ label, value }) {
    const { ref, visible } = useInViewport();
    const number = useCountUp(visible, value);
    return (
        <div ref={ref} className="p-6 rounded-lg bg-zinc-50 border flex flex-col items-start">
            <div className="text-4xl sm:text-5xl font-extrabold">+{number.toLocaleString("es-AR")}</div>
            <p className="mt-1 text-zinc-600">{label}</p>
        </div>
    );
}