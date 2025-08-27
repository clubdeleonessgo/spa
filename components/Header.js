'use client';
import { useState } from 'react';

export default function Header() {
    const [open, setOpen] = useState(false);
    const links = [
        { href: "#quienes", label: "Quiénes somos" },
        { href: "#actividades", label: "Nuestras actividades" },
        { href: "#sumarse", label: "Cómo sumarse" },
        { href: "#donar", label: "Cómo donar" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
            <nav className="section flex items-center justify-between h-14">
                <a href="#" className="font-extrabold">Club de Leones Santiago del Estero</a>
                <ul className="hidden md:flex gap-6">
                    {links.map(l => (
                        <li key={l.href}><a className="hover:underline" href={l.href}>{l.label}</a></li>
                    ))}
                </ul>
                <button
                    className="md:hidden p-2"
                    onClick={() => setOpen(v => !v)}
                    aria-label="Abrir menú"
                >☰</button>
            </nav>

            {open && (
                <div className="md:hidden border-t">
                    <ul className="section py-3 space-y-2">
                        {links.map(l => (
                            <li key={l.href}>
                                <a className="block py-1" href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
