import { NextRequest, NextResponse } from 'next/server'
import { connectRedis, MarketingCacheKeys, MarketingCacheTTL } from '@/lib/redis'

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Missing slug parameter' },
        { status: 400 }
      )
    }

    // Connect to Redis
    const redis = await connectRedis()
    
    if (!redis) {
      // If Redis is not available, just return success without tracking
      return NextResponse.json({ 
        success: true, 
        views: 1, // Default view count
        slug,
        cached: false 
      })
    }
    
    try {
      // Increment view count for this post
      const viewKey = MarketingCacheKeys.postViews(slug)
      const newCount = await redis.incr(viewKey)
      await redis.expire(viewKey, MarketingCacheTTL.VIEW_COUNT)
      
      // Also track when it was last viewed
      const lastViewedKey = MarketingCacheKeys.postLastViewed(slug)
      await redis.set(lastViewedKey, new Date().toISOString(), {
        EX: MarketingCacheTTL.LAST_VIEWED
      })

      return NextResponse.json({ 
        success: true, 
        views: newCount,
        slug 
      })
    } catch (error) {
      console.error('Redis operation failed:', error)
      // Continue without caching if Redis fails
      return NextResponse.json({ 
        success: true, 
        views: 1,
        slug,
        cached: false 
      })
    }

  } catch (error) {
    console.error('Error tracking view:', error)
    return NextResponse.json(
      { error: 'Failed to track view' },
      { status: 500 }
    )
  }
}
