import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/sanity'
import { helpArticles } from '@/lib/help-center'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/industry-news`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/help`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/roadmap`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]

  // Blog posts from Sanity
  let postPages: MetadataRoute.Sitemap = []
  try {
    const posts = await getAllPosts()
    postPages = posts.map((post) => ({
      url: `${siteUrl}/post/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  } catch {
    // Sanity may not be available at build time in all envs
  }

  // Help articles (static data)
  const helpPages: MetadataRoute.Sitemap = helpArticles.map((article) => ({
    url: `${siteUrl}/help/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...postPages, ...helpPages]
}
