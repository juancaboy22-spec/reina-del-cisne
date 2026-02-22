import { PropiedadesRepository } from '@/repositories/propiedades.repository'
import { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://reina-del-cisne.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const propiedades = await PropiedadesRepository.listar()

  const propiedadesUrls = propiedades.map(p => ({
    url: `${BASE_URL}/propiedades/${p.id}`,
    lastModified: new Date(p.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/propiedades`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    ...propiedadesUrls,
  ]
}
