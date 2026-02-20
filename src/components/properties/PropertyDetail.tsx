import { Propiedad } from "@/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

interface PropertyDetailProps {
  propiedad: Propiedad;
}

export function PropertyDetail({ propiedad }: PropertyDetailProps) {
  const formatPrecio = (precio: number) => {
    return new Intl.NumberFormat("es-EC", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(precio);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Galería de imágenes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {propiedad.imagenes.length > 0 ? (
          <>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={propiedad.imagenes[0].url}
                alt={propiedad.imagenes[0].alt || propiedad.titulo}
                fill
                className="object-cover"
                priority
              />
            </div>
            {propiedad.imagenes.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {propiedad.imagenes.slice(1, 5).map((imagen, idx) => (
                  <div
                    key={idx}
                    className="relative h-44 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={imagen.url}
                      alt={imagen.alt || `${propiedad.titulo} ${idx + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="col-span-2 bg-gray-200 h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Sin imágenes</p>
          </div>
        )}
      </div>

      {/* Información de la propiedad */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{propiedad.titulo}</h1>
              <p className="text-gray-600">
                {propiedad.ubicacion}, {propiedad.ciudad}
                {propiedad.sector && ` - ${propiedad.sector}`}
              </p>
            </div>
            <Badge
              variant={propiedad.tipo === "casa" ? "default" : "secondary"}
            >
              {propiedad.tipo.toUpperCase()}
            </Badge>
          </div>

          <div className="text-4xl font-bold text-green-600 mb-6">
            {formatPrecio(propiedad.precio)}
          </div>

          {/* Características principales */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {propiedad.area && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Área</p>
                <p className="text-lg font-semibold">{propiedad.area} m²</p>
              </div>
            )}
            {propiedad.dormitorios && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Dormitorios</p>
                <p className="text-lg font-semibold">{propiedad.dormitorios}</p>
              </div>
            )}
            {propiedad.banos && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Baños</p>
                <p className="text-lg font-semibold">{propiedad.banos}</p>
              </div>
            )}
          </div>

          {/* Descripción */}
          {propiedad.descripcion && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-3">Descripción</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {propiedad.descripcion}
              </p>
            </div>
          )}

          {/* Características adicionales */}
          {propiedad.caracteristicas &&
            propiedad.caracteristicas.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-3">Características</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {propiedad.caracteristicas.map((caracteristica, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <span className="mr-2">✓</span>
                      {caracteristica}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>

        {/* Sidebar de contacto */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
            <h3 className="text-xl font-semibold mb-4">
              ¿Te interesa esta propiedad?
            </h3>
            <p className="text-gray-600 mb-6">
              Contáctanos para más información o para agendar una visita.
            </p>
            <WhatsAppButton />
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-gray-500">
                Código: {propiedad.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
