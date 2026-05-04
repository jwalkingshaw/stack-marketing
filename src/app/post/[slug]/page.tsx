import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ChevronRight, Home } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { BlogPost, getPostBySlug, urlFor } from '@/lib/sanity'
import { generateNewsArticleSchema, generateBreadcrumbSchema } from '@/lib/schema'
import ViewTracker from '@/components/ViewTracker'
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
      authors: ['Stackcess'],
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

  const newsArticleSchema = generateNewsArticleSchema(
    post,
    fullUrl,
    imageUrl,
    metaDescription,
    aiSummary || undefined
  )

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'News', url: `${siteUrl}/news` },
    { name: post.title, url: fullUrl }
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
      
      {/* Track page view */}
      <ViewTracker slug={post.slug.current} />
      
      <>
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors flex items-center">
                <Home size={16} className="mr-1" />
                Home
              </Link>
            </li>
            <li>
              <ChevronRight size={16} className="text-gray-400" />
            </li>
            <li className="truncate max-w-[180px] text-gray-900 font-medium" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>

        <article>
          <header className="mb-8">
            <h1 className="text-2xl sm:text-2xl lg:text-3xl font-[600] font-inter text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center space-x-6 text-sm text-gray-500 mb-8">
              <div className="flex items-center space-x-2">
                <Calendar size={16} />
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>             
            </div>

            {(aiSummary || post.excerpt) && (
              <p className="max-w-3xl text-base leading-7 text-gray-700">
                {aiSummary || post.excerpt}
              </p>
            )}
          </header>

          {/* Cover Image */}
          {post.coverImage?.asset?.url && (
            <div className="mb-8">
              <Image
                src={post.coverImage.asset.url}
                alt={post.coverImage.alt || post.title}
                width={800}
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            <PortableText
              value={post.content}
              components={{
                types: {
                  image: ({ value }) => {
                    const imageUrl = value.asset?.url || urlFor(value).width(800).height(400).url()
                    return (
                      <Image
                        src={imageUrl}
                        alt={value.alt || ''}
                        width={800}
                        height={400}
                        className="rounded-lg my-8 w-full h-auto object-cover"
                      />
                    )
                  },
                  code: ({ value }) => (
                    <pre className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 rounded-md overflow-x-auto my-6 text-sm font-mono">
                      <code>{value.code}</code>
                    </pre>
                  ),
                },
                marks: {
                  strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                  link: ({ children, value }) => (
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

                      const className = 'text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-700'

                      if (isExternal) {
                        return (
                          <a
                            href={href}
                            className={className}
                            target={value?.openInNewTab ? '_blank' : undefined}
                            rel={value?.openInNewTab ? 'noopener noreferrer' : undefined}
                          >
                            {children}
                          </a>
                        )
                      }

                      return (
                        <Link href={href} className={className}>
                          {children}
                        </Link>
                      )
                    })()
                  ),
                },
                block: {
                  normal: ({ children }) => <p className="font-inter leading-loose mb-4">{children}</p>,
                  h1: ({ children }) => <h1 className="font-inter font-bold text-3xl mt-8 mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="font-inter font-bold text-2xl mt-6 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="font-inter font-bold text-xl mt-5 mb-2">{children}</h3>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 italic text-gray-600 font-inter">
                      {children}
                    </blockquote>
                  ),
                },
                list: {
                  bullet: ({ children }) => <ul className="list-disc list-outside ml-6 pl-2 my-6 space-y-2 font-inter text-gray-700 leading-loose">{children}</ul>,
                  number: ({ children }) => <ol className="list-decimal list-outside ml-6 pl-2 my-6 space-y-2 font-inter text-gray-700 leading-loose">{children}</ol>,
                },
                listItem: ({ children }) => <li className="font-inter leading-loose">{children}</li>,
              }}
            />
          </div>
        </article>

        {/* Most Popular Articles Section */}
        <div className="mt-12">
          <TopArticles />
        </div>
      </>
    </>
  )
}
