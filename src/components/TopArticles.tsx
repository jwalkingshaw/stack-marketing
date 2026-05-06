'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost, urlFor } from '@/lib/sanity'
import { Eye, TrendingUp } from 'lucide-react'

interface PopularArticle extends BlogPost {
  views: number
}

interface PopularArticlesResponse {
  articles: PopularArticle[]
  lastUpdated: string
  fallback?: boolean
}

export default function TopArticles() {
  const [articles, setArticles] = useState<PopularArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFallback, setIsFallback] = useState(false)

  useEffect(() => {
    async function fetchPopularArticles() {
      try {
        const response = await fetch('/api/popular-articles')

        if (!response.ok) {
          throw new Error('Failed to fetch popular articles')
        }

        const data: PopularArticlesResponse = await response.json()
        setArticles(data.articles)
        setIsFallback(data.fallback || false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching popular articles:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularArticles()
  }, [])

  if (loading) {
    return (
      <div className="rounded-[1.5rem] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5 md:p-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--color-foreground)]">
          <TrendingUp size={18} />
          Most Popular
        </h3>
        <div className="mt-5 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex gap-3">
                <div className="h-12 w-16 rounded bg-[var(--border-subtle)]" />
                <div className="flex-1">
                  <div className="mb-2 h-3 rounded bg-[var(--border-subtle)]" />
                  <div className="h-2 w-2/3 rounded bg-[var(--border-subtle)]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-[1.5rem] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5 md:p-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--color-foreground)]">
          <TrendingUp size={18} />
          Most Popular
        </h3>
        <div className="mt-4 text-sm text-[var(--text-secondary)]">Unable to load popular articles right now.</div>
      </div>
    )
  }

  return (
    <div className="rounded-[1.5rem] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5 md:p-6">
      <div className="flex items-center gap-2">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-[var(--color-foreground)]">
          <TrendingUp size={18} />
          Most Popular
        </h3>
        {isFallback ? (
          <span className="marketing-mono rounded-full border border-[var(--border-default)] px-2 py-1 text-[0.6rem] uppercase tracking-[0.14em] text-[var(--text-muted)]">
            Recent
          </span>
        ) : null}
      </div>

      <div className="mt-5 space-y-3">
        {articles.map((article, index) => {
          const getImageUrl = () => {
            if (!article.coverImage) return null

            if (article.coverImage.asset?.url) {
              return article.coverImage.asset.url
            }

            try {
              return urlFor(article.coverImage).width(96).height(72).url()
            } catch (error) {
              console.error('Error generating image URL:', error)
              return null
            }
          }

          const imageUrl = getImageUrl()

          return (
            <Link
              key={article._id}
              href={`/post/${article.slug.current}`}
              className="block rounded-[1rem] border border-transparent bg-white px-3 py-3 transition-colors hover:border-[var(--border-default)]"
            >
              <div className="flex gap-3">
                {imageUrl ? (
                  <div className="relative h-[4.5rem] w-[5.75rem] flex-shrink-0 overflow-hidden rounded-[0.8rem]">
                    <Image
                      src={imageUrl}
                      alt={article.coverImage?.alt || article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}

                <div className="min-w-0 flex-1">
                  <div className="marketing-mono mb-2 text-[0.62rem] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                    #{index + 1}
                  </div>
                  <h4 className="line-clamp-2 text-sm font-semibold leading-6 text-[var(--color-foreground)]">
                    {article.title}
                  </h4>
                  <div className="marketing-mono mt-2 flex flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    {article.views > 0 ? (
                      <span className="inline-flex items-center gap-1">
                        <Eye size={10} />
                        {article.views.toLocaleString()}
                      </span>
                    ) : null}
                    <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
