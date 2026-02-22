import Link from "next/link";
import { Suspense } from "react";
import { PropiedadesRepository } from "@/repositories/propiedades.repository";
import type { Metadata } from "next";
import DeleteButton from "./DeleteButton";
import AdminPropiedadesSearch from "./AdminPropiedadesSearch";

export const metadata: Metadata = {
  title: "Administrar Propiedades",
};

export default async function AdminPropiedadesPage({
  searchParams,
}: {
  searchParams: Promise<{ busqueda?: string; tipo?: string }>;
}) {
  const { busqueda, tipo } = await searchParams;
  const propiedades = await PropiedadesRepository.listarAdmin({ busqueda, tipo });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Propiedades</h1>
        <Link
          href="/admin/propiedades/nueva"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
        >
          + Nueva
        </Link>
      </div>

      <Suspense fallback={null}>
        <AdminPropiedadesSearch />
      </Suspense>

      {propiedades.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          {busqueda || tipo
            ? "No se encontraron propiedades con ese criterio"
            : "No hay propiedades registradas"}
        </div>
      ) : (
        <>
          {/* Vista móvil — cards */}
          <div className="md:hidden space-y-3">
            {propiedades.map((propiedad) => (
              <div key={propiedad.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-semibold bg-gold-100 text-gold-700 px-2 py-1 rounded-full">
                    {propiedad.codigo_propiedad || "N/A"}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {propiedad.tipo}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      propiedad.disponible
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {propiedad.disponible ? "Disponible" : "No disponible"}
                    </span>
                  </div>
                </div>

                <p className="font-semibold text-gray-900 text-sm leading-snug mb-1">
                  {propiedad.titulo}
                </p>
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span className="font-semibold text-gray-800">${propiedad.precio.toLocaleString()}</span>
                  <span>·</span>
                  <span>{propiedad.ciudad}</span>
                </div>

                <div className="flex gap-2 pt-2 border-t border-gray-100">
                  <Link
                    href={`/admin/propiedades/${propiedad.id}/editar`}
                    className="flex-1 text-center text-sm font-medium text-navy-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                  >
                    Editar
                  </Link>
                  <div className="flex-1">
                    <DeleteButton id={propiedad.id} titulo={propiedad.titulo} fullWidth />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Vista desktop — tabla */}
          <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ref.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {propiedades.map((propiedad) => (
                  <tr key={propiedad.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm font-semibold bg-gold-100 text-gold-700 px-3 py-1 rounded-full">
                        {propiedad.codigo_propiedad || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{propiedad.titulo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {propiedad.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${propiedad.precio.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {propiedad.ciudad}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        propiedad.disponible
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}>
                        {propiedad.disponible ? "Disponible" : "No disponible"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/propiedades/${propiedad.id}/editar`}
                          className="text-navy-700 hover:text-navy-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors"
                        >
                          Editar
                        </Link>
                        <DeleteButton id={propiedad.id} titulo={propiedad.titulo} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
