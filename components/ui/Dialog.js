"use client"
import {useEffect, useRef, useState} from "react";
import {CopyButton} from "@/components/ui/CopyButton";

export default function DonateDialog() {
    const [open, setOpen] = useState(false);
    const dialogRef = useRef(null);
    const openButtonRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        const previousActiveElement = document.activeElement;
        dialogRef.current?.focus();

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";

            if (previousActiveElement instanceof HTMLElement) {
                previousActiveElement.focus();
            } else {
                openButtonRef.current?.focus();
            }
        };
    }, [open]);

    return (
        <div>
            <button
                ref={openButtonRef}
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={open}
                className="mt-4 inline-block bg-ong-yellow hover:bg-amber-500 hover:cursor-pointer
                text-black px-5 py-2 font-bold rounded-md">
                Donar ahora
            </button>

            {open && (
                // Overlay: si hacés click acá, se cierra
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={() => setOpen(false)}
                >
                    {/* Caja blanca: detiene la propagación del click */}
                    <div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="donation-dialog-title"
                        tabIndex={-1}
                        className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setOpen(false)}
                            aria-label="Cerrar"
                            className="absolute top-3 right-3 text-gray-500 hover:cursor-pointer hover:text-gray-800"
                        >
                            ✕
                        </button>
                        <h3 id="donation-dialog-title" className="text-lg font-bold">
                            Donar ahora
                        </h3>
                        <p className="text-sm text-gray-600 mt-4 mb-4">
                            Elegí el medio que prefieras. ¡Gracias por apoyar nuestra misión!
                        </p>

                        <p className="font-semibold">Por transferencia:</p>

                        <div className="p-4 space-y-2 text-sm">
                            <p><span className="font-semibold">Titular:</span> Asociación Civil Club de Leones Santiago del Estero</p>
                            <p><span className="font-semibold">Alias:</span> LEONESSGO  <CopyButton text={'LEONESSGO'} /></p>
                            <p><span className="font-semibold">CBU:</span> 0000003100000524728323  <CopyButton text={'0000003100000524728323'} /></p>

                            <p><span className="font-semibold">CUIT:</span> 30-71818708-3</p>
                        </div>

                        <p className="font-semibold">Por link de Mercado Pago:</p>
                        <div className="mb-4 text-center">
                            <a
                                href="https://link.mercadopago.com.ar/clubleonessgo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-block bg-ong-blue hover:bg-ong-blue-2
                                text-white px-5 py-2 font-bold transition rounded-md"
                            >
                                Ir al link de pago
                            </a>
                        </div>

                        <p className="text-xs text-zinc-500">
                            Si necesitás factura, escribinos y te lo enviamos por email.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
