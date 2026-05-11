import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, BookOpenText, CalendarDays } from 'lucide-react'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { getAllHelpArticles, getHelpArticleBySlug } from '@/lib/sanity'

export const revalidate = 3600

type HelpArticlePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const articles = await getAllHelpArticles()
    return articles.map((article) => ({ slug: article.slug.current }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: HelpArticlePageProps) {
  const { slug } = await params
  const article = await getHelpArticleBySlug(slug)
  if (!article) {
    return { title: 'Help Guide Not Found | Stackcess' }
  }

  const metadataTitle =
    article.title.length <= 52 ? `${article.title} | Stackcess Help` : article.title

  return {
    title: metadataTitle,
    description: article.excerpt,
    alternates: { canonical: `/help/${article.slug.current}` },
    openGraph: {
      title: metadataTitle,
      description: article.excerpt,
      url: `/help/${article.slug.current}`,
    },
    twitter: {
      title: metadataTitle,
      description: article.excerpt,
    },
  }
}

function formatDate(dateString: string): string {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-2 text-sm leading-7 text-[var(--color-foreground-muted)]">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 border-t border-[var(--color-border)] pt-5 text-xl font-semibold text-[var(--color-foreground)] sm:pt-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-5 text-lg font-semibold text-[var(--color-foreground)]">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-4 text-base font-semibold text-[var(--color-foreground)]">{children}</h4>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-foreground)]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--color-foreground)]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[var(--color-foreground)]">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-1.5 py-0.5 font-mono text-xs text-[var(--color-foreground)]">
        {children}
      </code>
    ),
  },
}

export default async function HelpArticlePage({ params }: HelpArticlePageProps) {
  const { slug } = await params
  const [article, allArticles] = await Promise.all([
    getHelpArticleBySlug(slug),
    getAllHelpArticles(),
  ])
  if (!article) notFound()

  const index = allArticles.findIndex((a) => a.slug.current === slug)
  const previous = index > 0 ? allArticles[index - 1] : null
  const next = index >= 0 && index < allArticles.length - 1 ? allArticles[index + 1] : null

  return (
    <div className="bg-[var(--color-background)] px-4 pb-16 pt-10 sm:px-6">
      <article className="mx-auto w-full max-w-4xl space-y-8">
        <div className="space-y-4">
          <Link
            href="/help"
            className="inline-flex items-center gap-1 text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Help Center
          </Link>

          <div className="border-b border-[var(--color-border)] pb-8">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-foreground-muted)]">
              <span className="border border-[var(--color-border)] px-2 py-0.5">
                {article.category.title}
              </span>
              <span className="inline-flex items-center gap-1">
                <BookOpenText className="h-3.5 w-3.5" />
                {article.readTime} min
              </span>
              {article.updatedAt ? (
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Updated {formatDate(article.updatedAt)}
                </span>
              ) : null}
            </div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-[var(--color-foreground)] sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-3 text-base text-[var(--color-foreground-muted)]">{article.excerpt}</p>
            {article.appPaths && article.appPaths.length > 0 ? (
              <div className="mt-4 border border-[var(--color-border)] p-3">
                <p className="text-xs uppercase tracking-wide text-[var(--color-foreground-muted)]">
                  Common paths
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {article.appPaths.map((path) => (
                    <code
                      key={path}
                      className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 font-mono text-xs text-[var(--color-foreground)]"
                    >
                      {path}
                    </code>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {article.body?.length > 0 ? (
          <div className="space-y-1">
            <PortableText value={article.body} components={portableTextComponents} />
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/help/${previous.slug.current}`}
              className="border-t border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-border-strong)]"
            >
              <p className="text-xs text-[var(--color-foreground-muted)]">Previous</p>
              <p className="mt-1 text-sm font-semibold text-[var(--color-foreground)]">
                {previous.title}
              </p>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {next ? (
            <Link
              href={`/help/${next.slug.current}`}
              className="border-t border-[var(--color-border)] p-4 text-left transition-colors hover:border-[var(--color-border-strong)] sm:text-right"
            >
              <p className="text-xs text-[var(--color-foreground-muted)]">Next</p>
              <p className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-foreground)] sm:justify-end">
                {next.title}
                <ArrowRight className="h-3.5 w-3.5" />
              </p>
            </Link>
          ) : null}
        </div>
      </article>
    </div>
  )
}
