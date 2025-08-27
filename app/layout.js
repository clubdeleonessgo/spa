import "./globals.css";

export const metadata = {title: "Club de Leones Santiago del Estero",
    description: "ONG de servicio"};

export default function RootLayout({children}) {
    return (
        <html lang="es">
        <body className="antialiased text-zinc-900 bg-white">{children}</body>
        </html>
    );
}