import { notFound } from "next/navigation";
import { PropertyDetail } from "@/components/properties/PropertyDetail";
import { PropiedadesRepository } from "@/repositories/propiedades.repository";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const propiedad = await PropiedadesRepository.obtenerPorId(id);

  if (!propiedad) {
    return {
      title: "Propiedad no encontrada",
    };
  }

  const imagenes = Array.isArray(propiedad.imagenes) ? propiedad.imagenes : [];
  const imageUrl =
    imagenes.length > 0
      ? typeof imagenes[0] === "string"
        ? imagenes[0]
        : imagenes[0]?.url || ""
      : "";

  return {
    title: propiedad.titulo,
    description: propiedad.descripcion || "",
    openGraph: {
      title: propiedad.titulo,
      description: propiedad.descripcion || "",
      images: imageUrl ? [imageUrl] : [],
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
