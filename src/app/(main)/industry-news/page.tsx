import type { Metadata } from 'next'
import { Suspense } from 'react'
import NewsFeed from '@/components/NewsFeed'
import TopBanner from '@/components/TopBanner'
import { generateBreadcrumbSchema } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Industry News — Stackcess',
  description:
    'The latest news, trends, and insights from the sports supplement industry — covering brands, retailers, distributors, and regulatory updates.',
  alternates: { canonical: '/industry-news' },
  openGraph: {
    title: 'Industry News — Stackcess',
    description:
      'The latest news, trends, and insights from the sports supplement industry.',
    url: '/industry-news',
  },
  twitter: {
    title: 'Industry News — Stackcess',
    description:
      'The latest news, trends, and insights from the sports supplement industry.',
  },
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'

export default function IndustryNewsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Industry News', url: `${siteUrl}/industry-news` },
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
