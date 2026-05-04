import type { Metadata } from 'next'
import NewsFeed from '@/components/NewsFeed'
import TopBanner from '@/components/TopBanner'
import { generateBreadcrumbSchema, generateItemListSchema } from '@/lib/schema'
import { getPostsPage } from '@/lib/sanity'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'

interface NewsPageProps {
  searchParams: Promise<{ page?: string }>
}

function getPageNumber(page?: string) {
  const parsed = Number(page)
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1
}

function getCanonicalPath(page: number) {
  return page <= 1 ? '/news' : `/news?page=${page}`
}

export async function generateMetadata({ searchParams }: NewsPageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams
  const currentPage = getPageNumber(resolvedSearchParams.page)
  const canonicalPath = getCanonicalPath(currentPage)
  const title = currentPage <= 1 ? 'News | Stackcess' : `News - Page ${currentPage} | Stackcess`
  const description =
    currentPage <= 1
      ? 'The latest news, trends, and insights from the sports supplement industry covering brands, retailers, distributors, and regulatory updates.'
      : `Page ${currentPage} of the latest sports supplement industry news, trends, and regulatory updates from Stackcess.`

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      url: canonicalPath,
    },
    twitter: {
      title,
      description,
    },
  }
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const resolvedSearchParams = await searchParams
  const currentPage = getPageNumber(resolvedSearchParams.page)
  const { posts, total } = await getPostsPage(currentPage)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'News', url: `${siteUrl}/news` },
  ])
  const itemListSchema = generateItemListSchema(
    currentPage <= 1 ? 'Latest supplement industry news' : `Supplement industry news page ${currentPage}`,
    posts.map((post) => ({
      name: post.title,
      url: `${siteUrl}/post/${post.slug.current}`,
    })),
    'Stackcess news coverage of supplement brands, retailers, distributors, and compliance changes.'
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />

      <TopBanner />
      <NewsFeed posts={posts} totalPosts={total} currentPage={currentPage} />
    </>
  )
}
