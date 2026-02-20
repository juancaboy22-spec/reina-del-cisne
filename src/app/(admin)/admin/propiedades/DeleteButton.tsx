'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'

export default function DeleteButton({ id, titulo }: { id: string; titulo: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar "${titulo}"? Esta acción no se puede deshacer.`)) return
    setLoading(true)
    const res = await fetch('/api/propiedades', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setLoading(false)
    if (res.ok) router.refresh()
    else alert('Error al eliminar la propiedad')
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded transition-colors disabled:opacity-50"
    >
      <Trash2 size={14} />
      {loading ? 'Eliminando...' : 'Eliminar'}
    </button>
  )
}
