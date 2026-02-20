import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
 
export function formatearPrecio(precio: number): string {
  return new Intl.NumberFormat('es-EC', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(precio)
}
 
export function formatearArea(area: number): string {
  return `${area.toLocaleString('es-EC')} m²`
}
