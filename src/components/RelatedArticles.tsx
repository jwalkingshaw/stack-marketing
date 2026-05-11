'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { BlogPost, urlFor } from '@/lib/sanity'

interface RelatedArticle extends BlogPost {
  views: number
}

interface RelatedArticlesResponse {
  articles: RelatedArticle[]
  lastUpdated: string
}

interface RelatedArticlesProps {
  currentSlug: string
  tags: string[]
  pillarKey?: string
}

export default function RelatedArticles({ currentSlug, tags, pillarKey }: RelatedArticlesProps) {
  const [articles, setArticles] = useState<RelatedArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRelatedArticles() {
      try {
        const params = new URLSearchParams({
          slug: currentSlug,
          tags: tags.join(','),
        })
        if (pillarKey) {
          params.set('pillarKey', pillarKey)
        }

        const response = await fetch(`/api/related-articles?${params.toString()}`)

        if (!response.ok) {
          throw new Error('Failed to fetch related articles')
        }

        const data: RelatedArticlesResponse = await response.json()
        setArticles(data.articles)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching related articles:', err)
      } finally {
        setLoading(false)
      }
    }

    if (pillarKey || tags.length > 0) {
      fetchRelatedArticles()
    } else {
      setLoading(false)
    }
  }, [currentSlug, tags, pillarKey])

  if (error || (!loading && articles.length === 0)) {
    return null
  }

  return (
    <section className="border-t border-[var(--color-border)] py-12">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="marketing-kicker">Related Reading</p>
          <h2 className="marketing-section-title mt-7 pb-4 text-[var(--color-foreground)] !leading-[1.02]">
            More on this topic.
          </h2>
        </div>

        <div className="border-y border-[var(--color-border)] py-7">
          <h3 className="mb-5 flex items-center gap-2 text-lg font-bold text-[var(--color-foreground)]">
            <BookOpen size={20} />
            Related articles
          </h3>

          <div className="grid gap-5 xl:grid-cols-3">
            {(loading ? Array.from({ length: 3 }) : articles).map((article, index) => {
              if (loading) {
                return (
                  <div
                    key={`loading-${index}`}
                    className="animate-pulse overflow-hidden rounded-[1.5rem] border border-[var(--border-subtle)] bg-white p-6 shadow-[var(--shadow-soft)]"
                  >
                    <div className="h-[10rem] rounded-[1rem] bg-[var(--bg-secondary)]" />
                    <div className="mt-5 h-3 w-24 rounded bg-[var(--bg-secondary)]" />
                    <div className="mt-4 h-5 rounded bg-[var(--bg-secondary)]" />
                    <div className="mt-2 h-5 w-5/6 rounded bg-[var(--bg-secondary)]" />
                    <div className="mt-5 h-4 w-2/3 rounded bg-[var(--bg-secondary)]" />
                  </div>
                )
              }

              let imageUrl: string | null = null

              if (article.coverImage?.asset?.url) {
                imageUrl = article.coverImage.asset.url
              } else if (article.coverImage) {
                try {
                  imageUrl = urlFor(article.coverImage).width(720).height(480).url()
                } catch {
                  imageUrl = null
                }
              }

              return (
                <article
                  key={article._id}
                  className="overflow-hidden rounded-[1.5rem] border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
                >
                  {imageUrl ? (
                    <Link href={`/post/${article.slug.current}`} className="block">
                      <div className="relative h-[12rem] overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={article.coverImage?.alt || article.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                        />
                      </div>
                    </Link>
                  ) : null}

                  <div className="p-6">
                    <p className="marketing-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                      {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <Link href={`/post/${article.slug.current}`} className="mt-3 block">
                      <h4 className="text-[1.25rem] font-medium tracking-[-0.014em] text-[var(--color-foreground)] !leading-[1.12]">
                        {article.title}
                      </h4>
                    </Link>
                    {article.excerpt ? (
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--color-foreground-muted)]">
                        {article.excerpt}
                      </p>
                    ) : null}
                    <Link
                      href={`/post/${article.slug.current}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-foreground)]"
                    >
                      Read article
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
