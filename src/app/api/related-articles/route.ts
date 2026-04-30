import { NextRequest, NextResponse } from 'next/server'
import { client, type BlogPost } from '@/lib/sanity'
import {
  cache,
  connectRedis,
  MarketingCacheKeys,
  MarketingCacheTTL,
} from '@/lib/redis'

type RelatedArticle = BlogPost & { views: number; tagMatchCount: number }
type RelatedArticlesResponse = {
  articles: Array<BlogPost & { views: number }>
  lastUpdated: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const currentSlug = searchParams.get('slug')
    const tagsParam = searchParams.get('tags')
    
    if (!currentSlug || !tagsParam) {
      return NextResponse.json(
        { error: 'Missing required parameters: slug and tags' },
        { status: 400 }
      )
    }

    const tags = tagsParam.split(',').filter(Boolean)
    const cleanTags = [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))]
    const normalizedTags = [...cleanTags].map((tag) => tag.toLowerCase()).sort()
    
    if (cleanTags.length === 0) {
      return NextResponse.json({
        articles: [],
        lastUpdated: new Date().toISOString()
      })
    }

    const tagsKey = normalizedTags.join('|')
    const responseCacheKey = MarketingCacheKeys.relatedArticlesResponse(currentSlug, tagsKey)
    const cached = await cache.get<RelatedArticlesResponse>(responseCacheKey)
    if (cached) {
      return NextResponse.json(cached)
    }

    // Get articles with matching tags, excluding the current article
    const relatedPostsQuery = `
      *[_type == "blogPost" && slug.current != $currentSlug && count((tags[])[@ in $tags]) > 0] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        tags,
        coverImage {
          asset->{
            _id,
            url
          },
          alt
        }
      }
    `
    
    const relatedPosts = await client.fetch<BlogPost[]>(relatedPostsQuery, {
      currentSlug, 
      tags: cleanTags,
    })
    
    // Connect to Redis and get view counts for each post
    const redis = await connectRedis()
    let viewValues: Array<string | null> = []
    if (redis) {
      try {
        const viewKeys = relatedPosts.map((post: BlogPost) =>
          MarketingCacheKeys.postViews(post.slug.current)
        )
        if (viewKeys.length > 0) {
          viewValues = await redis.mGet(viewKeys)
        }
      } catch (error) {
        console.error('Failed to batch read related article views:', error)
      }
    }

    const postsWithViews: RelatedArticle[] = relatedPosts.map((post: BlogPost, index: number) => {
      const matchingTags =
        post.tags?.filter((tag: string) => normalizedTags.includes(String(tag).trim().toLowerCase())) || []

      return {
        ...post,
        views: Number(viewValues[index] || 0),
        tagMatchCount: matchingTags.length
      }
    })
    
    // Sort by number of matching tags first, then by views, then by publish date
    const sortedPosts = postsWithViews
      .sort((a, b) => {
        // First priority: more matching tags
        if (b.tagMatchCount !== a.tagMatchCount) {
          return b.tagMatchCount - a.tagMatchCount
        }
        
        // Second priority: more views
        if (b.views !== a.views) {
          return b.views - a.views
        }
        
        // Third priority: more recent
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      })
      .slice(0, 5) // Get top 5
    
    // Remove the tagMatchCount field before returning
    const articles = sortedPosts.map((post) => {
      const article = { ...post } as BlogPost & { views: number; tagMatchCount?: number }
      delete article.tagMatchCount
      return article
    })

    const payload: RelatedArticlesResponse = {
      articles,
      lastUpdated: new Date().toISOString()
    }
    await cache.set(responseCacheKey, payload, MarketingCacheTTL.RELATED_ARTICLES)
    return NextResponse.json(payload)

  } catch (error) {
    console.error('Error fetching related articles:', error)
    
    // Fallback: return empty array if something fails
    return NextResponse.json({
      articles: [],
      lastUpdated: new Date().toISOString()
    })
  }
}
