export type TipoPropiedad = 'lote' | 'casa'
 
export interface Imagen {
  publicId: string
  url: string
  alt?: string
}
 
export interface Propiedad {
  id: string
  codigo?: number
  titulo: string
  descripcion?: string
  tipo: TipoPropiedad
  precio: number
  area?: number
  ubicacion: string
  ciudad: string
  sector?: string
  dormitorios?: number
  banos?: number
  caracteristicas?: string[]
  imagenes: Imagen[]
  imagen_principal?: string
  disponible: boolean
  destacado: boolean
  created_at: string
  updated_at: string
}
 
export interface Contacto {
  id: string
  nombre: string
  email: string
  telefono?: string
  mensaje: string
  propiedad_id?: string
  leido: boolean
  created_at: string
}
 
export interface FiltrosPropiedades {
  tipo?: TipoPropiedad
  precioMin?: number
  precioMax?: number
  ciudad?: string
  disponible?: boolean
}
