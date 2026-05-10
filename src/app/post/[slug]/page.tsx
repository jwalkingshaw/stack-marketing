import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ChevronRight, Home } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { BlogPost, getPostBySlug, urlFor } from '@/lib/sanity'
import { generateNewsArticleSchema, generateBreadcrumbSchema, generateFAQPageSchema } from '@/lib/schema'
import TopArticles from '@/components/TopArticles'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<BlogPost | null> {
  return await getPostBySlug(slug)
}

function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'
}

function getSeoTitle(post: BlogPost) {
  return post.seo?.title?.trim() || post.title
}

function getSeoDescription(post: BlogPost) {
  return post.seo?.description?.trim() || post.excerpt
}

function getAiSummary(post: BlogPost) {
  return post.seo?.aiSummary?.trim() || ''
}

function getCanonicalUrl(post: BlogPost, slug: string) {
  return post.seo?.canonicalUrl?.trim() || `${getSiteUrl()}/post/${slug}`
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const imageUrl = post.coverImage?.asset?.url || undefined
  const metaTitle = getSeoTitle(post)
  const metaDescription = getSeoDescription(post)
  const canonicalUrl = getCanonicalUrl(post, resolvedParams.slug)
  const noIndex = Boolean(post.seo?.noIndex)
  const aiSummary = getAiSummary(post)

  return {
    title: `${metaTitle} | Stackcess`,
    description: metaDescription,
    abstract: aiSummary || undefined,
    keywords: post.tags,
    authors: [{ name: post.author?.name || 'Stackcess' }],
    alternates: { canonical: canonicalUrl },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
      },
    },
    openGraph: {
      type: 'article',
      title: metaTitle,
      description: metaDescription,
      ...(imageUrl && {
        images: [{ url: imageUrl, width: 1200, height: 630, alt: post.coverImage?.alt || metaTitle }],
      }),
      publishedTime: post.publishedAt,
      authors: [post.author?.socialLinks?.website || post.author?.name || 'Stackcess'],
      tags: post.tags,
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      ...(imageUrl && { images: [imageUrl] }),
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params
  const post = await getPost(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const siteUrl = getSiteUrl()
  const fullUrl = getCanonicalUrl(post, resolvedParams.slug)
  const imageUrl = post.coverImage?.asset?.url || `${siteUrl}/opengraph-image`
  const metaDescription = getSeoDescription(post)
  const aiSummary = getAiSummary(post)

  const newsArticleSchema = generateNewsArticleSchema(post, fullUrl, imageUrl, metaDescription, aiSummary || undefined)

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'News', url: `${siteUrl}/news` },
    { name: post.title, url: fullUrl },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(newsArticleSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      {post.faqItems?.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQPageSchema(post.faqItems)),
          }}
        />
      ) : null}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.setTimeout(function () {
              fetch('/api/track-view', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug: ${JSON.stringify(post.slug.current)} })
              }).catch(function () {});
            }, 1000);
          `,
        }}
      />

      <div className="min-h-screen bg-[var(--color-background)] px-6 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-12">
        <div className="w-full max-w-none">
          <nav className="mb-8 text-sm text-[var(--text-muted)]" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="inline-flex items-center gap-1 hover:text-[var(--color-foreground)]">
                  <Home size={16} />
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight size={16} className="text-[var(--text-muted)]" />
              </li>
              <li>
                <Link href="/news" className="hover:text-[var(--color-foreground)]">
                  News
                </Link>
              </li>
              <li>
                <ChevronRight size={16} className="text-[var(--text-muted)]" />
              </li>
              <li className="truncate text-[var(--color-foreground)]" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          <article>
            <header className="border-b border-[var(--border-subtle)] pb-10">
                {post.tags && post.tags.length > 0 ? (
                  <div className="mb-5 flex flex-wrap items-center gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="marketing-mono rounded-full border border-[rgba(39,94,70,0.16)] bg-[rgba(39,94,70,0.08)] px-3 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-[var(--color-accent)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <h1 className="w-full pb-6 text-[2.1rem] font-medium tracking-[-0.016em] text-[var(--color-foreground)] !leading-[1.08] sm:text-[3rem] lg:text-[3.6rem]">
                  {post.title}
                </h1>

                <div className="marketing-mono flex flex-wrap items-center gap-3 text-[0.68rem] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  <span className="inline-flex items-center gap-2">
                    <Calendar size={14} />
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </span>
                  {post.author ? (
                    <address
                      className="not-italic"
                      itemScope
                      itemType="https://schema.org/Person"
                    >
                      <span itemProp="name">{post.author.name}</span>
                    </address>
                  ) : null}
                  {post.estimatedReadingTime ? <span>{post.estimatedReadingTime} min read</span> : null}
                </div>

                {(post.aiSummaryBlock?.keyTakeaways?.length || aiSummary || post.excerpt) ? (
                  <div className="marketing-ui-panel marketing-diagonal-texture mt-8 p-6 sm:p-8">
                    <p className="marketing-kicker">Key Takeaways</p>
                    {post.aiSummaryBlock?.keyTakeaways?.length ? (
                      <ul className="mt-6 max-w-[62rem] space-y-3">
                        {post.aiSummaryBlock.keyTakeaways.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-[1.06rem] leading-8 text-[var(--text-secondary)]">
                            <span className="mt-[0.35em] shrink-0 text-[var(--color-accent)]">—</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-6 max-w-[62rem] text-[1.06rem] leading-8 text-[var(--text-secondary)]">
                        {aiSummary || post.excerpt}
                      </p>
                    )}
                  </div>
                ) : null}
            </header>

            <div className="mt-10">
              {post.coverImage?.asset?.url ? (
                <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-soft)]">
                  <Image
                    src={post.coverImage.asset.url}
                    alt={post.coverImage.alt || post.title}
                    width={1600}
                    height={860}
                    className="h-auto w-full object-cover"
                    priority
                  />
                </div>
              ) : null}

              <div className="mt-10 max-w-[1240px]">
                <div className="blog-post-content w-full rounded-[1.75rem] border border-[var(--border-subtle)] bg-white px-8 py-8 shadow-[var(--shadow-soft)] sm:px-12 sm:py-10 lg:px-16">
                  <PortableText
                    value={post.content}
                    components={{
                      types: {
                        image: ({ value }) => {
                          const portableImageUrl = value.asset?.url || urlFor(value).width(1200).height(760).url()
                          return (
                            <Image
                              src={portableImageUrl}
                              alt={value.alt || ''}
                              width={1200}
                              height={760}
                              className="my-8 w-full rounded-[1.25rem] object-cover"
                            />
                          )
                        },
                        code: ({ value }) => (
                          <pre className="my-8 overflow-x-auto rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5 text-sm text-[var(--text-primary)]">
                            <code>{value.code}</code>
                          </pre>
                        ),
                      },
                      marks: {
                        strong: ({ children }) => <strong className="font-semibold text-[var(--color-foreground)]">{children}</strong>,
                        link: ({ children, value }) =>
                          (() => {
                            const href = value?.href
                            if (!href) {
                              return <>{children}</>
                            }

                            const isExternal =
                              href.startsWith('http://') ||
                              href.startsWith('https://') ||
                              href.startsWith('//') ||
                              href.startsWith('mailto:') ||
                              href.startsWith('tel:')

                            if (isExternal) {
                              return (
                                <a
                                  href={href}
                                  className="blog-post-link"
                                  target={value?.openInNewTab ? '_blank' : undefined}
                                  rel={value?.openInNewTab ? 'noopener noreferrer' : undefined}
                                >
                                  {children}
                                </a>
                              )
                            }

                            return (
                              <Link href={href} className="blog-post-link">
                                {children}
                              </Link>
                            )
                          })(),
                      },
                      hardBreak: () => <br />,
                      block: {
                        normal: ({ children }) => (
                          <p className="whitespace-pre-line text-[1.08rem] leading-9 text-[var(--text-secondary)]">{children}</p>
                        ),
                        h1: ({ children }) => (
                          <h1 className="pt-6 pb-4 text-[2.35rem] font-medium tracking-[-0.016em] text-[var(--color-foreground)] !leading-[1.1] sm:text-[3.1rem]">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="pt-6 pb-4 text-[2rem] font-normal tracking-[-0.016em] text-[var(--color-foreground)] !leading-[1.1] sm:text-[2.6rem]">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="pt-5 pb-3 text-[1.5rem] font-normal tracking-[-0.014em] text-[var(--color-foreground)] !leading-[1.14] sm:text-[1.85rem]">
                            {children}
                          </h3>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="my-8 border-l-[3px] border-[var(--color-accent)] bg-[var(--bg-secondary)] px-5 py-4 text-[1.02rem] italic leading-8 text-[var(--text-secondary)]">
                            {children}
                          </blockquote>
                        ),
                      },
                      list: {
                        bullet: ({ children }) => (
                          <ul className="my-6 ml-6 list-disc space-y-3 pl-2 text-[1.02rem] leading-8 text-[var(--text-secondary)]">
                            {children}
                          </ul>
                        ),
                        number: ({ children }) => (
                          <ol className="my-6 ml-6 list-decimal space-y-3 pl-2 text-[1.02rem] leading-8 text-[var(--text-secondary)]">
                            {children}
                          </ol>
                        ),
                      },
                      listItem: ({ children }) => <li>{children}</li>,
                    }}
                  />
                </div>
              </div>

              {post.faqItems?.length ? (
                <section aria-label="Frequently Asked Questions" className="mt-10 max-w-[1240px]">
                  <div className="w-full rounded-[1.75rem] border border-[var(--border-subtle)] bg-white px-8 py-8 shadow-[var(--shadow-soft)] sm:px-12 sm:py-10 lg:px-16">
                    <h2 className="pb-6 text-[1.5rem] font-medium tracking-[-0.014em] text-[var(--color-foreground)] sm:text-[1.85rem]">
                      Frequently Asked Questions
                    </h2>
                    <dl className="divide-y divide-[var(--border-subtle)]">
                      {post.faqItems.map((item) => (
                        <div key={item._key} className="py-6">
                          <dt className="text-[1.05rem] font-medium leading-7 text-[var(--color-foreground)]">
                            {item.question}
                          </dt>
                          <dd className="mt-3 text-[1.02rem] leading-8 text-[var(--text-secondary)]">
                            {item.answer}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </section>
              ) : null}

              {post.author?.bio?.length ? (
                <div className="mt-10 max-w-[1240px]">
                  <div className="w-full rounded-[1.75rem] border border-[var(--border-subtle)] bg-white px-8 py-8 shadow-[var(--shadow-soft)] sm:px-12 sm:py-10 lg:px-16">
                    <p className="marketing-kicker mb-6">About the Author</p>
                    <p className="text-[1.05rem] font-medium text-[var(--color-foreground)]">{post.author.name}</p>
                    <div className="mt-3">
                      <PortableText
                        value={post.author.bio}
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <p className="text-[1.02rem] leading-8 text-[var(--text-secondary)]">{children}</p>
                            ),
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mt-12 max-w-[920px]">
                <TopArticles />
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
