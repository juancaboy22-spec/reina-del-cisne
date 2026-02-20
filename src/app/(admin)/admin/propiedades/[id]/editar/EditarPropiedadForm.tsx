'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CldUploadWidget } from 'next-cloudinary'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Image from 'next/image'
import { Trash2, Upload } from 'lucide-react'
import { Propiedad } from '@/types'

export default function EditarPropiedadForm({ propiedad }: { propiedad: Propiedad }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imagenes, setImagenes] = useState<{ publicId: string; url: string }[]>(
    propiedad.imagenes || []
  )
  const [form, setForm] = useState({
    titulo: propiedad.titulo,
    descripcion: propiedad.descripcion || '',
    tipo: propiedad.tipo,
    precio: String(propiedad.precio),
    area: propiedad.area ? String(propiedad.area) : '',
    ubicacion: propiedad.ubicacion,
    ciudad: propiedad.ciudad,
    sector: propiedad.sector || '',
    dormitorios: propiedad.dormitorios ? String(propiedad.dormitorios) : '',
    banos: propiedad.banos ? String(propiedad.banos) : '',
    destacado: propiedad.destacado,
    disponible: propiedad.disponible,
  })

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (imagenes.length === 0) { alert('Agrega al menos una imagen'); return }
    setLoading(true)

    const res = await fetch('/api/propiedades', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: propiedad.id,
        ...form,
        precio: Number(form.precio),
        area: form.area ? Number(form.area) : null,
        dormitorios: form.dormitorios ? Number(form.dormitorios) : null,
        banos: form.banos ? Number(form.banos) : null,
        imagenes,
        imagen_principal: imagenes[0]?.url,
      }),
    })

    setLoading(false)
    if (res.ok) router.push('/admin/propiedades')
    else {
      const { error } = await res.json()
      alert('Error al guardar: ' + error)
    }
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 bg-white p-8 rounded-xl shadow-sm border">

      {/* Imágenes */}
      <div>
        <Label className="block mb-3">Imágenes de la propiedad *</Label>
        <div className="grid grid-cols-3 gap-3 mb-3">
          {imagenes.map((img, i) => (
            <div key={i} className="relative group aspect-video rounded-lg overflow-hidden border">
              <Image src={img.url} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => setImagenes(imagenes.filter((_, j) => j !== i))}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1
                           opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={12} />
              </button>
              {i === 0 && (
                <span className="absolute bottom-1 left-1 bg-gold-500 text-navy-900 text-xs px-2 py-0.5 rounded font-semibold">
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
        <CldUploadWidget
          uploadPreset="reina-del-cisne-properties"
          onSuccess={(result: any) => {
            const info = result?.info
            if (info) setImagenes(prev => [...prev, { publicId: info.public_id, url: info.secure_url }])
          }}
          options={{ multiple: true, maxFiles: 10, resourceType: 'image' }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="flex items-center gap-2 border-2 border-dashed border-gray-300
                         hover:border-navy-700 text-gray-500 hover:text-navy-700 rounded-lg
                         px-6 py-3 transition-colors text-sm"
            >
              <Upload size={16} /> Agregar más imágenes
            </button>
          )}
        </CldUploadWidget>
      </div>

      {/* Campos */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Label>Título *</Label>
          <Input required value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} />
        </div>
        <div>
          <Label>Tipo *</Label>
          <Select value={form.tipo} onValueChange={v => setForm({ ...form, tipo: v as 'lote' | 'casa' })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="lote">Lote</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Precio (USD) *</Label>
          <Input required type="number" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} />
        </div>
        <div>
          <Label>Área (m²)</Label>
          <Input type="number" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} />
        </div>
        <div>
          <Label>Ciudad</Label>
          <Input value={form.ciudad} onChange={e => setForm({ ...form, ciudad: e.target.value })} />
        </div>
        <div>
          <Label>Sector</Label>
          <Input value={form.sector} onChange={e => setForm({ ...form, sector: e.target.value })} />
        </div>
        <div>
          <Label>Dormitorios</Label>
          <Input type="number" value={form.dormitorios} onChange={e => setForm({ ...form, dormitorios: e.target.value })} />
        </div>
        <div>
          <Label>Baños</Label>
          <Input type="number" value={form.banos} onChange={e => setForm({ ...form, banos: e.target.value })} />
        </div>
        <div className="md:col-span-2">
          <Label>Ubicación / Dirección *</Label>
          <Input required value={form.ubicacion} onChange={e => setForm({ ...form, ubicacion: e.target.value })} />
        </div>
        <div className="md:col-span-2">
          <Label>Descripción</Label>
          <Textarea rows={4} value={form.descripcion} onChange={e => setForm({ ...form, descripcion: e.target.value })} />
        </div>
        <div className="md:col-span-2 flex gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.disponible}
              onChange={e => setForm({ ...form, disponible: e.target.checked })} />
            <span className="text-sm text-gray-700">Disponible</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.destacado}
              onChange={e => setForm({ ...form, destacado: e.target.checked })} />
            <span className="text-sm text-gray-700">Destacar en inicio</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={() => router.push('/admin/propiedades')}
          className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
          Cancelar
        </button>
        <button type="submit" disabled={loading} className="btn-primary flex-1">
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>
    </form>
  )
}
