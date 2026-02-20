import { PropiedadesRepository } from '@/repositories/propiedades.repository'
import PropertyCard from '@/components/properties/PropertyCard'
import { Propiedad } from '@/types'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Propiedades en Venta',
  description: 'Listado de lotes y casas disponibles en Loja, Ecuador',
}
 
export default async function PropiedadesPage({
  searchParams
}: {
  searchParams: { tipo?: string; min?: string; max?: string }
}) {
  // Construimos los filtros y el repositorio hace el trabajo
  const propiedades = await PropiedadesRepository.listar({
    tipo: searchParams.tipo as any,
    precioMin: searchParams.min ? Number(searchParams.min) : undefined,
    precioMax: searchParams.max ? Number(searchParams.max) : undefined,
  })
 
  return (
    <div className='min-h-screen'>
      {/* Header */}
      <div className='bg-navy-700 py-16 text-center text-white'>
        <p className='text-gold-400 uppercase tracking-widest text-sm mb-2'>Disponibles</p>
        <h1 className='font-serif text-4xl font-bold'>Propiedades en Venta</h1>
      </div>
 
      {/* Filtros */}
      <div className='bg-white shadow-md py-4'>
        <div className='container mx-auto px-4 flex flex-wrap gap-4'>
          <a href='/propiedades' className='px-4 py-2 rounded-full text-sm border border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white transition-colors'>
            Todos
          </a>
          <a href='/propiedades?tipo=lote' className='px-4 py-2 rounded-full text-sm border border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white transition-colors'>
            Lotes
          </a>
          <a href='/propiedades?tipo=casa' className='px-4 py-2 rounded-full text-sm border border-navy-700 text-navy-700 hover:bg-navy-700 hover:text-white transition-colors'>
            Casas
          </a>
        </div>
      </div>
 
      {/* Grid */}
      <div className='container mx-auto px-4 py-12'>
        {propiedades.length > 0 ? (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {propiedades.map((p: Propiedad) => <PropertyCard key={p.id} propiedad={p} />)}
          </div>
        ) : (
          <div className='text-center py-20 text-gray-400'>
            <p className='text-xl'>No hay propiedades disponibles</p>
          </div>
        )}
      </div>
    </div>
  )

  
}

