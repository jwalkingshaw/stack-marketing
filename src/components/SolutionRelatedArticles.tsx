'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type RelatedArticle = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  tags: string[]
}

type RelatedArticlesResponse = {
  articles: RelatedArticle[]
  lastUpdated: string
}

interface SolutionRelatedArticlesProps {
  currentSlug: string
  tags: string[]
}

export default function SolutionRelatedArticles({
  currentSlug,
  tags,
}: SolutionRelatedArticlesProps) {
  const [articles, setArticles] = useState<RelatedArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRelatedArticles() {
      try {
        const response = await fetch(`/api/related-articles?slug=${currentSlug}&tags=${tags.join(',')}`)
        if (!response.ok) {
          throw new Error('Failed to fetch related articles')
        }

        const data: RelatedArticlesResponse = await response.json()
        setArticles(data.articles.slice(0, 3))
      } catch {
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    if (tags.length > 0) {
      fetchRelatedArticles()
    } else {
      setLoading(false)
    }
  }, [currentSlug, tags])

  const articleCards = loading ? [] : articles

  return (
    <section className="border-t border-[var(--color-border)] py-16">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="marketing-kicker">Related Articles</p>
          <h2 className="marketing-section-title mt-7 pb-4 text-[var(--color-foreground)] !leading-[1.02]">
            More from /news.
          </h2>
          <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">
            Reporting and analysis connected to the same operating issue.
          </p>
        </div>

        <div className="border-y border-[var(--color-border)]">
          {articleCards.map((article, index) => (
            <Link
              key={article._id}
              href={`/post/${article.slug.current}`}
              className={`block py-7 transition-colors hover:text-[var(--color-foreground)] ${index < articleCards.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}
            >
              <p className="marketing-mono text-[0.66rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <h3 className="mt-3 text-lg font-semibold leading-[1.3] text-[var(--color-foreground)]">{article.title}</h3>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-foreground)]">
                Read article
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}

          <div className={`py-7 ${articleCards.length > 0 ? 'border-t border-[var(--color-border)]' : ''}`}>
            <Link href="/news" className="block transition-colors hover:text-[var(--color-foreground)]">
              <p className="marketing-mono text-[0.66rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                Archive
              </p>
              <h3 className="mt-3 text-lg font-semibold leading-[1.3] text-[var(--color-foreground)]">
                Browse all articles in /news
              </h3>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-foreground)]">
                Open /news
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
