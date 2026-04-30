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
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      coverImage,
      author->{
        name,
        image
      },
      publishedAt,
      tags,
      estimatedReadingTime
    }
  `)
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return getClient().fetch(`
    *[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
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
        image,
        bio
      },
      publishedAt,
      tags,
      estimatedReadingTime
    }
  `, { slug })
}

export async function getRecentPosts(limit: number = 5): Promise<BlogPost[]> {
  return getClient().fetch(`
    *[_type == "blogPost"] | order(publishedAt desc)[0...${limit}] {
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
      estimatedReadingTime
    }
  `)
}

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: PortableTextBlock[]
  coverImage: {
    asset: {
      _id: string
      url: string
    }
    alt?: string
  }
  author: {
    name: string
  }
  publishedAt: string
  tags: string[]
  estimatedReadingTime: number
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