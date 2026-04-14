import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, BookOpenText, CalendarDays } from 'lucide-react'
import { getHelpArticleBySlug, helpArticles } from '@/lib/help-center'

type HelpArticlePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return helpArticles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: HelpArticlePageProps) {
  const { slug } = await params
  const article = getHelpArticleBySlug(slug)
  if (!article) {
    return {
      title: 'Help Guide Not Found | Stackcess',
    }
  }

  return {
    title: `${article.title} | Stackcess Help`,
    description: article.summary,
  }
}

export default async function HelpArticlePage({ params }: HelpArticlePageProps) {
  const { slug } = await params
  const article = getHelpArticleBySlug(slug)
  if (!article) notFound()

  const index = helpArticles.findIndex((entry) => entry.slug === article.slug)
  const previous = index > 0 ? helpArticles[index - 1] : null
  const next = index >= 0 && index < helpArticles.length - 1 ? helpArticles[index + 1] : null

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
              <span className="border border-[var(--color-border)] px-2 py-0.5">{article.category}</span>
              <span className="inline-flex items-center gap-1">
                <BookOpenText className="h-3.5 w-3.5" />
                {article.readTime}
              </span>
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                Updated {article.updatedAt}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-[var(--color-foreground)] sm:text-4xl">
              {article.title}
            </h1>
            <p className="mt-3 text-base text-[var(--color-foreground-muted)]">{article.summary}</p>
            {article.appPaths.length > 0 ? (
              <div className="mt-4 border border-[var(--color-border)] p-3">
                <p className="text-xs uppercase tracking-wide text-[var(--color-foreground-muted)]">Common paths</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {article.appPaths.map((path) => (
                    <code
                      key={path}
                      className="rounded border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-1 text-xs text-[var(--color-foreground)]"
                    >
                      {path}
                    </code>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          {article.sections.map((section) => (
            <section key={section.title} className="border-t border-[var(--color-border)] py-5 sm:py-6">
              <h2 className="text-xl font-semibold text-[var(--color-foreground)]">{section.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[var(--color-foreground-muted)]">{section.body}</p>

              {section.bullets && section.bullets.length > 0 ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--color-foreground)]">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}

              {section.steps && section.steps.length > 0 ? (
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--color-foreground)]">
                  {section.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              ) : null}
            </section>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/help/${previous.slug}`}
              className="border-t border-[var(--color-border)] p-4 transition-colors hover:border-[var(--color-border-strong)]"
            >
              <p className="text-xs text-[var(--color-foreground-muted)]">Previous</p>
              <p className="mt-1 text-sm font-semibold text-[var(--color-foreground)]">{previous.title}</p>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {next ? (
            <Link
              href={`/help/${next.slug}`}
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
