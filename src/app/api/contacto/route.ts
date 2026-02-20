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
 
    // 1. Guardar en base de datos vía repositorio (no sabe si es Supabase o Appwrite)
    const { error: dbError } = await ContactosRepository.crear({
      nombre, email, telefono, mensaje, propiedad_id
    })
    if (dbError) console.error('Error guardando contacto:', dbError)
 
    // 2. Enviar email al asesor
    await resend.emails.send({
      from: 'noreply@reinadelcisne.com',
      to: process.env.EMAIL_ASESOR!,
      subject: `Nuevo contacto de ${nombre} - Reina del Cisne`,
      html: `
        <h2 style='color:#1B3A5C'>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${mensaje}</p>
      `
    })
 
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 })
  }
}
