import BlogPostCard from './BlogPostCard'
import { BlogPost } from '@/lib/sanity'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface NewsFeedProps {
  posts: BlogPost[]
  totalPosts: number
  currentPage: number
}

function getNewsPageHref(page: number) {
  return page <= 1 ? '/news' : `/news?page=${page}`
}

export default function NewsFeed({ posts, totalPosts, currentPage }: NewsFeedProps) {
  const totalPages = Math.ceil(totalPosts / 6)

  return (
    <div className="max-w-4xl mx-auto px-6 pb-16">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          Latest Articles
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Reporting, analysis, and commentary on supplement brands, retailers, distributors, and compliance shifts.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-8 md:gap-10">
          {posts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-600">No articles found for this page.</p>
      )}

      {totalPages > 1 && (
        <div className="mt-16 border-t border-gray-100 pt-12">
          <Pagination>
            <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationPrevious
                  href={getNewsPageHref(currentPage - 1)}
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
                    href={getNewsPageHref(page)}
                    isActive={currentPage === page}
                    className="transition-all duration-200 hover:bg-gray-50"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href={getNewsPageHref(currentPage + 1)}
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
