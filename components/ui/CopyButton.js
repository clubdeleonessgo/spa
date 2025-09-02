"use client";
import {useState} from "react";

export const CopyButton = ({text, className = ""}) => {
    const [copied, setCopied] = useState(false);

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (e) {
            console.error("No se pudo copiar", e);
        }
    };

    return (
        <button
            onClick={onCopy}
            aria-live="polite"
            aria-label={copied ? "Correo copiado" : "Copiar correo"}
            className={`ml-2 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-sm
                  hover:bg-zinc-50 active:bg-zinc-100 ${className}`}
            type="button"
        >
            {copied ? <CheckIcon/> : <CopyIcon/>}
            <span>{copied ? "Copiado" : "Copiar"}</span>
        </button>
    );
}

function CopyIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="opacity-80">
            <path fill="currentColor"
                  d="M16 1H6a2 2 0 0 0-2 2v10h2V3h10V1zm2 4H10a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 14H10V7h8v12z"/>
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="opacity-80">
            <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>
        </svg>
    );
}