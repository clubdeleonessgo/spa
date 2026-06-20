const eventTitle = "Jornada Virtual";
const eventDescription = "Jueves 2 de Julio de 2026 - 17hs.";
const eventName = "Escuelas en alerta: prevención y la responsabilidad institucional";
const eventImage = "/images/jornada.jpg";
const eventRegistrationUrl = "https://forms.gle/B22gCcAf1aQFujRT9";

export default function EventPromoSection() {
    return (
        <section className="bg-white border-b border-zinc-200">
            <div className="section py-10 sm:py-14">
                <div className="grid items-center gap-8 md:grid-cols-[0.6fr_1.4fr]">
                    <div className="order-2 md:order-1 mx-auto w-full max-w-sm">
                        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 shadow-sm">
                            <img
                                src={eventImage}
                                alt="Flyer del evento virtual"
                                className="aspect-square w-full object-cover"
                                loading="eager"
                                draggable={false}
                            />
                        </div>
                    </div>

                    <div className="order-1 md:order-2 flex flex-col items-start">
                        <p className="inline-flex items-center rounded-full bg-ong-blue px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                            {eventTitle}
                        </p>
                        <div className="mt-4 flex w-full flex-col items-start gap-4">
                            <a
                                href={eventRegistrationUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex w-full items-center justify-center rounded-md bg-ong-yellow px-5 py-3 font-semibold text-black transition-colors hover:bg-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-ong-blue-2 focus-visible:ring-offset-2 sm:w-auto"
                            >
                                QUIERO INSCRIBIRME
                            </a>
                            <h2 className="h2 text-ong-blue">{eventName}</h2>
                            <p className="lead mt-2 max-w-2xl">{eventDescription}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
