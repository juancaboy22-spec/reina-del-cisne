import { notFound } from "next/navigation";
import { PropertyDetail } from "@/components/properties/PropertyDetail";
import { PropiedadesRepository } from "@/repositories/propiedades.repository";
import type { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const propiedad = await PropiedadesRepository.obtenerPorId(params.id);

  if (!propiedad) {
    return {
      title: "Propiedad no encontrada",
    };
  }

  return {
    title: propiedad.titulo,
    description: propiedad.descripcion,
    openGraph: {
      title: propiedad.titulo,
      description: propiedad.descripcion,
      images: propiedad.imagenes.length > 0 ? [propiedad.imagenes[0]] : [],
    },
  };
}

export default async function PropiedadDetallePage({ params }: Props) {
  const propiedad = await PropiedadesRepository.obtenerPorId(params.id);

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
    image: propiedad.imagenes,
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
