import { PropiedadesRepository } from "@/repositories/propiedades.repository";
import PropertyCard from "@/components/properties/PropertyCard";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { Propiedad } from "@/types";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Propiedades en Venta",
  description: "Listado de lotes y casas disponibles en Loja, Ecuador",
};

export default async function PropiedadesPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string; min?: string; max?: string }>;
}) {
  const params = await searchParams;

  const propiedades = await PropiedadesRepository.listar({
    tipo: params.tipo as any,
    precioMin: params.min ? Number(params.min) : undefined,
    precioMax: params.max ? Number(params.max) : undefined,
  });

  const tipoLabel =
    params.tipo === "lote"
      ? "Lotes"
      : params.tipo === "casa"
        ? "Casas"
        : "Todas las propiedades";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 py-28 text-center text-white relative overflow-hidden">
        {/* Líneas decorativas */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 80px)" }} />

        <div className="relative container mx-auto px-4">
          <p className="text-gold-400 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            En venta · Loja, Ecuador
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-5 leading-tight">
            {tipoLabel}
          </h1>
          <div className="w-16 h-px bg-gold-500 mx-auto mb-5" />
          <p className="text-gray-400 text-base max-w-md mx-auto">
            Encuentra tu propiedad ideal con los mejores precios
          </p>
        </div>
      </div>

      {/* Filtros */}
      <Suspense>
        <PropertyFilters total={propiedades.length} />
      </Suspense>

      {/* Grid */}
      <div className="container mx-auto px-4 py-10">
        {propiedades.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {propiedades.map((p: Propiedad) => (
              <PropertyCard key={p.id} propiedad={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🏠</div>
            <p className="text-xl font-semibold text-navy-700 mb-2">
              No hay propiedades disponibles
            </p>
            <p className="text-gray-400 text-sm">
              Prueba con otro filtro o vuelve pronto
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
