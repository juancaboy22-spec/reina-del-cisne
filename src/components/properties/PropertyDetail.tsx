"use client";

import { Propiedad } from "@/types";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import {
  MapPin,
  Maximize2,
  Bed,
  Bath,
  Home,
  Tag,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface PropertyDetailProps {
  propiedad: Propiedad;
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export function PropertyDetail({ propiedad }: PropertyDetailProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const formatPrecio = (precio: number) =>
    new Intl.NumberFormat("es-EC", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(precio);

  let imagenes: { url: string; publicId: string }[] = [];
  if (Array.isArray(propiedad.imagenes)) {
    imagenes = propiedad.imagenes.map((img: any) =>
      typeof img === "string" ? { url: img, publicId: "" } : img,
    );
  }

  const esCasa = propiedad.tipo === "casa";

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappMessage = encodeURIComponent(
    `Hola, me interesa la propiedad: ${propiedad.titulo}${propiedad.codigo_propiedad ? ` (${propiedad.codigo_propiedad})` : ""}`,
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const propiedadUrl = `https://reinadelcisne.com/propiedades/${propiedad.id}`;
  const shareWhatsappUrl = `https://wa.me/?text=${encodeURIComponent(`🏠 ${propiedad.titulo} — $${propiedad.precio.toLocaleString()} USD\n${propiedadUrl}`)}`;
  const shareFacebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propiedadUrl)}`;

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + imagenes.length) % imagenes.length : null,
    );
  }, [imagenes.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % imagenes.length : null));
  }, [imagenes.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, prev, next]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Lightbox */}
      {lightboxIndex !== null && imagenes[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Cerrar */}
          <button
            className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            onClick={closeLightbox}
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>

          {/* Contador */}
          <span className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
            {lightboxIndex + 1} / {imagenes.length}
          </span>

          {/* Flecha izquierda */}
          {imagenes.length > 1 && (
            <button
              className="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Anterior"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* Imagen */}
          <div
            className="relative w-full max-w-4xl max-h-[85vh] mx-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={imagenes[lightboxIndex].url}
              alt={`${propiedad.titulo} ${lightboxIndex + 1}`}
              width={1200}
              height={800}
              className="object-contain w-full max-h-[85vh] rounded-lg"
              priority
            />
          </div>

          {/* Flecha derecha */}
          {imagenes.length > 1 && (
            <button
              className="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Siguiente"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      )}

      {/* Header */}
      <div className="bg-navy-900 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
                {propiedad.titulo}
              </h1>
              <p className="flex items-center gap-1.5 text-gray-300 text-sm">
                <MapPin size={15} className="text-gold-400 shrink-0" />
                {propiedad.ubicacion}, {propiedad.ciudad}
                {propiedad.sector && ` · ${propiedad.sector}`}
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <span className="bg-gold-500 text-navy-900 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                {propiedad.tipo}
              </span>
              {propiedad.disponible ? (
                <span className="text-green-400 text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Disponible
                </span>
              ) : (
                <span className="text-red-400 text-xs font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                  No disponible
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Galería */}
      <div className="container mx-auto px-4 py-6">
        {imagenes.length > 0 && imagenes[0]?.url ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:h-[500px] rounded-xl overflow-hidden mb-8 shadow-md">
            {/* Imagen principal */}
            <div
              className="md:col-span-2 relative h-72 md:h-full cursor-zoom-in"
              onClick={() => setLightboxIndex(0)}
            >
              <Image
                src={imagenes[0].url}
                alt={propiedad.titulo}
                fill
                className="object-cover"
                priority
              />
              {propiedad.destacado && (
                <div className="absolute top-4 left-4 bg-gold-500 text-navy-900 text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full shadow">
                  Destacado
                </div>
              )}
            </div>

            {/* Miniaturas */}
            <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
              {imagenes.slice(1, 4).map(
                (imagen, idx) =>
                  imagen?.url && (
                    <div
                      key={idx}
                      className="relative h-24 md:h-full cursor-zoom-in"
                      onClick={() => setLightboxIndex(idx + 1)}
                    >
                      <Image
                        src={imagen.url}
                        alt={`${propiedad.titulo} ${idx + 2}`}
                        fill
                        className="object-cover hover:opacity-85 transition-opacity"
                      />
                      {/* Indicador "ver más" en la última miniatura si hay más imágenes */}
                      {idx === 2 && imagenes.length > 4 && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            +{imagenes.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  ),
              )}
            </div>
          </div>
        ) : (
          <div className="h-80 bg-gray-200 rounded-xl flex items-center justify-center mb-8">
            <p className="text-gray-400 text-sm">Sin imágenes disponibles</p>
          </div>
        )}

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda */}
          <div className="lg:col-span-2 space-y-6">
            {/* Precio */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
                Precio
              </p>
              <p className="text-4xl font-bold text-navy-700">
                {formatPrecio(propiedad.precio)}
              </p>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
              {propiedad.area && (
                <div className="flex items-center gap-4 px-6 py-4">
                  <Maximize2 size={18} className="text-gold-500 shrink-0" />
                  <span className="text-sm text-gray-500 w-28">Área</span>
                  <span className="font-semibold text-navy-700">
                    {propiedad.area} m²
                  </span>
                </div>
              )}
              {esCasa && propiedad.dormitorios != null && (
                <div className="flex items-center gap-4 px-6 py-4">
                  <Bed size={18} className="text-gold-500 shrink-0" />
                  <span className="text-sm text-gray-500 w-28">
                    Dormitorios
                  </span>
                  <span className="font-semibold text-navy-700">
                    {propiedad.dormitorios}
                  </span>
                </div>
              )}
              {esCasa && propiedad.banos != null && (
                <div className="flex items-center gap-4 px-6 py-4">
                  <Bath size={18} className="text-gold-500 shrink-0" />
                  <span className="text-sm text-gray-500 w-28">Baños</span>
                  <span className="font-semibold text-navy-700">
                    {propiedad.banos}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-4 px-6 py-4">
                <Home size={18} className="text-gold-500 shrink-0" />
                <span className="text-sm text-gray-500 w-28">Tipo</span>
                <span className="font-semibold text-navy-700 capitalize">
                  {propiedad.tipo}
                </span>
              </div>
              {propiedad.ciudad && (
                <div className="flex items-center gap-4 px-6 py-4">
                  <MapPin size={18} className="text-gold-500 shrink-0" />
                  <span className="text-sm text-gray-500 w-28">Ciudad</span>
                  <span className="font-semibold text-navy-700">
                    {propiedad.ciudad}
                  </span>
                </div>
              )}
              {propiedad.codigo_propiedad && (
                <div className="flex items-center gap-4 px-6 py-4">
                  <Tag size={18} className="text-gold-500 shrink-0" />
                  <span className="text-sm text-gray-500 w-28">Código</span>
                  <span className="font-semibold text-navy-700 font-mono tracking-wide">
                    {propiedad.codigo_propiedad}
                  </span>
                </div>
              )}
            </div>

            {/* Descripción */}
            {propiedad.descripcion && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-navy-700 mb-4">
                  Descripción
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm">
                  {propiedad.descripcion}
                </p>
              </div>
            )}

            {/* Características */}
            {propiedad.caracteristicas &&
              propiedad.caracteristicas.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h2 className="text-lg font-bold text-navy-700 mb-4">
                    Características
                  </h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {propiedad.caracteristicas.map((c, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-navy-900 rounded-xl overflow-hidden shadow-lg">
              <div className="p-6 border-b border-navy-700">
                <p className="text-xs uppercase tracking-widest text-gold-400 mb-2">
                  ¿Te interesa?
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Contáctanos para más información o para agendar una visita.
                </p>
              </div>

              <div className="p-6 border-b border-navy-700">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  <WhatsAppIcon />
                  Escribir por WhatsApp
                </a>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Código</span>
                  <span className="text-gold-400 font-mono font-semibold">
                    {propiedad.codigo_propiedad ||
                      propiedad.id.slice(0, 8).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Disponibilidad</span>
                  {propiedad.disponible ? (
                    <span className="text-green-400 font-semibold">
                      Disponible
                    </span>
                  ) : (
                    <span className="text-red-400 font-semibold">
                      No disponible
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Tipo</span>
                  <span className="text-white capitalize font-semibold">
                    {propiedad.tipo}
                  </span>
                </div>
                {esCasa && propiedad.dormitorios != null && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Dormitorios</span>
                    <span className="text-white font-semibold">
                      {propiedad.dormitorios}
                    </span>
                  </div>
                )}
                {propiedad.area && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Área</span>
                    <span className="text-white font-semibold">
                      {propiedad.area} m²
                    </span>
                  </div>
                )}
              </div>

              {/* Compartir */}
              <div className="p-6 border-t border-navy-700">
                <p className="text-xs uppercase tracking-widest text-gold-400 mb-3">
                  Compartir propiedad
                </p>
                <div className="flex gap-2">
                  <a
                    href={shareFacebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                  >
                    <FacebookIcon />
                    Facebook
                  </a>
                  <a
                    href={shareWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
                  >
                    <WhatsAppIcon />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
