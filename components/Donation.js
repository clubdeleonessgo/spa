import DonateDialog from "@/components/ui/Dialog";

export const Donation = () => {
    return <section id="donar" className="section my-20 scroll-mt-20">
        <h2 className="h2 mb-2 ">Cómo donar</h2>
        <p className="lead">Podés ayudarnos con tu donación y ser parte de cada una de nuestras acciones solidarias.</p>
        <DonateDialog/>
    </section>
}