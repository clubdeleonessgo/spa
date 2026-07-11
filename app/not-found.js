import Header from "@/components/Header";

export const metadata = {
    title: "Página no existente | Club de Leones Santiago del Estero",
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
};

export default function NotFound() {
    return (
        <>
            <Header simple />
            <main className="bg-zinc-50 min-h-[calc(100vh-3.5rem)]">
                <div className="section py-16 sm:py-20">
                    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                        <h1 className="h2 mt-6 text-ong-blue">Página no existente</h1>
                        <p className="lead mt-4 max-w-2xl">
                            La dirección que ingresaste no existe o no está disponible.
                            Regresá al menú principal para continuar navegando por el sitio.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <a
                                href="/"
                                className="inline-flex items-center justify-center rounded-md bg-ong-yellow px-5 py-3 font-semibold text-black transition-colors hover:bg-amber-500"
                            >
                                Ir al sitio principal
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
