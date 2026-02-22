import { notFound } from "next/navigation";
import { PropertyDetail } from "@/components/properties/PropertyDetail";
import { PropiedadesRepository } from "@/repositories/propiedades.repository";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://reina-del-cisne.vercel.app";

export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const propiedad = await PropiedadesRepository.obtenerPorId(id);

  if (!propiedad) {
    return { title: "Propiedad no encontrada" };
  }

  const imagenes = Array.isArray(propiedad.imagenes) ? propiedad.imagenes : [];
  const imageUrl =
    imagenes.length > 0
      ? typeof imagenes[0] === "string"
        ? imagenes[0]
        : imagenes[0]?.url || ""
      : "";

  const pageUrl = `${BASE_URL}/propiedades/${id}`;
  const descripcion =
    propiedad.descripcion ||
    `${propiedad.tipo === "casa" ? "Casa" : "Lote"} en ${propiedad.ciudad}${propiedad.ubicacion ? `, ${propiedad.ubicacion}` : ""}. Precio: $${propiedad.precio.toLocaleString()} USD.`;

  return {
    title: propiedad.titulo,
    description: descripcion,
    alternates: {
      canonical: `/propiedades/${id}`,
    },
    openGraph: {
      title: propiedad.titulo,
      description: descripcion,
      url: pageUrl,
      siteName: "Inmobiliaria Reina del Cisne",
      locale: "es_EC",
      type: "website",
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: propiedad.titulo }]
        : [{ url: "/logo.png", width: 520, height: 520, alt: propiedad.titulo }],
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: propiedad.titulo,
      description: descripcion,
      images: imageUrl ? [imageUrl] : ["/logo.png"],
    },
  };
}

export default async function PropiedadDetallePage({ params }: Props) {
  const { id } = await params;
  const propiedad = await PropiedadesRepository.obtenerPorId(id);

  if (!propiedad) {
    notFound();
  }

  const imagenes = propiedad.imagenes?.map((img) =>
    typeof img === "string" ? img : img?.url,
  ) || [];

  const descripcion =
    propiedad.descripcion ||
    `${propiedad.tipo === "casa" ? "Casa" : "Lote"} en ${propiedad.ciudad}${propiedad.ubicacion ? `, ${propiedad.ubicacion}` : ""}. Precio: $${propiedad.precio.toLocaleString()} USD.`;

  // JSON-LD para rich snippets de Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${BASE_URL}/propiedades/${propiedad.id}`,
    name: propiedad.titulo,
    description: descripcion,
    url: `${BASE_URL}/propiedades/${propiedad.id}`,
    image: imagenes,
    offers: {
      "@type": "Offer",
      price: propiedad.precio,
      priceCurrency: "USD",
      availability: propiedad.disponible
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
      seller: {
        "@type": "RealEstateAgent",
        name: "Inmobiliaria Reina del Cisne",
        telephone: "+593996009652",
        url: BASE_URL,
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: propiedad.ciudad,
      addressRegion: "Loja",
      addressCountry: "EC",
      streetAddress: propiedad.ubicacion,
    },
    ...(propiedad.area ? { floorSize: { "@type": "QuantitativeValue", value: propiedad.area, unitCode: "MTK" } } : {}),
  };

  return (
    <>
      <PropertyDetail propiedad={propiedad} />

      {/* Structured data para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
