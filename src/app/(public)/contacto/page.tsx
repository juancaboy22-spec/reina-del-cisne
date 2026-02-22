import ContactForm from "@/components/contact/ContactForm";
import type { Metadata } from "next";
import { Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para asesoría personalizada y gratuita sobre lotes y casas en venta en Loja, Ecuador. Escríbenos por WhatsApp al +593 99 600 9652 o llena el formulario.",
  alternates: {
    canonical: "/contacto",
  },
  openGraph: {
    title: "Contacto - Inmobiliaria Reina del Cisne",
    description:
      "Asesoría personalizada y gratuita sobre propiedades en Loja, Ecuador. Escríbenos por WhatsApp o llena el formulario.",
    images: [
      {
        url: "/logo.png",
        width: 520,
        height: 520,
        alt: "Contacto Inmobiliaria Reina del Cisne",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Contacto - Inmobiliaria Reina del Cisne",
    description: "Asesoría gratuita sobre propiedades en Loja, Ecuador.",
  },
};

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy-900 py-24 text-center text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, #C9A84C 0px, #C9A84C 1px, transparent 1px, transparent 80px)",
          }}
        />
        <div className="relative">
          <p className="text-gold-400 uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            Estamos para ayudarte
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold">
            Contáctanos
          </h1>
          <div className="w-16 h-px bg-gold-500 mx-auto mt-5" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-8 items-start">
          {/* Panel izquierdo — info */}
          <div className="lg:col-span-2">
            <div className="bg-navy-800 rounded-2xl p-8 text-white sticky top-8">
              <h2 className="font-serif text-2xl font-bold mb-1">
                Información de contacto
              </h2>
              <p className="text-gold-400 text-sm mb-8 leading-relaxed">
                Escríbenos directamente por WhatsApp o completa el formulario y
                te respondemos a la brevedad.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gold-400/20 p-3 rounded-xl shrink-0">
                    <Phone size={18} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gold-400 uppercase tracking-wider mb-1">
                      Teléfono / WhatsApp
                    </p>
                    <a
                      href="tel:+593996009652"
                      className="font-semibold text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      +593 99 600 9652
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gold-400/20 p-3 rounded-xl shrink-0">
                    <MapPin size={18} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gold-400 uppercase tracking-wider mb-1">
                      Ubicación
                    </p>
                    <p className="font-semibold text-gold-400">
                      Calle Sucre y 10 de Agosto. Edf.Jiménez segundo piso
                      oficina 106
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gold-400/20 p-3 rounded-xl shrink-0">
                    <Clock size={18} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gold-400 uppercase tracking-wider mb-1">
                      Horario de atención
                    </p>
                    <p className="font-semibold text-gold-400">Lun – Sáb</p>
                    <p className="font-semibold text-gold-400">8:00 AM – 18:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <a
                  href="https://wa.me/593996009652?text=Hola%2C%20estoy%20interesado%20en%20una%20propiedad%20de%20Inmobiliaria%20Reina%20del%20Cisne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors w-full shadow-md"
                >
                  <WhatsAppIcon />
                  Escribir por WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Panel derecho — formulario */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-navy-700">
                  Envíanos un mensaje
                </h2>
                <p className="text-gray-400 text-sm mt-1">
                  Todos los campos son obligatorios.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
