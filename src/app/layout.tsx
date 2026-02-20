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

export const metadata: Metadata = {
  metadataBase: new URL("https://reinadelcisne.com"),
  title: {
    template: "%s | Reina del Cisne",
    default: "Inmobiliaria Reina del Cisne - Loja, Ecuador",
  },
  description:
    "Encuentra tu propiedad ideal en Loja. Lotes y casas con los mejores precios.",
  keywords: [
    "inmobiliaria",
    "loja",
    "lotes",
    "casas",
    "reina del cisne",
    "bienes raices ecuador",
  ],
  openGraph: {
    type: "website",
    locale: "es_EC",
    url: "https://reinadelcisne.com",
    siteName: "Inmobiliaria Reina del Cisne",
  },
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
      </body>
    </html>
  );
}
