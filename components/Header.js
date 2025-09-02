'use client';
import { useState } from 'react';

export default function Header() {
    const [open, setOpen] = useState(false);
    const links = [
        { href: "#quienes", label: "Quiénes somos" },
        { href: "#actividades", label: "Qué hacemos" },
        { href: "#sumarse", label: "Cómo sumarse" },
        { href: "#donar", label: "Cómo donar" },
        { href: "#contacto", label: "Contacto" },
    ];

    return (
        <header className="bg-ong-blue sticky top-0 z-50 backdrop-blur border-b">
            <nav className="section flex items-center justify-between h-14">
                <div className={'flex gap-4 items-center'}>
                    <img src={'/images/logo.png'} alt={'logo'} className={'w-8 h-8'}/>
                    <a href="#" className="font-extrabold text-white">Club de Leones Santiago del Estero</a>
                </div>

                <ul className="hidden md:flex gap-6">
                    {links.map(l => (
                        <li key={l.href}><a className="hover:underline text-white" href={l.href}>{l.label}</a></li>
                    ))}
                </ul>
                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setOpen(v => !v)}
                    aria-label="Abrir menú"
                >☰</button>
            </nav>

            {open && (
                <div className="md:hidden border-t">
                    <ul className="section py-3 space-y-2">
                        {links.map(l => (
                            <li key={l.href}>
                                <a className="block py-1 text-white" href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
}
