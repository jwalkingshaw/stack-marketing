import { createClient } from 'redis'

// Create Redis client with fallback handling
const redis = process.env.REDIS_URL ? createClient({
  url: process.env.REDIS_URL,
  socket: {
    connectTimeout: 5000,
  }
}) : null

// Handle connection errors gracefully
if (redis) {
  redis.on('error', (err) => {
    console.error('Redis Client Error:', err)
    // Don't crash the process, just log the error
  })
}

// Connect to Redis with fallback
let isConnected = false
let hasWarnedNoRedisConfig = false

export const REDIS_KEY_PREFIX_MARKETING = process.env.REDIS_KEY_PREFIX_MARKETING || 'marketing'

function withPrefix(key: string): string {
  return `${REDIS_KEY_PREFIX_MARKETING}:${key}`
}

class CacheService {
  private inMemoryCache = new Map<string, { value: unknown; expires: number }>()

  async get<T>(key: string): Promise<T | null> {
    const namespacedKey = withPrefix(key)

    try {
      const client = await connectRedis()
      if (client) {
        const value = await client.get(namespacedKey)
        return value ? (JSON.parse(value) as T) : null
      }
    } catch (error) {
      console.warn('Redis get failed, checking in-memory fallback:', error)
    }

    const cached = this.inMemoryCache.get(namespacedKey)
    if (cached && cached.expires > Date.now()) {
      return cached.value as T
    }

    if (cached && cached.expires <= Date.now()) {
      this.inMemoryCache.delete(namespacedKey)
    }

    return null
  }

  async set(key: string, value: unknown, ttlSeconds: number): Promise<void> {
    const namespacedKey = withPrefix(key)

    try {
      const client = await connectRedis()
      if (client) {
        await client.setEx(namespacedKey, ttlSeconds, JSON.stringify(value))
        return
      }
    } catch (error) {
      console.warn('Redis set failed, using in-memory fallback:', error)
    }

    this.inMemoryCache.set(namespacedKey, {
      value,
      expires: Date.now() + (ttlSeconds * 1000),
    })
  }

  async del(key: string): Promise<void> {
    const namespacedKey = withPrefix(key)

    try {
      const client = await connectRedis()
      if (client) {
        await client.del(namespacedKey)
      }
    } catch (error) {
      console.warn('Redis delete failed:', error)
    }

    this.inMemoryCache.delete(namespacedKey)
  }

  cleanup() {
    const now = Date.now()
    for (const [key, cached] of this.inMemoryCache.entries()) {
      if (cached.expires <= now) {
        this.inMemoryCache.delete(key)
      }
    }
  }
}

const connectRedis = async () => {
  if (!redis) {
    if (!hasWarnedNoRedisConfig) {
      console.warn('Redis not configured, using in-memory fallback')
      hasWarnedNoRedisConfig = true
    }
    return null
  }
  
  if (!isConnected && !redis.isOpen) {
    try {
      await redis.connect()
      isConnected = true
      console.log('Connected to Redis Cloud')
    } catch (error) {
      console.error('Failed to connect to Redis, continuing without cache:', error)
      return null
    }
  }
  return redis
}

export const cache = new CacheService()

export const MarketingCacheKeys = {
  postViews: (slug: string) => withPrefix(`views:${slug}`),
  postLastViewed: (slug: string) => withPrefix(`last_viewed:${slug}`),
  popularArticlesResponse: () => 'api:popular-articles:v1',
  relatedArticlesResponse: (slug: string, tagsKey: string) => `api:related-articles:v1:${slug}:${tagsKey}`,
}

export const MarketingCacheTTL = {
  POPULAR_ARTICLES: 90,         // 1.5 minutes
  RELATED_ARTICLES: 120,        // 2 minutes
  LAST_VIEWED: 90 * 24 * 60 * 60, // 90 days
  VIEW_COUNT: 365 * 24 * 60 * 60, // 1 year
}

if (typeof window === 'undefined') {
  setInterval(() => {
    cache.cleanup()
  }, 5 * 60 * 1000)
}

export { redis, connectRedis, withPrefix }
