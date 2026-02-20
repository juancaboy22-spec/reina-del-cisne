import { notFound } from "next/navigation";
import { PropertyDetail } from "@/components/properties/PropertyDetail";
import { PropiedadesRepository } from "@/repositories/propiedades.repository";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

const BASE_URL = "https://reinadelcisne.com";

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
    `${propiedad.tipo === "casa" ? "Casa" : "Lote"} en ${propiedad.ciudad} — $${propiedad.precio.toLocaleString()} USD`;

  return {
    title: propiedad.titulo,
    description: descripcion,
    openGraph: {
      title: propiedad.titulo,
      description: descripcion,
      url: pageUrl,
      siteName: "Inmobiliaria Reina del Cisne",
      locale: "es_EC",
      type: "website",
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: propiedad.titulo }]
        : [],
    },
  };
}

export default async function PropiedadDetallePage({ params }: Props) {
  const { id } = await params;
  const propiedad = await PropiedadesRepository.obtenerPorId(id);

  if (!propiedad) {
    notFound();
  }

  // JSON-LD para rich snippets de Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: propiedad.titulo,
    description: propiedad.descripcion,
    price: propiedad.precio,
    priceCurrency: "USD",
    address: {
      "@type": "PostalAddress",
      addressLocality: propiedad.ciudad,
      addressCountry: "EC",
      streetAddress: propiedad.ubicacion,
    },
    image:
      propiedad.imagenes?.map((img) =>
        typeof img === "string" ? img : img?.url,
      ) || [],
    url: `https://reinadelcisne.com/propiedades/${propiedad.id}`,
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
