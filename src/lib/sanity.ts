import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { PortableTextBlock } from '@portabletext/types'
import type { QueryParams } from '@sanity/client'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET

function getSanityConfig() {
  if (!sanityProjectId || !sanityDataset) {
    throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET')
  }

  return {
    projectId: sanityProjectId,
    dataset: sanityDataset,
    useCdn: true,
    apiVersion: '2024-01-01',
  }
}

let sanityClientInstance: ReturnType<typeof createClient> | undefined
function getClient() {
  if (!sanityClientInstance) {
    sanityClientInstance = createClient(getSanityConfig())
  }
  return sanityClientInstance
}

export const client = {
  fetch: async <Result = unknown>(query: string, params?: QueryParams) =>
    params ? getClient().fetch<Result>(query, params) : getClient().fetch<Result>(query),
}

export const urlFor = (source: SanityImageSource) =>
  imageUrlBuilder(getClient()).image(source)

export async function getAllPosts(): Promise<BlogPost[]> {
  return getClient().fetch(`
    *[_type == "blogPost" && publishedAt <= now()] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      seo,
      coverImage,
      author->{
        name,
        image
      },
      publishedAt,
      tags,
      contentRole,
      pillarKey,
      estimatedReadingTime
    }
  `)
}

export async function getPostsPage(page: number, limit: number = 6): Promise<{ posts: BlogPost[]; total: number }> {
  const safePage = Math.max(1, page)
  const offset = (safePage - 1) * limit

  const [posts, total] = await Promise.all([
    getClient().fetch<BlogPost[]>(`
      *[_type == "blogPost" && publishedAt <= now()] | order(publishedAt desc) [${offset}...${offset + limit}] {
        _id,
        title,
        slug,
        excerpt,
        seo,
        coverImage {
          asset->{
            _id,
            url
          },
          alt
        },
        author->{
          name,
          image
        },
        publishedAt,
        tags,
        contentRole,
        pillarKey,
        estimatedReadingTime
      }
    `),
    getClient().fetch<number>(`count(*[_type == "blogPost" && publishedAt <= now()])`),
  ])

  return { posts, total }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return getClient().fetch(`
    *[_type == "blogPost" && slug.current == $slug && publishedAt <= now()][0] {
      _id,
      _updatedAt,
      title,
      slug,
      excerpt,
      seo,
      content,
      coverImage {
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        slug,
        image {
          asset->{ _id, url }
        },
        bio,
        socialLinks
      },
      publishedAt,
      tags,
      contentRole,
      pillarKey,
      estimatedReadingTime,
      aiSummaryBlock,
      faqItems
    }
  `, { slug })
}

export async function getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
  return getClient().fetch(`
    *[_type == "blogPost" && publishedAt <= now()] | order(publishedAt desc)[0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      author->{
        name
      },
      publishedAt,
      tags,
      contentRole,
      pillarKey,
      estimatedReadingTime
    }
  `)
}

export interface BlogPostPreview {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  coverImage?: {
    asset?: {
      _id: string
      url: string
    }
    alt?: string
  }
  publishedAt: string
  tags: string[]
  contentRole?: 'news' | 'spoke' | 'editorial'
  pillarKey?: string
  estimatedReadingTime?: number
}

export async function getPostsByAnyTags(tags: string[], limit: number = 6): Promise<BlogPostPreview[]> {
  const normalizedTags = [...new Set(tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean))]

  if (normalizedTags.length === 0) {
    return []
  }

  return getClient().fetch(
    `
      *[_type == "blogPost" && publishedAt <= now() && count((tags[])[lower(@) in $tags]) > 0] | order(publishedAt desc)[0...$limit] {
        _id,
        title,
        slug,
        excerpt,
        coverImage {
          asset->{
            _id,
            url
          },
          alt
        },
        publishedAt,
        tags,
        contentRole,
        pillarKey,
        estimatedReadingTime
      }
    `,
    { tags: normalizedTags, limit }
  )
}

export async function getRecentPostPreviews(limit: number = 6): Promise<BlogPostPreview[]> {
  return getClient().fetch(
    `
      *[_type == "blogPost" && publishedAt <= now()] | order(publishedAt desc)[0...$limit] {
        _id,
        title,
        slug,
        excerpt,
        coverImage {
          asset->{
            _id,
            url
          },
          alt
        },
        publishedAt,
        tags,
        contentRole,
        pillarKey,
        estimatedReadingTime
      }
    `,
    { limit }
  )
}

export interface BlogPost {
  _id: string
  _updatedAt?: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  seo?: {
    title?: string
    description?: string
    canonicalUrl?: string
    noIndex?: boolean
    aiSummary?: string
  }
  content: PortableTextBlock[]
  coverImage?: {
    asset?: {
      _id: string
      url: string
    }
    alt?: string
  }
  author: {
    name: string
    slug?: { current: string }
    image?: { asset: { _id: string; url: string } }
    bio?: PortableTextBlock[]
    socialLinks?: {
      twitter?: string
      linkedin?: string
      website?: string
    }
  }
  publishedAt: string
  tags: string[]
  contentRole?: 'news' | 'spoke' | 'editorial'
  pillarKey?: string
  estimatedReadingTime: number
  aiSummaryBlock?: {
    keyTakeaways?: string[]
  }
  faqItems?: Array<{
    _key: string
    question: string
    answer: string
  }>
}

export interface Banner {
  _id: string
  campaignName: string
  placement: 'top' | 'sidebar'
  desktopImage: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  mobileImage?: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  altText: string
  clickThroughUrl: string
  targetBlank: boolean
  startDate: string
  endDate: string
  isActive: boolean
  priority: number
  clickTracking: boolean
  notes?: string
}

export async function getActiveBanners(placement?: 'top' | 'sidebar'): Promise<Banner[]> {
  try {
    const now = new Date().toISOString()
    const placementFilter = placement ? ` && placement == "${placement}"` : ''
    
    return await getClient().fetch(`
      *[_type == "banner" 
        && isActive == true 
        && startDate <= "${now}" 
        && endDate >= "${now}"
        ${placementFilter}
      ] | order(priority desc) {
        _id,
        campaignName,
        placement,
        desktopImage {
          asset->{
            _id,
            url
          },
          alt
        },
        mobileImage {
          asset->{
            _id,
            url
          },
          alt
        },
        altText,
        clickThroughUrl,
        targetBlank,
        startDate,
        endDate,
        isActive,
        priority,
        clickTracking,
        notes
      }
    `)
  } catch (error) {
    console.error('Error fetching banners:', error)
    return [] // Return empty array if there's an error
  }
}

export async function getBannerByPlacement(placement: 'top' | 'sidebar'): Promise<Banner | null> {
  const banners = await getActiveBanners(placement)
  return banners.length > 0 ? banners[0] : null
}

export async function trackBannerClick(bannerId: string) {
  // This could be extended to store click analytics in Sanity or external service
  console.log(`Banner clicked: ${bannerId}`)
  // Future: Add analytics tracking here
}
