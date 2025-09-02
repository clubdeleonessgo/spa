import {CopyButton} from "@/components/ui/CopyButton";

export const Contact = () => {
    const email = "clubdeleonessgo@gmail.com";
    return (
        <section id="contacto" className="section my-20 scroll-mt-20">
            <h2 className="h2 mb-2">Contacto</h2>
            <p className="text-zinc-700">
                <strong>Contacto institucional:</strong>{" "}
                <a href={`mailto:${email}`} className="underline hover:no-underline">
                    {email}
                </a>
                <CopyButton text={email} />
            </p>
        </section>
    );
}