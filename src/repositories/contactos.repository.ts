import { createClient } from '@/lib/supabase/server'
import { Contacto } from '@/types'
 
export interface NuevoContacto {
  nombre: string
  email: string
  telefono?: string
  mensaje: string
  propiedad_id?: string
}
 
export const ContactosRepository = {
 
  async crear(datos: NuevoContacto): Promise<{ error: string | null }> {
    const supabase = await createClient()
    const { error } = await supabase
      .from('contactos')
      .insert(datos)
 
    return { error: error?.message || null }
  },
 
  async listar(): Promise<Contacto[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('contactos')
      .select('*')
      .order('created_at', { ascending: false })
 
    if (error) { console.error('ContactosRepository.listar:', error); return [] }
    return data || []
  },
 
  async contarNoLeidos(): Promise<number> {
    const supabase = await createClient()
    const { count } = await supabase
      .from('contactos')
      .select('*', { count: 'exact', head: true })
      .eq('leido', false)
    return count || 0
  },
 
  async marcarLeido(id: string): Promise<{ error: string | null }> {
    const supabase = await createClient()
    const { error } = await supabase
      .from('contactos')
      .update({ leido: true })
      .eq('id', id)
 
    return { error: error?.message || null }
  },
}
