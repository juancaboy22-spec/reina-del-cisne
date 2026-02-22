import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://reina-del-cisne.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    template: "%s | Reina del Cisne",
    default: "Inmobiliaria Reina del Cisne - Loja, Ecuador",
  },
  description:
    "Inmobiliaria Reina del Cisne en Loja, Ecuador. Lotes y casas en venta con escrituras en regla, precios justos y asesoría personalizada sin costo adicional.",
  keywords: [
    "inmobiliaria Loja",
    "lotes en venta Loja",
    "casas en venta Loja",
    "bienes raíces Ecuador",
    "Reina del Cisne inmobiliaria",
    "propiedades Loja Ecuador",
    "terrenos Loja",
    "inmuebles Loja Ecuador",
    "comprar lote Loja",
    "comprar casa Loja",
  ],
  authors: [{ name: "Inmobiliaria Reina del Cisne", url: BASE_URL }],
  creator: "Inmobiliaria Reina del Cisne",
  publisher: "Inmobiliaria Reina del Cisne",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: BASE_URL,
    siteName: "Inmobiliaria Reina del Cisne",
    images: [
      {
        url: "/logo.png",
        width: 520,
        height: 520,
        alt: "Inmobiliaria Reina del Cisne - Loja, Ecuador",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Inmobiliaria Reina del Cisne - Loja, Ecuador",
    description:
      "Lotes y casas en venta en Loja, Ecuador. Asesoría personalizada y precios justos.",
    images: ["/logo.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${BASE_URL}/#organization`,
  name: "Inmobiliaria Reina del Cisne",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  telephone: "+593996009652",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Loja",
    addressRegion: "Loja",
    addressCountry: "EC",
  },
  description:
    "Inmobiliaria en Loja, Ecuador. Lotes y casas en venta con escrituras en regla y asesoría personalizada.",
  areaServed: {
    "@type": "City",
    name: "Loja",
  },
  priceRange: "$$",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${cormorant.variable}`}>
        {children}
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
