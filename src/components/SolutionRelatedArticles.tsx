'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client, type BlogPost, urlFor } from '@/lib/sanity'

interface SolutionRelatedArticlesProps {
  currentSlug: string
  tags: string[]
}

export default function SolutionRelatedArticles({
  currentSlug,
  tags,
}: SolutionRelatedArticlesProps) {
  void currentSlug
  void tags
  const [articles, setArticles] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecentArticles() {
      try {
        const postsResult = await client.fetch<BlogPost[]>(`
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

        setArticles(postsResult || [])
      } catch {
        setArticles([])
      } finally {
        setLoading(false)
      }
    }

    fetchRecentArticles()
  }, [])

  const articleCards = loading ? [] : articles.slice(0, 3)

  return (
    <section className="border-t border-[var(--color-border)] py-16">
      <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="marketing-kicker">Related Articles</p>
          <h2 className="marketing-section-title mt-7 pb-4 text-[var(--color-foreground)] !leading-[1.02]">
            More from Industry News.
          </h2>
        </div>

        <div className="border-y border-[var(--color-border)] py-7">
          {articleCards.length > 0 ? (
            <div className="grid gap-5 xl:grid-cols-3">
              {articleCards.map((article) => {
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
                        <div className="relative h-[13rem] overflow-hidden">
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
                      <Link href={`/post/${article.slug.current}`} className="block">
                        <h3 className="text-[1.35rem] font-medium tracking-[-0.014em] text-[var(--color-foreground)] !leading-[1.12] sm:text-[1.5rem]">
                          {article.title}
                        </h3>
                      </Link>

                      <Link
                        href={`/post/${article.slug.current}`}
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-foreground)]"
                      >
                        Read article
                        <ArrowRight className="h-4 w-4 marketing-button-arrow" />
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : null}

          <div className={`${articleCards.length > 0 ? 'mt-8 border-t border-[var(--color-border)] pt-6' : ''}`}>
            <Link
              href="/news"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:text-[var(--text-muted)]"
            >
              Open Industry News
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
