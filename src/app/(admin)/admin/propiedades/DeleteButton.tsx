'use client'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import { Trash2, AlertTriangle } from 'lucide-react'

export default function DeleteButton({ id, titulo, fullWidth }: { id: string; titulo: string; fullWidth?: boolean }) {
  const [abierto, setAbierto] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setLoading(true)
    const res = await fetch('/api/propiedades', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setLoading(false)
    if (res.ok) {
      setAbierto(false)
      router.refresh()
    } else {
      alert('Error al eliminar la propiedad')
    }
  }

  return (
    <>
      {/* Botón disparador */}
      <button
        onClick={() => setAbierto(true)}
        className={`flex items-center justify-center gap-1 text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded transition-colors${fullWidth ? ' w-full py-2 text-sm font-medium rounded-lg' : ''}`}
      >
        <Trash2 size={14} />
        Eliminar
      </button>

      {/* Modal */}
      {abierto && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => !loading && setAbierto(false)}
        >
          <div
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-5">
              <div className="bg-red-100 rounded-full p-2 shrink-0">
                <AlertTriangle size={22} className="text-red-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-1">
                  Eliminar propiedad
                </h3>
                <p className="text-sm text-gray-500">
                  ¿Estás seguro que deseas eliminar{' '}
                  <span className="font-semibold text-gray-800">"{titulo}"</span>?
                  Esta acción no se puede deshacer.
                </p>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setAbierto(false)}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Trash2 size={14} />
                {loading ? 'Eliminando...' : 'Sí, eliminar'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
