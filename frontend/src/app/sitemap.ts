import type { MetadataRoute } from 'next'
const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL! 
if (!WEBSITE_URL) {
  throw new Error('Please define NEXT_PUBLIC_WEBSITE_URL in your .env file')
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: WEBSITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${WEBSITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${WEBSITE_URL}/writeups`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${WEBSITE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${WEBSITE_URL}/members`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}