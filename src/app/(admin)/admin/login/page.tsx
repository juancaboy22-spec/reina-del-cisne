'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
 
export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
 
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError('Credenciales incorrectas'); setLoading(false) }
    else router.push('/admin/dashboard')
  }
 
  return (
    <div className='min-h-screen bg-navy-900 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md'>
        <div className='text-center mb-8'>
          <Image src='/logo.png' alt='Logo' width={80} height={80} className='mx-auto mb-4' />
          <h1 className='font-serif text-2xl text-navy-700'>Panel Administrativo</h1>
          <p className='text-gray-400 text-sm'>Reina del Cisne</p>
        </div>
        <form onSubmit={handleLogin} className='space-y-4'>
          <div><Label>Correo electrónico</Label>
            <Input type='email' value={email} onChange={e => setEmail(e.target.value)} required /></div>
          <div><Label>Contraseña</Label>
            <Input type='password' value={password} onChange={e => setPassword(e.target.value)} required /></div>
          {error && <p className='text-red-500 text-sm'>{error}</p>}
          <button type='submit' disabled={loading} className='btn-primary w-full'>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
