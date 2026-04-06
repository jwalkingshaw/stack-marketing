import { NextRequest, NextResponse } from 'next/server'
import { connectRedis, withPrefix } from '@/lib/redis'

const EVENT_TTL_SECONDS = 90 * 24 * 60 * 60

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json()
    const event = String(payload?.event || '').trim()

    if (!event) {
      return NextResponse.json({ error: 'Missing event' }, { status: 400 })
    }

    const page = String(payload?.page || 'unknown').trim() || 'unknown'
    const today = new Date().toISOString().slice(0, 10)

    const redis = await connectRedis()
    if (!redis) {
      return NextResponse.json({ success: true, cached: false })
    }

    try {
      const keys = [
        withPrefix(`events:all:${today}`),
        withPrefix(`events:${event}:${today}`),
        withPrefix(`events:${event}:${page}:${today}`),
      ]

      for (const key of keys) {
        await redis.incr(key)
        await redis.expire(key, EVENT_TTL_SECONDS)
      }

      const recentEventsKey = withPrefix(`events:recent:${today}`)
      await redis.lPush(recentEventsKey, JSON.stringify(payload))
      await redis.lTrim(recentEventsKey, 0, 499)
      await redis.expire(recentEventsKey, EVENT_TTL_SECONDS)

      return NextResponse.json({ success: true, cached: true })
    } catch (error) {
      console.error('Failed to persist marketing event:', error)
      return NextResponse.json({ success: true, cached: false })
    }
  } catch (error) {
    console.error('Failed to parse marketing event payload:', error)
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}
