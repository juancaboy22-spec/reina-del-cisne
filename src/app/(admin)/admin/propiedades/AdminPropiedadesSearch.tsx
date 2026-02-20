'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { Search, LayoutGrid, TreePine, Home, X } from 'lucide-react'

export default function AdminPropiedadesSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [busqueda, setBusqueda] = useState(searchParams.get('busqueda') || '')
  const tipoActual = searchParams.get('tipo') || ''
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const buildUrl = (overrides: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(overrides).forEach(([key, value]) => {
      if (value) params.set(key, value)
      else params.delete(key)
    })
    return `/admin/propiedades?${params.toString()}`
  }

  const handleSearch = (value: string) => {
    setBusqueda(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      router.push(buildUrl({ busqueda: value }))
    }, 350)
  }

  const handleTipo = (tipo: string) => {
    router.push(buildUrl({ tipo }))
  }

  const tipos = [
    { value: '', label: 'Todos', icon: LayoutGrid },
    { value: 'lote', label: 'Lotes', icon: TreePine },
    { value: 'casa', label: 'Casas', icon: Home },
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Buscador */}
      <div className="relative flex-1">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Buscar por título o código..."
          value={busqueda}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-9 pr-9 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-navy-700/20 focus:border-navy-700 bg-white"
        />
        {busqueda && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Filtro de tipo */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg shrink-0">
        {tipos.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => handleTipo(value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              tipoActual === value
                ? 'bg-navy-700 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
