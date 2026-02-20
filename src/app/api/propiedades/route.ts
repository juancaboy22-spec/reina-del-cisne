import { NextResponse } from 'next/server'
import { PropiedadesRepository } from '@/repositories/propiedades.repository'
 
export async function POST(request: Request) {
  try {
    const datos = await request.json()
    const { data, error } = await PropiedadesRepository.crear(datos)
    if (error) return NextResponse.json({ error }, { status: 400 })
    return NextResponse.json({ data })
  } catch (e) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
 
export async function PUT(request: Request) {
  try {
    const { id, ...datos } = await request.json()
    const { error } = await PropiedadesRepository.actualizar(id, datos)
    if (error) return NextResponse.json({ error }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
 
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const { error } = await PropiedadesRepository.eliminar(id)
    if (error) return NextResponse.json({ error }, { status: 400 })
    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
