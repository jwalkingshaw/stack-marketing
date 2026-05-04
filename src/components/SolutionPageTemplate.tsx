import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronRight, Home } from 'lucide-react'
import { buildAppAuthUrl } from '@/lib/app-links'
import { generateBreadcrumbSchema } from '@/lib/schema'

type Section = {
  title: string
  body: string
}

type ChecklistGroup = {
  title: string
  items: string[]
}

type FaqItem = {
  question: string
  answer: string
}

type RelatedPage = {
  href: string
  title: string
  description: string
}

type SourceLink = {
  href: string
  label: string
  note: string
}

export interface SolutionPageContent {
  slug: string
  shortTitle: string
  title: string
  description: string
  kicker: string
  heroTitle: string
  heroBody: string
  heroPoints: string[]
  categoryProblemTitle: string
  categoryProblemBody: string
  categoryProblems: Section[]
  platformTitle: string
  platformBody: string
  capabilityGroups: ChecklistGroup[]
  operatingTitle: string
  operatingBody: string
  operatingSections: Section[]
  faqTitle: string
  faqs: FaqItem[]
  relatedPages: RelatedPage[]
  sources?: SourceLink[]
}

interface SolutionPageTemplateProps {
  content: SolutionPageContent
}

export default function SolutionPageTemplate({ content }: SolutionPageTemplateProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'
  const fullUrl = `${siteUrl}/${content.slug}`
  const registerHref = buildAppAuthUrl('register', {
    planInterest: 'free',
    postLoginRedirectPath: `/onboarding?create=1&origin=${content.slug}`,
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: content.shortTitle, url: fullUrl },
  ])

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-12">
        <div className="mx-auto max-w-7xl">
          <nav className="mb-8 text-sm text-[var(--color-foreground-muted)]" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="inline-flex items-center gap-1 hover:text-[var(--color-foreground)]">
                  <Home className="h-4 w-4" />
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="h-4 w-4 text-[var(--color-foreground-subtle)]" />
              </li>
              <li aria-current="page" className="text-[var(--color-foreground)]">
                {content.shortTitle}
              </li>
            </ol>
          </nav>

          <section className="grid gap-10 border-b border-[var(--color-border)] pb-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="marketing-kicker">{content.kicker}</p>
              <h1 className="mt-6 max-w-4xl font-[var(--font-display-serif)] text-[2.7rem] font-normal leading-[1.03] tracking-[-0.025em] text-[var(--color-foreground)] sm:text-[4rem] lg:text-[4.5rem]">
                {content.heroTitle}
              </h1>
              <p className="marketing-section-copy mt-10 max-w-3xl border-t border-[var(--color-border)] pt-5 text-[var(--color-foreground-secondary)]">
                {content.heroBody}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={registerHref}
                  className="marketing-primary-button inline-flex items-center justify-center gap-2 border border-[var(--color-primary)] bg-[var(--color-primary)] px-7 py-3.5 text-sm font-bold transition-colors hover:bg-[var(--color-primary-hover)]"
                >
                  Create Free Account
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center border border-[var(--color-border-strong)] px-7 py-3.5 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)]"
                >
                  See pricing
                </Link>
              </div>
            </div>

            <div className="marketing-card bg-[rgba(255,255,255,0.72)] p-6 sm:p-8">
              <p className="font-[var(--font-ibm-plex-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                What this page covers
              </p>
              <div className="mt-6 space-y-4">
                {content.heroPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3 border-t border-[var(--color-border)] pt-4 first:border-t-0 first:pt-0">
                    <CheckCircle2 className="mt-1.5 h-4 w-4 flex-shrink-0 text-[var(--color-accent)]" />
                    <p className="marketing-detail-copy text-[var(--color-foreground-secondary)]">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-10 py-16 lg:grid-cols-[0.84fr_1.16fr]">
            <div>
              <p className="marketing-kicker">Category Pressure</p>
              <h2 className="marketing-section-title mt-6 text-[var(--color-foreground)]">
                {content.categoryProblemTitle}
              </h2>
            </div>
            <div className="grid gap-8 border-t border-[var(--color-border)] pt-8">
              <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">{content.categoryProblemBody}</p>
              <div className="grid gap-5 md:grid-cols-3">
                {content.categoryProblems.map((problem) => (
                  <div key={problem.title} className="marketing-card bg-[rgba(255,255,255,0.55)] p-5">
                    <h3 className="text-[1.1rem] font-semibold text-[var(--color-foreground)]">{problem.title}</h3>
                    <p className="marketing-detail-copy mt-3 text-[var(--color-foreground-muted)]">{problem.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-y border-[var(--color-border)] py-16">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="marketing-kicker">Platform Fit</p>
                <h2 className="marketing-section-title mt-6 text-[var(--color-foreground)]">
                  {content.platformTitle}
                </h2>
                <p className="marketing-section-copy mt-8 text-[var(--color-foreground-secondary)]">{content.platformBody}</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {content.capabilityGroups.map((group) => (
                  <div key={group.title} className="marketing-card bg-[rgba(255,255,255,0.7)] p-5 sm:p-6">
                    <h3 className="text-[1.22rem] font-semibold text-[var(--color-foreground)]">{group.title}</h3>
                    <div className="mt-4 space-y-3">
                      {group.items.map((item) => (
                        <div key={item} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-1.5 h-4 w-4 flex-shrink-0 text-[var(--color-success)]" />
                          <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-10 py-16 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <p className="marketing-kicker">Operating Reality</p>
              <h2 className="marketing-section-title mt-6 text-[var(--color-foreground)]">
                {content.operatingTitle}
              </h2>
            </div>
            <div className="grid gap-0 border-t border-[var(--color-border)]">
              <p className="marketing-section-copy py-8 text-[var(--color-foreground-secondary)]">{content.operatingBody}</p>
              {content.operatingSections.map((section, index) => (
                <div
                  key={section.title}
                  className={`grid gap-5 py-7 md:grid-cols-[4.5rem_1fr_1.05fr] sm:gap-6 sm:py-8 ${
                    index < content.operatingSections.length - 1 ? 'border-b border-[var(--color-border)]' : ''
                  }`}
                >
                  <span className="font-[var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                    0{index + 1}
                  </span>
                  <h3 className="text-[1.7rem] font-semibold leading-[1.1] text-[var(--color-foreground)] sm:text-[1.9rem]">
                    {section.title}
                  </h3>
                  <p className="marketing-detail-copy max-w-[30rem] text-[var(--color-foreground-secondary)]">{section.body}</p>
                </div>
              ))}
            </div>
          </section>

          {content.sources && content.sources.length > 0 ? (
            <section className="py-4">
              <div className="border-t border-[var(--color-border)] pt-8">
                <p className="marketing-kicker">Standards Context</p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {content.sources.map((source) => (
                    <a
                      key={source.href}
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="marketing-card bg-[rgba(255,255,255,0.55)] p-5 transition-colors hover:border-[var(--color-border-strong)]"
                    >
                      <h3 className="text-base font-semibold text-[var(--color-foreground)]">{source.label}</h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--color-foreground-muted)]">{source.note}</p>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section className="grid gap-10 py-16 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="marketing-kicker">Questions</p>
              <h2 className="marketing-section-title mt-6 text-[var(--color-foreground)]">{content.faqTitle}</h2>
            </div>
            <div className="border-y border-[var(--color-border)]">
              {content.faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`py-7 sm:py-8 ${index < content.faqs.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}
                >
                  <h3 className="text-lg font-semibold leading-[1.3] text-[var(--color-foreground)]">{faq.question}</h3>
                  <p className="marketing-detail-copy mt-3 text-[var(--color-foreground-muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-t border-[var(--color-border)] py-16">
            <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr]">
              <div>
                <p className="marketing-kicker">Related Pages</p>
                <h2 className="marketing-section-title mt-6 text-[var(--color-foreground)]">
                  More on product content operations.
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {content.relatedPages.map((page) => (
                  <Link key={page.href} href={page.href} className="marketing-card bg-[rgba(255,255,255,0.62)] p-5 transition-colors hover:border-[var(--color-border-strong)]">
                    <h3 className="text-lg font-semibold text-[var(--color-foreground)]">{page.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-foreground-muted)]">{page.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-foreground)]">
                      Open page
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
