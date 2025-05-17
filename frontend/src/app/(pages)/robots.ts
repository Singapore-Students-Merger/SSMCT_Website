import type { MetadataRoute } from 'next'
const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL!
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/create','/api'],
    },
    sitemap: [`${WEBSITE_URL}/sitemap.xml`,
        `${WEBSITE_URL}/blogs/sitemap.xml`,
        `${WEBSITE_URL}/writeups/sitemap.xml`],
  }
}