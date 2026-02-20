import Link from 'next/link'
import Image from 'next/image'
import { Propiedad } from '@/types'
import { formatearPrecio, formatearArea } from '@/lib/utils'
import { MapPin, BedDouble, Bath, Maximize } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
 
export default function PropertyCard({ propiedad, imageHeight = 'h-52' }: { propiedad: Propiedad; imageHeight?: string }) {
  const img = propiedad.imagen_principal || propiedad.imagenes?.[0]?.url || '/placeholder.jpg'

  return (
    <Link href={`/propiedades/${propiedad.id}`} className='card-property group block'>
      {/* Imagen */}
      <div className={`relative ${imageHeight} overflow-hidden`}>
        <Image src={img} alt={propiedad.titulo} fill className='object-cover
               group-hover:scale-105 transition-transform duration-500' />
        <div className='absolute top-3 left-3 flex gap-2'>
          <Badge className='bg-navy-700 text-white capitalize'>{propiedad.tipo}</Badge>
          {propiedad.destacado && <Badge className='bg-gold-500 text-navy-900'>Destacado</Badge>}
        </div>
      </div>
      {/* Info */}
      <div className='p-5'>
        <p className='text-gold-500 font-bold text-xl mb-1'>{formatearPrecio(propiedad.precio)}</p>
        <h3 className='font-semibold text-navy-700 text-base mb-2 line-clamp-2'>{propiedad.titulo}</h3>
        <p className='text-gray-500 text-xs flex items-center gap-1 mb-3'>
          <MapPin size={12} /> {propiedad.ciudad}{propiedad.sector ? `, ${propiedad.sector}` : ''}
        </p>
        {/* Caracteristicas */}
        <div className='flex gap-4 text-xs text-gray-500 border-t pt-3'>
          {propiedad.area && <span className='flex items-center gap-1'><Maximize size={12}/> {formatearArea(propiedad.area)}</span>}
          {propiedad.dormitorios && <span className='flex items-center gap-1'><BedDouble size={12}/> {propiedad.dormitorios} dorm.</span>}
          {propiedad.banos && <span className='flex items-center gap-1'><Bath size={12}/> {propiedad.banos} baños</span>}
        </div>
      </div>
    </Link>
  )
}
