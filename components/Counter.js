"use client"
import {useEffect, useRef, useState} from "react";

function useInViewport() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), {threshold: 0.3});
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return {ref, visible};
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

export default function Counter({value, className}) {
    const {ref, visible} = useInViewport();
    const number = useCountUp(visible, value);
    return (
        <div ref={ref} className={className}>+{number.toLocaleString("es-AR")}</div>
    );
}