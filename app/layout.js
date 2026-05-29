import "./globals.css";

const title = "Club de Leones Santiago del Estero";
const description =
    "Club de Leones de Santiago del Estero: acciones solidarias, voluntariado, donaciones y servicio comunitario.";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://clubdeleonessgo.org";

export const metadata = {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName: title,
    keywords: [
        "Club de Leones",
        "Santiago del Estero",
        "ONG",
        "voluntariado",
        "donaciones",
        "servicio comunitario",
    ],
    openGraph: {
        title,
        description,
        siteName: title,
        locale: "es_AR",
        type: "website",
        images: [
            {
                url: "/images/logo.png",
                width: 512,
                height: 512,
                alt: title,
            },
        ],
    },
    twitter: {
        card: "summary",
        title,
        description,
        images: ["/images/logo.png"],
    },
    icons: {
        icon: [
            {url: "/favicon_32x32.png", sizes: "32x32", type: "image/png"},
            {url: "/favicon_48x48.png", sizes: "48x48", type: "image/png"},
            {url: "/favicon_64x64.png", sizes: "64x64", type: "image/png"},
        ],
        apple: [{url: "/favicon_64x64.png", sizes: "64x64", type: "image/png"}],
    },
};

export default function RootLayout({children}) {
    return (
        <html lang="es">
        <body className="antialiased text-zinc-900 bg-white">{children}</body>
        </html>
    );
}
