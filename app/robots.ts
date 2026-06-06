import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/dashboard/', '/financeiro/', '/servicos/', '/agenda/', '/galeria-admin/'],
      },
    ],
    sitemap: 'https://danydiniz.com.br/sitemap.xml',
  }
}
