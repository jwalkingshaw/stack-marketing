import { NextRequest, NextResponse } from 'next/server'
import { getPostsPage } from '@/lib/sanity'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))

  try {
    const { posts, total } = await getPostsPage(page)

    return NextResponse.json({ posts, total })
  } catch (error) {
    console.error('Error fetching news feed:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
