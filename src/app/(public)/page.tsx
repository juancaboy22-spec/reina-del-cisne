import Link from "next/link";
import Image from "next/image";
import { PropiedadesRepository } from "@/repositories/propiedades.repository";
import PropertyCard from "@/components/properties/PropertyCard";
import { Propiedad } from "@/types";
import { Star, Shield, TrendingUp } from "lucide-react";
import type { Metadata } from "next";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Inmobiliaria Reina del Cisne - Loja, Ecuador",
    description:
      "Encuentra lotes y casas en venta en Loja, Ecuador. Escrituras en regla, precios justos y asesoría personalizada sin costo.",
  },
};

export default async function HomePage() {
  // Las páginas no saben nada de Supabase — solo hablan con el repositorio
  const destacadas = await PropiedadesRepository.listarDestacadas(3);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[90vh] bg-navy-700 flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-700 to-navy-500 opacity-95" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white pt-2 pb-20">
          <div className="bg-white py-2 px-2 rounded-2xl mb-6 inline-block shadow-2xl">
            <Image
              src="/logo.png"
              alt="Logo Inmobiliaria Reina del Cisne"
              width={520}
              height={520}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6">
            Encuentra tu <span className="text-gold-400">propiedad ideal</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Lotes y casas en las mejores ubicaciones de Loja, Ecuador. Con la
            confianza y experiencia que mereces.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/propiedades"
              className="btn-gold text-base px-8 py-4 rounded-xl shadow-xl"
            >
              Ver Propiedades
            </Link>
            <Link
              href="/contacto"
              className="border-2 border-gold-400 text-gold-400
                 hover:bg-gold-400 hover:text-navy-900 px-8 py-4 rounded-xl
                 font-semibold transition-all duration-200"
            >
              Contactar Asesor
            </Link>
          </div>
        </div>
      </section>

      {/* PROPIEDADES DESTACADAS */}
      {destacadas.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-gold-500 font-semibold uppercase tracking-wider text-sm">
                Lo mejor para ti
              </p>
              <h2 className="font-serif text-4xl text-navy-700 mt-2">
                Propiedades Destacadas
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {destacadas.map((p: Propiedad) => (
                <PropertyCard key={p.id} propiedad={p} imageHeight="h-80" />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/propiedades" className="btn-primary px-10">
                Ver todas las propiedades
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* POR QUE ELEGIRNOS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-navy-700 mb-6">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Somos tu aliado confiable en el mercado inmobiliario de Loja
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Seguridad Legal",
                desc: "Todos nuestros inmuebles cuentan con escrituras en regla y sin gravámenes.",
              },
              {
                icon: TrendingUp,
                title: "Mejor Inversión",
                desc: "Propiedades en zonas de alta valorización con proyección a futuro.",
              },
              {
                icon: Star,
                title: "Asesoría Personalizada",
                desc: "Te acompañamos en todo el proceso de compra sin costo adicional.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-8 rounded-2xl border-2 border-gold-100 hover:border-gold-400 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gold-50"
              >
                <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon size={32} className="text-gold-500" />
                </div>
                <h3 className="font-serif font-bold text-navy-700 text-xl mb-4 text-center">
                  {title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed font-light text-center">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
