import { NextResponse } from 'next/server'
import { client, type BlogPost } from '@/lib/sanity'
import {
  cache,
  connectRedis,
  MarketingCacheKeys,
  MarketingCacheTTL,
} from '@/lib/redis'

type PopularArticlesResponse = {
  articles: Array<BlogPost & { views: number }>
  lastUpdated: string
  fallback: boolean
}

export async function GET() {
  try {
    const responseCacheKey = MarketingCacheKeys.popularArticlesResponse()
    const cached = await cache.get<PopularArticlesResponse>(responseCacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Get all blog posts from Sanity first
    const allPostsQuery = `
      *[_type == "blogPost"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        coverImage {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    `
    
    const allPosts = await client.fetch<BlogPost[]>(allPostsQuery)
    
    // Connect to Redis and get view counts for each post
    const redis = await connectRedis()
    let viewValues: Array<string | null> = []
    if (redis) {
      try {
        const viewKeys = allPosts.map((post: BlogPost) =>
          MarketingCacheKeys.postViews(post.slug.current)
        )
        if (viewKeys.length > 0) {
          viewValues = await redis.mGet(viewKeys)
        }
      } catch (error) {
        console.error('Failed to batch read view counts:', error)
      }
    }

    const postsWithViews: Array<BlogPost & { views: number }> = allPosts.map((post, index) => ({
      ...post,
      views: Number(viewValues[index] || 0),
    }))
    
    // Sort by view count and get top 5, then fall back to recent posts
    const topPosts = postsWithViews
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)

    // Determine if we're showing actual popular content or just recent content
    const hasViewData = topPosts.some(post => post.views > 0)

    const payload: PopularArticlesResponse = {
      articles: topPosts,
      lastUpdated: new Date().toISOString(),
      fallback: !hasViewData
    }
    await cache.set(responseCacheKey, payload, MarketingCacheTTL.POPULAR_ARTICLES)
    return NextResponse.json(payload)

  } catch (error) {
    console.error('Error fetching popular articles:', error)
    
    // Fallback: return recent posts if Redis/Sanity fail
    try {
      const fallbackQuery = `
        *[_type == "blogPost"] | order(publishedAt desc) [0...5] {
          _id,
          title,
          slug,
          publishedAt,
          coverImage {
            asset->{
              _id,
              url
            },
            alt
          }
        }
      `
      
      const fallbackPosts = await client.fetch<BlogPost[]>(fallbackQuery)
      
      const fallbackPayload: PopularArticlesResponse = {
        articles: fallbackPosts.map((post: BlogPost) => ({ ...post, views: 0 })),
        lastUpdated: new Date().toISOString(),
        fallback: true
      }
      await cache.set(
        MarketingCacheKeys.popularArticlesResponse(),
        fallbackPayload,
        MarketingCacheTTL.POPULAR_ARTICLES
      )
      return NextResponse.json(fallbackPayload)
    } catch {
      return NextResponse.json(
        { error: 'Failed to fetch popular articles' },
        { status: 500 }
      )
    }
  }
}
