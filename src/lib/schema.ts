import { BlogPost } from './sanity'

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
}

export interface NewsArticleSchema {
  '@context': 'https://schema.org'
  '@type': 'NewsArticle'
  headline: string
  description: string
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
  sameAs: [
    'https://x.com/stackcessapp'
  ]
})

export const generatePersonSchema = (author: BlogPost['author']): PersonSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: author.name,
})

export const generateNewsArticleSchema = (
  post: BlogPost,
  fullUrl: string,
  imageUrl: string
): NewsArticleSchema => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: post.title,
  description: post.excerpt,
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

export const generateWebSiteSchema = (): WebSiteSchema => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Stackcess',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com',
  description: 'The operating system for supplement brands and partners to manage products, assets, localization, and collaboration.',
  publisher: generateOrganizationSchema(),
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'}/industry-news?query={search_term_string}`
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
    'The operating system for sports supplement brands, distributors, and retailers. Manage product content, digital assets, regulatory documents, partner sharing, and localisation in one platform.',
  offers: [
    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD', description: '10 SKUs, 2 GB storage, 1 user, 2 partner invites.' },
    { '@type': 'Offer', name: 'Starter', price: '49', priceCurrency: 'USD', description: '50 SKUs, 15 GB storage, 2 internal users.' },
    { '@type': 'Offer', name: 'Growth', price: '129', priceCurrency: 'USD', description: '250 SKUs, 100 GB storage, 8 internal users.' },
    { '@type': 'Offer', name: 'Scale', price: '299', priceCurrency: 'USD', description: '2,500 SKUs, 500 GB storage, unlimited users.' },
  ],
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
