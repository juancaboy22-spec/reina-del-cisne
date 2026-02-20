import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
 
export default function Footer() {
  return (
    <footer className='bg-navy-900 text-white pt-16 pb-8'>
      <div className='container mx-auto px-4 grid md:grid-cols-3 gap-10'>
        {/* Marca */}
        <div>
          <h3 className='font-serif text-gold-400 text-xl mb-4'>Reina del Cisne</h3>
          <p className='text-gray-400 text-sm leading-relaxed'>
            Tu aliado de confianza en bienes raíces. Lotes y casas en las mejores
            ubicaciones para hacer realidad tu sueño.
          </p>
        </div>
        {/* Links */}
        <div>
          <h4 className='text-gold-400 font-semibold mb-4'>Navegación</h4>
          <ul className='space-y-2 text-sm text-gray-400'>
            <li><Link href='/' className='hover:text-gold-400 transition-colors'>Inicio</Link></li>
            <li><Link href='/propiedades' className='hover:text-gold-400 transition-colors'>Propiedades</Link></li>
            <li><Link href='/contacto' className='hover:text-gold-400 transition-colors'>Contacto</Link></li>
          </ul>
        </div>
        {/* Contacto */}
        <div>
          <h4 className='text-gold-400 font-semibold mb-4'>Contáctanos</h4>
          <ul className='space-y-3 text-sm text-gray-400'>
            <li className='flex gap-2'><Phone size={16} className='text-gold-400 shrink-0 mt-0.5'/> +593 99 600 9652</li>
            <li className='flex gap-2'><Mail size={16} className='text-gold-400 shrink-0 mt-0.5'/>guadalupem25j@yahoo.es</li>
            <li className='flex gap-2'><MapPin size={16} className='text-gold-400 shrink-0 mt-0.5'/> Loja, Ecuador</li>
          </ul>
        </div>
      </div>
      <div className='border-t border-navy-700 mt-10 pt-6 flex justify-between items-center text-xs text-gray-500 px-4'>
        <Link href='/admin/login' className='hover:text-gray-400 transition-colors'>
          Administración
        </Link>
        <span>© {new Date().getFullYear()} Inmobiliaria Reina del Cisne. Todos los derechos reservados.</span>
      </div>
    </footer>
  )
}
