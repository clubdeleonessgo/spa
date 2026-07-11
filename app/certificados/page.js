import Header from "@/components/Header";
import CertificateValidationPage from "@/components/CertificateValidationPage";

export const metadata = {
    title: "Validación de certificados | Club de Leones Santiago del Estero",
    description: "Consulta pública para validar certificados emitidos por el Club de Leones Santiago del Estero.",
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    },
};

export default function CertificatesPage() {
    return (
        <>
            <Header simple />
            <CertificateValidationPage />
        </>
    );
}
