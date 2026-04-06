'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import BlogPostCard from './BlogPostCard'
import { BlogPost, client } from '@/lib/sanity'
import { Skeleton } from '@/components/ui/skeleton'

export default function IndustryNewsPreview() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      try {
        // Get only the latest 3 posts
        const postsResult = await client.fetch(`
          *[_type == "blogPost"] | order(publishedAt desc) [0...3] {
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
        `)

        setPosts(postsResult || [])
      } catch (error) {
        console.error('Error fetching preview posts:', error)
        setPosts([])
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-3 rounded-xl border border-gray-100 p-4">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="py-24 px-6 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
              Industry Insights
            </span>
            <h2 className="text-3xl font-light text-black mt-2">
              Stay ahead of <span className="font-medium">supplement trends</span>
            </h2>
            <p className="text-gray-600 mt-4 font-light max-w-2xl">
              Get the latest insights and analysis from the sports supplement industry to keep your brand competitive.
            </p>
          </div>
          <Link 
            href="/industry-news" 
            className="text-sm text-gray-600 hover:text-black transition-colors duration-200 flex items-center gap-2"
          >
            View all insights 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post._id} className="bg-white">
              <BlogPostCard post={post} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/industry-news"
            className="inline-flex items-center px-6 py-3 border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            Explore More Industry News
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
