import { MetadataRoute } from 'next'
import { getAllPosts, getAllHelpArticles } from '@/lib/sanity'
import { solutionPages } from '@/lib/solution-pages'

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
      url: `${siteUrl}/news`,
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
    {
      url: `${siteUrl}/pricing.md`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${siteUrl}/llms.txt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]

  // Product feature/solution pages are maintained from src/lib/solution-pages.ts so the sitemap updates automatically
  const solutionLandingPages: MetadataRoute.Sitemap = Object.values(solutionPages).map((solution) => ({
    url: `${siteUrl}/${solution.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Operational/pain-point pages (custom-built, not template-driven)
  const operationalPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/product-content-operations-for-supplement-brands`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/market-execution-for-supplement-brands`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/partner-content-operations-for-supplement-brands`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Blog posts from Sanity
  let postPages: MetadataRoute.Sitemap = []
  try {
    const posts = await getAllPosts()
    postPages = posts
      .filter((post) => !post.seo?.noIndex)
      .map((post) => ({
        url: post.seo?.canonicalUrl || `${siteUrl}/post/${post.slug.current}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
  } catch {
    // Sanity may not be available at build time in all envs
  }

  // Help articles from Sanity
  let helpPages: MetadataRoute.Sitemap = []
  try {
    const helpArticles = await getAllHelpArticles()
    helpPages = helpArticles.map((article) => ({
      url: `${siteUrl}/help/${article.slug.current}`,
      lastModified: article.updatedAt ? new Date(article.updatedAt) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }))
  } catch {
    // Sanity may not be available at build time in all envs
  }

  return [...staticPages, ...solutionLandingPages, ...operationalPages, ...postPages, ...helpPages]
}
