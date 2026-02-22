'use client'
import { useState } from 'react'
import { User, Mail, Phone, MessageSquare, CheckCircle, Send } from 'lucide-react'

export default function ContactForm({ propiedadId }: { propiedadId?: string }) {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', mensaje: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, propiedad_id: propiedadId })
    })
    setLoading(false)
    if (res.ok) setSent(true)
    else setError('Ocurrió un error. Por favor intenta de nuevo.')
  }

  if (sent) return (
    <div className='flex flex-col items-center justify-center py-12 text-center'>
      <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5'>
        <CheckCircle className='text-green-500' size={40} />
      </div>
      <h3 className='text-xl font-bold text-navy-700 mb-2'>¡Mensaje enviado!</h3>
      <p className='text-gray-500 text-sm max-w-xs'>
        Nuestro asesor revisará tu mensaje y se contactará contigo a la brevedad posible.
      </p>
    </div>
  )

  const inputCls = 'w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent focus:bg-white transition-all text-sm'

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>

      {/* Nombre */}
      <div>
        <label htmlFor='nombre' className='flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2'>
          <User size={13} className='text-gold-500' />
          Nombre completo
        </label>
        <input
          id='nombre'
          type='text'
          required
          placeholder='Ej: Juan Pérez'
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })}
          className={inputCls}
        />
      </div>

      {/* Email + Teléfono en grid */}
      <div className='grid sm:grid-cols-2 gap-5'>
        <div>
          <label htmlFor='email' className='flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2'>
            <Mail size={13} className='text-gold-500' />
            Correo electrónico
          </label>
          <input
            id='email'
            type='email'
            required
            placeholder='juan@correo.com'
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor='telefono' className='flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2'>
            <Phone size={13} className='text-gold-500' />
            Teléfono / WhatsApp
          </label>
          <input
            id='telefono'
            type='tel'
            required
            placeholder='+593 99 000 0000'
            value={form.telefono}
            onChange={e => setForm({ ...form, telefono: e.target.value })}
            className={inputCls}
          />
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor='mensaje' className='flex items-center gap-1.5 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2'>
          <MessageSquare size={13} className='text-gold-500' />
          Mensaje
        </label>
        <textarea
          id='mensaje'
          required
          rows={5}
          placeholder='Cuéntanos qué tipo de propiedad buscas, sector de preferencia, presupuesto...'
          value={form.mensaje}
          onChange={e => setForm({ ...form, mensaje: e.target.value })}
          className={`${inputCls} resize-none`}
        />
      </div>

      {error && (
        <p className='text-red-600 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3'>
          {error}
        </p>
      )}

      <button
        type='submit'
        disabled={loading}
        className='w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-3.5 px-6 rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg'
      >
        {loading ? (
          <>
            <div className='w-4 h-4 border-2 border-navy-700/30 border-t-navy-700 rounded-full animate-spin' />
            Enviando...
          </>
        ) : (
          <>
            <Send size={16} />
            Enviar mensaje
          </>
        )}
      </button>
    </form>
  )
}
