import { NextRequest, NextResponse } from 'next/server'
import { client, type BlogPost } from '@/lib/sanity'

const POSTS_PER_PAGE = 6

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const offset = (page - 1) * POSTS_PER_PAGE

  try {
    const [posts, total] = await Promise.all([
      client.fetch<BlogPost[]>(`
        *[_type == "blogPost"] | order(publishedAt desc) [${offset}...${offset + POSTS_PER_PAGE}] {
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
          author->{
            name,
            image
          },
          publishedAt,
          tags,
          estimatedReadingTime
        }
      `),
      client.fetch<number>(`count(*[_type == "blogPost"])`),
    ])

    return NextResponse.json({ posts, total })
  } catch (error) {
    console.error('Error fetching news feed:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
