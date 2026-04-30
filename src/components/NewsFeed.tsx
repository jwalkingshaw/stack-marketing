'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import BlogPostCard from './BlogPostCard'
import { BlogPost, client } from '@/lib/sanity'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

const POSTS_PER_PAGE = 6

export default function NewsFeed() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [totalPosts, setTotalPosts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const router = useRouter()
  const searchParams = useSearchParams()


  const fetchPosts = useCallback(async (page: number) => {
    setLoading(true)

    try {
      const offset = (page - 1) * POSTS_PER_PAGE
      
      // Get total count and posts in parallel
      const [postsResult, countResult] = (await Promise.all([
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
        client.fetch(`count(*[_type == "blogPost"])`)
      ])) as [BlogPost[], number]

      setPosts(postsResult || [])
      setTotalPosts(countResult || 0)
    } catch (error) {
      console.error('Error fetching posts:', error)
      // Show user-friendly error message
      console.error('Failed to connect to Sanity. Please check your Sanity configuration.')
      setPosts([])
      setTotalPosts(0)
    } finally {
      setLoading(false)
    }
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`?${params.toString()}`, { scroll: false })
    fetchPosts(page)
  }

  useEffect(() => {
    const pageParam = searchParams.get('page')
    const initialPage = pageParam ? parseInt(pageParam) : 1
    setCurrentPage(initialPage)
    fetchPosts(initialPage)
  }, [searchParams, fetchPosts])

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-6 py-8">
          <Skeleton className="h-8 w-48" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-3 rounded-xl border border-border/60 p-4">
              <Skeleton className="h-44 w-full rounded-lg" />
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pb-16">
      {/* Enhanced section header */}
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Latest Articles
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Stay updated with the latest insights in technology, innovation, and industry trends.
        </p>
      </div>
      
      {/* Enhanced grid layout */}
      <div className="grid gap-8 md:gap-10">
        {posts.map((post) => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </div>

      {/* Enhanced pagination */}
      {totalPages > 1 && (
        <div className="mt-16 border-t border-gray-100 pt-12">
          <Pagination>
            <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage > 1) handlePageChange(currentPage - 1)
                  }}
                  className={`${
                    currentPage <= 1 
                      ? 'pointer-events-none opacity-40' 
                      : 'hover:bg-gray-50 hover:text-gray-900'
                  } transition-all duration-200`}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(page)
                    }}
                    isActive={currentPage === page}
                    className="transition-all duration-200 hover:bg-gray-50"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (currentPage < totalPages) handlePageChange(currentPage + 1)
                  }}
                  className={`${
                    currentPage >= totalPages 
                      ? 'pointer-events-none opacity-40' 
                      : 'hover:bg-gray-50 hover:text-gray-900'
                  } transition-all duration-200`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
