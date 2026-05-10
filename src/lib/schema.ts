import { BlogPost } from './sanity'
import { BILLING_PLAN_CATALOG } from './billing-catalog'

export interface OrganizationSchema {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo: {
    '@type': 'ImageObject'
    url: string
  }
  sameAs: string[]
}

export interface PersonSchema {
  '@context': 'https://schema.org'
  '@type': 'Person'
  name: string
  image?: string
  url?: string
  description?: string
  sameAs?: string[]
  worksFor?: {
    '@type': 'Organization'
    name: string
    url: string
  }
}

export interface FAQPageSchema {
  '@context': 'https://schema.org'
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }>
}

export interface NewsArticleSchema {
  '@context': 'https://schema.org'
  '@type': 'BlogPosting'
  headline: string
  description: string
  abstract?: string
  image: {
    '@type': 'ImageObject'
    url: string
    alt: string
  }
  author: PersonSchema
  publisher: OrganizationSchema
  datePublished: string
  dateModified?: string
  mainEntityOfPage: {
    '@type': 'WebPage'
    '@id': string
  }
  articleSection: string[]
  keywords: string[]
  wordCount?: number
  timeRequired?: string
}

export interface ItemListSchema {
  '@context': 'https://schema.org'
  '@type': 'ItemList'
  name: string
  description?: string
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    url: string
    name: string
  }>
}

export interface WebSiteSchema {
  '@context': 'https://schema.org'
  '@type': 'WebSite'
  name: string
  url: string
  description: string
  publisher: OrganizationSchema
  potentialAction: {
    '@type': 'SearchAction'
    target: {
      '@type': 'EntryPoint'
      urlTemplate: string
    }
    'query-input': string
  }
}

export interface BreadcrumbListSchema {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }>
}

export const generateOrganizationSchema = (): OrganizationSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Stackcess',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com',
  logo: {
    '@type': 'ImageObject',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'}/stackcess-full-logo.svg`
  },
  sameAs: ['https://x.com/stackcessapp']
})

function portableTextToPlainText(
  blocks: Array<{ _type: string; children?: Array<{ _type: string; text?: string }> }>
): string {
  return blocks
    .filter((b) => b._type === 'block')
    .map((b) => (b.children || []).map((c) => c.text || '').join(''))
    .filter(Boolean)
    .join(' ')
}

export const generatePersonSchema = (author: BlogPost['author']): PersonSchema => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'
  const sameAs: string[] = []
  if (author.socialLinks?.twitter) sameAs.push(author.socialLinks.twitter)
  if (author.socialLinks?.linkedin) sameAs.push(author.socialLinks.linkedin)
  if (author.socialLinks?.website) sameAs.push(author.socialLinks.website)

  const bioText = author.bio ? portableTextToPlainText(
    author.bio as Array<{ _type: string; children?: Array<{ _type: string; text?: string }> }>
  ) : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    worksFor: { '@type': 'Organization', name: 'Stackcess', url: siteUrl },
    url: author.socialLinks?.website || siteUrl,
    ...(author.image?.asset?.url ? { image: author.image.asset.url } : {}),
    ...(bioText ? { description: bioText } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
}

export const generateFAQPageSchema = (
  faqItems: Array<{ question: string; answer: string }>
): FAQPageSchema => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
})

export const generateNewsArticleSchema = (
  post: BlogPost,
  fullUrl: string,
  imageUrl: string,
  description?: string,
  abstract?: string
): NewsArticleSchema => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: description || post.excerpt,
  ...(abstract ? { abstract } : {}),
  image: {
    '@type': 'ImageObject',
    url: imageUrl,
    alt: post.coverImage?.alt || post.title
  },
  author: generatePersonSchema(post.author),
  publisher: generateOrganizationSchema(),
  datePublished: post.publishedAt,
  dateModified: post.publishedAt,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': fullUrl
  },
  articleSection: post.tags,
  keywords: post.tags,
  timeRequired: `PT${post.estimatedReadingTime}M`
})

export const generateItemListSchema = (
  name: string,
  items: Array<{ name: string; url: string }>,
  description?: string
): ItemListSchema => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name,
  ...(description ? { description } : {}),
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    url: item.url
  }))
})

export const generateWebSiteSchema = (): WebSiteSchema => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Stackcess',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com',
  description: 'Product content system for supplement brands and partners. Manage structured products, assets, localization, and portal delivery from one workspace.',
  publisher: generateOrganizationSchema(),
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'}/news?query={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
})

export const generateSoftwareApplicationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Stackcess',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com',
  description:
    'Unified PIM, DAM, AI localization, and partner portal syndication for supplement brands, distributors, and retail partners.',
  offers: BILLING_PLAN_CATALOG.filter((plan) => plan.id !== 'enterprise').map((plan) => ({
    '@type': 'Offer',
    name: plan.name,
    price: String(plan.price),
    priceCurrency: plan.currency,
    description: `${plan.activeSkuLimit.toLocaleString()} SKUs, ${plan.storageLimitGb} GB storage, ${
      plan.internalUserLimit >= 2_147_483_647 ? 'unlimited' : plan.internalUserLimit
    } internal users.`,
  })),
  publisher: {
    '@type': 'Organization',
    name: 'Stackcess',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com',
  },
})

export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>): BreadcrumbListSchema => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
})
