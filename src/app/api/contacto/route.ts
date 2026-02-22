import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { ContactosRepository } from '@/repositories/contactos.repository'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nombre, email, telefono, mensaje, propiedad_id } = body

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 })
    }

    // 1. Guardar en base de datos vía repositorio
    const { error: dbError } = await ContactosRepository.crear({
      nombre, email, telefono, mensaje, propiedad_id
    })
    if (dbError) console.error('Error guardando contacto:', dbError)

    // 2. Enviar email al asesor
    const { data, error: emailError } = await resend.emails.send({
      from: 'Reina del Cisne <onboarding@resend.dev>',
      to: [process.env.EMAIL_ASESOR!],
      subject: `Nuevo contacto de ${nombre} - Reina del Cisne`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color:#1B3A5C; border-bottom: 2px solid #C9A84C; padding-bottom: 8px;">
            Nuevo mensaje de contacto
          </h2>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
          ${propiedad_id ? `<p><strong>Propiedad de interés (ID):</strong> ${propiedad_id}</p>` : ''}
          <p><strong>Mensaje:</strong></p>
          <blockquote style="background:#f5f5f5; padding: 12px 16px; border-left: 4px solid #C9A84C; margin: 0;">
            ${mensaje}
          </blockquote>
        </div>
      `
    })

    if (emailError) {
      console.error('Error enviando email con Resend:', JSON.stringify(emailError))
      // El contacto ya fue guardado en BD; el email falló pero no bloqueamos la respuesta
    } else {
      console.log('Email enviado correctamente, id:', data?.id)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error inesperado en /api/contacto:', error)
    return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 })
  }
}
