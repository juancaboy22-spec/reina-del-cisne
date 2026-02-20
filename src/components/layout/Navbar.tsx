'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
 
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/propiedades', label: 'Propiedades' },
    { href: '/contacto', label: 'Contacto' },
  ]
 
  return (
    <header className='sticky top-0 z-50 bg-navy-700 shadow-lg'>
      <div className='container mx-auto px-4 h-20 flex items-center justify-between'>
        {/* Logo */}
        <Link href='/' className='flex items-center gap-3'>
          <Image src='/logo.png' alt='Reina del Cisne' width={50} height={50}
                 className='object-contain' />
          <span className='text-white font-serif text-lg font-bold hidden sm:block'>
            Reina del Cisne
          </span>
        </Link>
 
        {/* Desktop Nav */}
        <nav className='hidden md:flex items-center gap-8'>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className='text-gold-100 hover:text-gold-400 font-medium transition-colors'>
              {l.label}
            </Link>
          ))}
          <a href='tel:+593XXXXXXXXX'
            className='flex items-center gap-2 btn-gold text-sm'>
            <Phone size={16} /> Llámanos
          </a>
        </nav>
 
        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className='md:hidden text-white'>
          {open ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </div>
 
      {/* Mobile menu */}
      {open && (
        <div className='md:hidden bg-navy-900 px-4 pb-4 space-y-3'>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className='block text-gold-100 hover:text-gold-400 py-2'
              onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

