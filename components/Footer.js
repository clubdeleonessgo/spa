import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-ong-blue mt-24 border-t">
            <div className="section py-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="section py-10 text-sm text-white">
                    © {new Date().getFullYear()} Club de Leones Santiago del Estero - Desarrollado por el Área de Informática
                </div>

                <div className="flex gap-4">
                    <a
                        href="https://www.facebook.com/profile.php?id=61559785312987"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        aria-label="Facebook"
                    >
                        <FaFacebook className="w-12 h-12 text-white" />
                    </a>

                    <a
                        href="https://www.instagram.com/leonessgo"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        aria-label="Instagram"
                    >
                        <FaInstagram className="w-12 h-12 text-white" />
                    </a>

                    <a
                        href="https://api.whatsapp.com/send?phone=543855148294&text=%C2%A1Hola!"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        aria-label="WhatsApp"
                    >
                        <FaWhatsapp className="w-12 h-12 text-white" />
                    </a>
                </div>
            </div>
        </footer>
    );
}