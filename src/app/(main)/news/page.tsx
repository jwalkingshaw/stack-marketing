import type { Metadata } from 'next'
import { Suspense } from 'react'
import NewsFeed from '@/components/NewsFeed'
import TopBanner from '@/components/TopBanner'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'News — Stackcess',
  description:
    'The latest news, trends, and insights from the sports supplement industry — covering brands, retailers, distributors, and regulatory updates.',
  alternates: { canonical: '/news' },
  openGraph: {
    title: 'News — Stackcess',
    description:
      'The latest news, trends, and insights from the sports supplement industry.',
    url: '/news',
  },
  twitter: {
    title: 'News — Stackcess',
    description:
      'The latest news, trends, and insights from the sports supplement industry.',
  },
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'

export default function NewsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'News', url: `${siteUrl}/news` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <TopBanner />

      <Suspense fallback={<div className="flex justify-center py-12">Loading...</div>}>
        <NewsFeed />
      </Suspense>
    </>
  )
}
