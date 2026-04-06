import Link from 'next/link'
import { ArrowRight, BookOpen, CircleHelp, LayoutList } from 'lucide-react'
import { getHelpCategories, helpArticles } from '@/lib/help-center'

export const metadata = {
  title: 'Help Center | Stackcess',
  description:
    'User-facing guides for Stackcess modules, settings, partner workflows, and onboarding.',
}

export default function HelpCenterPage() {
  const categories = getHelpCategories()

  return (
    <div className="bg-[var(--color-background)] px-4 pb-16 pt-10 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold tracking-[0.06em] text-[var(--color-foreground-muted)]">
            <CircleHelp className="h-3.5 w-3.5" />
            STACKCESS HELP CENTER
          </div>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-[var(--color-foreground)] sm:text-4xl">
            Product Documentation And Help Guides
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-[var(--color-foreground-muted)] sm:text-base">
            Screen-by-screen documentation for onboarding, catalog workflows, updates, partner collaboration,
            and settings.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2 text-xs text-[var(--color-foreground-muted)]">
            <LayoutList className="h-3.5 w-3.5" />
            {helpArticles.length} guides available
          </div>
        </section>

        <section className="space-y-8">
          {categories.map((group) => (
            <div key={group.category} className="space-y-3">
              <h2 className="text-xl font-semibold text-[var(--color-foreground)]">{group.category}</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {group.articles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/help/${article.slug}`}
                    className="group rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-colors hover:border-[var(--color-border-strong)]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-2 text-xs text-[var(--color-foreground-muted)]">
                        <BookOpen className="h-3.5 w-3.5" />
                        {article.readTime}
                      </span>
                      <span className="text-xs text-[var(--color-foreground-muted)]">{article.audience}</span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-[var(--color-foreground)]">{article.title}</h3>
                    <p className="mt-2 text-sm text-[var(--color-foreground-muted)]">{article.summary}</p>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm text-[var(--color-foreground)]">
                      Open guide
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
