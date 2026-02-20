import { PropiedadesRepository } from '@/repositories/propiedades.repository'
import { notFound } from 'next/navigation'
import EditarPropiedadForm from './EditarPropiedadForm'

export default async function EditarPropiedadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const propiedad = await PropiedadesRepository.obtenerPorId(id)
  if (!propiedad) notFound()

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-navy-700 mb-8">Editar Propiedad</h1>
      <EditarPropiedadForm propiedad={propiedad} />
    </div>
  )
}
