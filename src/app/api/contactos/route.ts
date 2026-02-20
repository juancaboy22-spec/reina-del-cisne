import { NextResponse } from 'next/server'
import { ContactosRepository } from '@/repositories/contactos.repository'

export async function PATCH(request: Request) {
  try {
    const { id } = await request.json()
    const { error } = await ContactosRepository.marcarLeido(id)
    if (error) return NextResponse.json({ error }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
