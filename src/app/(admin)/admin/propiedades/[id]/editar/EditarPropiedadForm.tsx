"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PriceInput } from "@/components/ui/price-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Trash2, Upload } from "lucide-react";
import { Propiedad } from "@/types";

export default function EditarPropiedadForm({
  propiedad,
}: {
  propiedad: Propiedad;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagenes, setImagenes] = useState<{ publicId: string; url: string }[]>(
    propiedad.imagenes || [],
  );
  const [form, setForm] = useState({
    titulo: propiedad.titulo,
    descripcion: propiedad.descripcion || "",
    tipo: propiedad.tipo,
    precio: String(propiedad.precio),
    area: propiedad.area ? String(propiedad.area) : "",
    ubicacion: propiedad.ubicacion,
    ciudad: propiedad.ciudad,
    sector: propiedad.sector || "",
    dormitorios: propiedad.dormitorios ? String(propiedad.dormitorios) : "",
    banos: propiedad.banos ? String(propiedad.banos) : "",
    destacado: propiedad.destacado,
    disponible: propiedad.disponible,
  });

  const esCasa = form.tipo === "casa";

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imagenes.length === 0) {
      alert("Agrega al menos una imagen");
      return;
    }
    setLoading(true);

    const res = await fetch("/api/propiedades", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
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
    });

    setLoading(false);
    if (res.ok) router.push("/admin/propiedades");
    else {
      const { error } = await res.json();
      alert("Error al guardar: " + error);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">

      {/* Imágenes */}
      <div>
        <Label className="block text-sm font-semibold text-gray-700 mb-3">
          Imágenes de la propiedad *
        </Label>
        {imagenes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {imagenes.map((img, i) => (
              <div
                key={i}
                className={`relative group aspect-video rounded-lg overflow-hidden border-2 transition-colors ${
                  i === 0 ? "border-gold-400" : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <Image src={img.url} alt="" fill className="object-cover" />

                {/* Botón eliminar */}
                <button
                  type="button"
                  onClick={() => setImagenes(imagenes.filter((_, j) => j !== i))}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5
                             opacity-0 group-hover:opacity-100 transition-opacity shadow"
                >
                  <Trash2 size={13} />
                </button>

                {/* Etiqueta principal */}
                {i === 0 ? (
                  <span className="absolute bottom-2 left-2 bg-gold-500 text-navy-900 text-xs px-2 py-1 rounded font-bold shadow">
                    ★ Principal
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const nuevas = [...imagenes];
                      const [seleccionada] = nuevas.splice(i, 1);
                      setImagenes([seleccionada, ...nuevas]);
                    }}
                    className="absolute bottom-2 left-2 bg-black/60 hover:bg-gold-500 text-white hover:text-navy-900 text-xs px-2 py-1 rounded font-semibold shadow
                               opacity-0 group-hover:opacity-100 transition-all"
                  >
                    Hacer principal
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        <CldUploadWidget
          uploadPreset="reina-del-cisne-properties"
          onSuccess={(result: any) => {
            const info = result?.info;
            if (info)
              setImagenes((prev) => [
                ...prev,
                { publicId: info.public_id, url: info.secure_url },
              ]);
          }}
          options={{ multiple: true, maxFiles: 10, resourceType: "image" }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="flex items-center gap-2 border-2 border-dashed border-gray-300
                         hover:border-navy-700 text-gray-500 hover:text-navy-700 rounded-lg
                         px-6 py-4 transition-colors text-sm w-full justify-center"
            >
              <Upload size={16} />
              {imagenes.length === 0 ? "Subir imágenes" : "Agregar más imágenes"}
            </button>
          )}
        </CldUploadWidget>
      </div>

      <hr className="border-gray-100" />

      {/* Información principal */}
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="titulo" className="text-sm font-semibold text-gray-700">
            Título *
          </Label>
          <Input
            id="titulo"
            required
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipo" className="text-sm font-semibold text-gray-700">
            Tipo *
          </Label>
          <Select
            value={form.tipo}
            onValueChange={(v) =>
              setForm({ ...form, tipo: v as "lote" | "casa" })
            }
          >
            <SelectTrigger id="tipo" className="h-11 bg-white text-gray-900 border-gray-300">
              <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper" className="bg-white border border-gray-200 shadow-lg text-gray-900">
              <SelectItem value="lote">Lote</SelectItem>
              <SelectItem value="casa">Casa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="precio" className="text-sm font-semibold text-gray-700">
            Precio (USD) *
          </Label>
          <PriceInput
            required
            value={form.precio}
            onChange={(v) => setForm({ ...form, precio: v })}
            id="precio"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="area" className="text-sm font-semibold text-gray-700">
            Área (m²) *
          </Label>
          <Input
            id="area"
            type="number"
            required
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ciudad" className="text-sm font-semibold text-gray-700">
            Ciudad *
          </Label>
          <Input
            id="ciudad"
            required
            value={form.ciudad}
            onChange={(e) => setForm({ ...form, ciudad: e.target.value })}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ubicacion" className="text-sm font-semibold text-gray-700">
            Dirección / Ubicación *
          </Label>
          <Input
            id="ubicacion"
            required
            value={form.ubicacion}
            onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sector" className="text-sm font-semibold text-gray-700">
            Sector *
          </Label>
          <Input
            id="sector"
            required
            value={form.sector}
            onChange={(e) => setForm({ ...form, sector: e.target.value })}
            className="h-11"
          />
        </div>

        {esCasa && (
          <>
            <div className="space-y-2">
              <Label htmlFor="dormitorios" className="text-sm font-semibold text-gray-700">
                Dormitorios *
              </Label>
              <Input
                id="dormitorios"
                type="number"
                required={esCasa}
                min={1}
                value={form.dormitorios}
                onChange={(e) => setForm({ ...form, dormitorios: e.target.value })}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="banos" className="text-sm font-semibold text-gray-700">
                Baños *
              </Label>
              <Input
                id="banos"
                type="number"
                required={esCasa}
                min={1}
                value={form.banos}
                onChange={(e) => setForm({ ...form, banos: e.target.value })}
                className="h-11"
              />
            </div>
          </>
        )}

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="descripcion" className="text-sm font-semibold text-gray-700">
            Descripción *
          </Label>
          <Textarea
            id="descripcion"
            rows={5}
            required
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          />
        </div>

        <div className="md:col-span-2 flex gap-8 pt-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.disponible}
              onChange={(e) => setForm({ ...form, disponible: e.target.checked })}
              className="w-4 h-4 accent-navy-700"
            />
            <span className="text-sm font-medium text-gray-700">Disponible</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.destacado}
              onChange={(e) => setForm({ ...form, destacado: e.target.checked })}
              className="w-4 h-4 accent-navy-700"
            />
            <span className="text-sm font-medium text-gray-700">Destacar en inicio</span>
          </label>
        </div>
      </div>

      <hr className="border-gray-100" />

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.push("/admin/propiedades")}
          className="flex-1 border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Cancelar
        </button>
        <button type="submit" disabled={loading} className="btn-primary flex-1 py-3">
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
}
