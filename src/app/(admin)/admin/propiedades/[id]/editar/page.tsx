import { PropiedadesRepository } from "@/repositories/propiedades.repository";
import { notFound } from "next/navigation";
import EditarPropiedadForm from "./EditarPropiedadForm";

export default async function EditarPropiedadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const propiedad = await PropiedadesRepository.obtenerPorId(id);
  if (!propiedad) notFound();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-navy-700">Editar propiedad</h1>
        <p className="text-sm text-gray-500 mt-1">{propiedad.titulo}</p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-8">
        <EditarPropiedadForm propiedad={propiedad} />
      </div>
    </div>
  );
}
