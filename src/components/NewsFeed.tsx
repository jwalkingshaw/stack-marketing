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
    <div className="px-4 pb-16 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1120px]">
        <div className="border-b border-[var(--border-subtle)] pb-8">
          <p className="marketing-kicker">News</p>
          <h1 className="mt-6 pb-4 text-[2.4rem] font-semibold tracking-[-0.03em] text-[var(--color-foreground)] !leading-[1.02] sm:text-[3.2rem]">
            Latest articles
          </h1>
          <p className="max-w-2xl text-[1rem] leading-8 text-[var(--text-secondary)]">
            Reporting, analysis, and commentary on supplement brands, retailers, distributors, and compliance shifts.
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="mt-10 grid gap-6">
            {posts.map((post) => (
              <BlogPostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[1.5rem] border border-[var(--border-subtle)] bg-white px-6 py-10 text-sm text-[var(--text-secondary)] shadow-[var(--shadow-soft)]">
            No articles found for this page.
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-16 border-t border-[var(--border-subtle)] pt-10">
            <Pagination>
              <PaginationContent className="gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href={getNewsPageHref(currentPage - 1)}
                    className={`rounded-full border border-[var(--border-subtle)] ${
                      currentPage <= 1
                        ? 'pointer-events-none opacity-40'
                        : 'hover:border-[var(--color-accent)] hover:bg-white hover:text-[var(--color-foreground)]'
                    } transition-all duration-200`}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href={getNewsPageHref(page)}
                      isActive={currentPage === page}
                      className={`rounded-full border transition-all duration-200 ${
                        currentPage === page
                          ? 'border-[var(--color-accent)] bg-[var(--accent-soft)] text-[var(--color-accent)]'
                          : 'border-[var(--border-subtle)] hover:border-[var(--color-accent)] hover:bg-white'
                      }`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href={getNewsPageHref(currentPage + 1)}
                    className={`rounded-full border border-[var(--border-subtle)] ${
                      currentPage >= totalPages
                        ? 'pointer-events-none opacity-40'
                        : 'hover:border-[var(--color-accent)] hover:bg-white hover:text-[var(--color-foreground)]'
                    } transition-all duration-200`}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  )
}
