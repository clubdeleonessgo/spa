import Header from "@/components/Header";
import PhotoMosaic from "@/components/PhotoMosaic";
import IndicatorsGrid from "@/components/IndicatorsGrid";
import { causes, activities } from "@/data/siteData";
import {StadisticSection} from "@/components/StadisticSection";
import Causes from "@/components/Causes";
import Footer from "@/components/Footer";
import {Activities} from "@/components/Activities";
import {Donation} from "@/components/Donation";
import {Joined} from "@/components/Joined";
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
    return (
        <>
            <Header />

            <HeroSection/>

            <StadisticSection/>

            <PhotoMosaic />

            <Causes items={causes}/>

            {/* SECCIONES SPA */}
            <section id="quienes" className="section my-20">
                <h2 className="h2 mb-2">Quiénes somos</h2>
                <p className="text-zinc-700">
                    Somos el <strong>Club de Leones de Santiago del Estero</strong>, parte de la red internacional de
                    Clubes de Leones presentes en todo el mundo.
                    Compartimos la misión de trabajar solidariamente bajo el lema <strong>“Nosotros Servimos”</strong>,
                    impulsando acciones comunitarias que mejoran la vida de las personas.<br/>
                    Nuestro objetivo es <strong>ayudar a la comunidad</strong> a través de <strong>actividades de
                    servicio</strong>,
                    <strong>intervenciones socio-comunitarias</strong> y la <strong>promoción de los Derechos
                    Humanos</strong>,
                    siempre con el compromiso de construir una sociedad más justa e inclusiva.
                </p>
            </section>

            <IndicatorsGrid items={causes}/>

            <Activities items={activities}/>

            <Joined/>

            <Donation/>

            <Footer/>
        </>
    );
}