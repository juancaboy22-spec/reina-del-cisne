'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCheck } from 'lucide-react'

export default function MarcarLeidoButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    setLoading(true)
    await fetch('/api/contactos', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setLoading(false)
    router.refresh()
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="shrink-0 flex items-center gap-1 text-sm text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
    >
      <CheckCheck size={14} />
      {loading ? '...' : 'Marcar leído'}
    </button>
  )
}
