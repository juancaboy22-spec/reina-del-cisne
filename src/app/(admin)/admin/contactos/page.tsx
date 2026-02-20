import { ContactosRepository } from '@/repositories/contactos.repository'
import type { Metadata } from 'next'
import { Mail, Phone, Building2, Clock } from 'lucide-react'
import MarcarLeidoButton from './MarcarLeidoButton'

export const metadata: Metadata = { title: 'Mensajes de Contacto' }

export default async function ContactosPage() {
  const contactos = await ContactosRepository.listar()
  const noLeidos = contactos.filter(c => !c.leido).length

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-navy-700">Mensajes</h1>
          {noLeidos > 0 && (
            <p className="text-sm text-gold-600 font-medium mt-1">
              {noLeidos} mensaje{noLeidos > 1 ? 's' : ''} sin leer
            </p>
          )}
        </div>
      </div>

      {contactos.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Mail size={48} className="mx-auto mb-4 opacity-30" />
          <p>No hay mensajes todavía</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contactos.map((contacto) => (
            <div
              key={contacto.id}
              className={`bg-white rounded-xl border shadow-sm p-6 transition-colors ${
                !contacto.leido ? 'border-gold-400 bg-gold-50/30' : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  {/* Cabecera */}
                  <div className="flex items-center gap-3 mb-3">
                    {!contacto.leido && (
                      <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0" />
                    )}
                    <h2 className="font-semibold text-navy-700 text-lg">{contacto.nombre}</h2>
                  </div>

                  {/* Datos de contacto */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <a href={`mailto:${contacto.email}`} className="flex items-center gap-1 hover:text-navy-700 transition-colors">
                      <Mail size={14} /> {contacto.email}
                    </a>
                    {contacto.telefono && (
                      <a href={`tel:${contacto.telefono}`} className="flex items-center gap-1 hover:text-navy-700 transition-colors">
                        <Phone size={14} /> {contacto.telefono}
                      </a>
                    )}
                    {contacto.propiedad_id && (
                      <span className="flex items-center gap-1 text-navy-600">
                        <Building2 size={14} /> Propiedad de interés
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {new Date(contacto.created_at).toLocaleDateString('es-EC', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {/* Mensaje */}
                  <p className="text-gray-700 bg-gray-50 rounded-lg p-4 text-sm leading-relaxed">
                    {contacto.mensaje}
                  </p>
                </div>

                {/* Acción */}
                {!contacto.leido && (
                  <MarcarLeidoButton id={contacto.id} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
