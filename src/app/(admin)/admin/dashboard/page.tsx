import { PropiedadesRepository } from '@/repositories/propiedades.repository'
import { ContactosRepository } from '@/repositories/contactos.repository'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Building2, MessageSquare, TrendingUp, Plus } from 'lucide-react'
 
export default async function DashboardPage() {
  // Auth sigue en Supabase directamente — es infraestructura, no datos de negocio
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
 
  // Datos de negocio via repositorios — sin tocar Supabase directamente
  const [totalProps, disponibles, mensajes] = await Promise.all([
    PropiedadesRepository.contar(),
    PropiedadesRepository.contarDisponibles(),
    ContactosRepository.contarNoLeidos(),
  ])
 
  const stats = [
    { label: 'Total propiedades', value: totalProps, icon: Building2, color: 'bg-navy-700' },
    { label: 'Disponibles', value: disponibles, icon: TrendingUp, color: 'bg-green-600' },
    { label: 'Mensajes sin leer', value: mensajes, icon: MessageSquare, color: 'bg-gold-500' },
  ]
 
  return (
    <div>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-2xl font-bold text-navy-700'>Dashboard</h1>
          <p className='text-gray-500 text-sm'>Bienvenido, {user?.email}</p>
        </div>
        <Link href='/admin/propiedades/nueva' className='btn-primary flex items-center gap-2'>
          <Plus size={16} /> Nueva Propiedad
        </Link>
      </div>
      <div className='grid md:grid-cols-3 gap-6 mb-10'>
        {stats.map(s => (
          <div key={s.label} className='bg-white rounded-xl p-6 shadow-sm border flex items-center gap-4'>
            <div className={`${s.color} text-white p-3 rounded-lg`}>
              <s.icon size={24} />
            </div>
            <div>
              <p className='text-3xl font-bold text-navy-700'>{s.value}</p>
              <p className='text-gray-500 text-sm'>{s.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='grid md:grid-cols-2 gap-6'>
        <Link href='/admin/propiedades' className='block bg-white rounded-xl p-6 shadow-sm border hover:border-navy-700 transition-colors'>
          <h2 className='font-semibold text-navy-700 mb-1'>Gestionar Propiedades</h2>
          <p className='text-gray-500 text-sm'>Agregar, editar o eliminar propiedades del catálogo</p>
        </Link>
        <Link href='/admin/contactos' className='block bg-white rounded-xl p-6 shadow-sm border hover:border-navy-700 transition-colors'>
          <h2 className='font-semibold text-navy-700 mb-1'>Ver Mensajes</h2>
          <p className='text-gray-500 text-sm'>Revisa los mensajes de clientes interesados</p>
        </Link>
      </div>
    </div>
  )
}
