import type { Metadata } from 'next'
import './globals.css'
 
export const metadata: Metadata = {
  title: { template: '%s | Reina del Cisne', default: 'Inmobiliaria Reina del Cisne - Loja, Ecuador' },
  description: 'Encuentra tu propiedad ideal en Loja. Lotes y casas con los mejores precios.',
  keywords: ['inmobiliaria', 'loja', 'lotes', 'casas', 'reina del cisne', 'bienes raices ecuador'],
  openGraph: {
    type: 'website',
    locale: 'es_EC',
    url: 'https://reinadelcisne.com',
    siteName: 'Inmobiliaria Reina del Cisne',
  },
}
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es'>
      <body>{children}</body>
    </html>
  )
}
