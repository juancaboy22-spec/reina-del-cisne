'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle } from 'lucide-react'
 
export default function ContactForm({ propiedadId }: { propiedadId?: string }) {
  const [form, setForm] = useState({ nombre:'', email:'', telefono:'', mensaje:'' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, propiedad_id: propiedadId })
    })
    setLoading(false)
    if (res.ok) setSent(true)
    else setError('Ocurrió un error. Intenta de nuevo.')
  }
 
  if (sent) return (
    <div className='text-center py-12'>
      <CheckCircle className='mx-auto text-green-500 mb-4' size={48} />
      <h3 className='text-navy-700 font-semibold text-xl'>¡Mensaje enviado!</h3>
      <p className='text-gray-500 mt-2'>Nuestro asesor se contactará contigo pronto.</p>
    </div>
  )
 
  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <div><Label htmlFor='nombre'>Nombre completo *</Label>
        <Input id='nombre' required value={form.nombre}
               onChange={e => setForm({...form, nombre: e.target.value})} /></div>
      <div><Label htmlFor='email'>Correo electrónico *</Label>
        <Input id='email' type='email' required value={form.email}
               onChange={e => setForm({...form, email: e.target.value})} /></div>
      <div><Label htmlFor='telefono'>Teléfono / WhatsApp</Label>
        <Input id='telefono' value={form.telefono}
               onChange={e => setForm({...form, telefono: e.target.value})} /></div>
      <div><Label htmlFor='mensaje'>Mensaje *</Label>
        <Textarea id='mensaje' required rows={4} value={form.mensaje}
                  onChange={e => setForm({...form, mensaje: e.target.value})} /></div>
      {error && <p className='text-red-500 text-sm'>{error}</p>}
      <button type='submit' disabled={loading} className='btn-primary w-full'>
        {loading ? 'Enviando...' : 'Enviar Mensaje'}
      </button>
    </form>
  )
}
