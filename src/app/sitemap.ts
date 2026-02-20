import { PropiedadesRepository } from '@/repositories/propiedades.repository'
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const propiedades = await PropiedadesRepository.listar()
 
  const propiedadesUrls = propiedades.map(p => ({
    url: `https://reinadelcisne.com/propiedades/${p.id}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8
  }))
 
  return [
    { url: 'https://reinadelcisne.com', lastModified: new Date(), priority: 1.0 },
    { url: 'https://reinadelcisne.com/propiedades', lastModified: new Date(), priority: 0.9 },
    { url: 'https://reinadelcisne.com/contacto', lastModified: new Date(), priority: 0.7 },
    ...propiedadesUrls
  ]
}
