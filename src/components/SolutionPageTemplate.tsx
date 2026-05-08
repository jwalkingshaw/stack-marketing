import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronRight, Home } from 'lucide-react'
import { buildAppAuthUrl } from '@/lib/app-links'
import SolutionRelatedArticles from '@/components/SolutionRelatedArticles'
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

type PointOfViewSection = {
  title: string
  body: string
  bullets?: string[]
}

type ComparisonRow = {
  label: string
  left: string
  right: string
}

type ComparisonSection = {
  kicker: string
  title: string
  body: string
  leftTitle: string
  rightTitle: string
  rows: ComparisonRow[]
}

export interface SolutionPageContent {
  slug: string
  articleCluster?: string
  archetype?: 'default' | 'category' | 'workflow' | 'channel'
  shortTitle: string
  title: string
  description: string
  kicker: string
  heroAsideTitle?: string
  heroTitle: string
  heroBody: string
  directAnswer?: string
  pointOfView?: PointOfViewSection
  heroPoints: string[]
  categoryKicker?: string
  categoryProblemTitle: string
  categoryProblemBody: string
  categoryProblems: Section[]
  platformKicker?: string
  platformTitle: string
  platformBody: string
  capabilityGroups: ChecklistGroup[]
  comparisonSection?: ComparisonSection
  operatingKicker?: string
  operatingTitle: string
  operatingBody: string
  operatingSections: Section[]
  faqKicker?: string
  faqTitle: string
  faqs: FaqItem[]
  relatedKicker?: string
  relatedPages: RelatedPage[]
  sources?: SourceLink[]
}

interface SolutionPageTemplateProps {
  content: SolutionPageContent
}

const articleTagGroups: Record<string, string[]> = {
  'product-content-operations': ['pim', 'dam', 'catalog', 'sku', 'variant', 'product content', 'ecommerce', 'retail'],
  'partner-content-operations': ['partner portal', 'retail', 'distributor', 'marketing', 'launch', 'ecommerce', 'assets'],
  'multilingual-content-operations': ['translation', 'localization', 'multilingual', 'claims', 'labels', 'ecommerce'],
  'compliance-and-launch-operations': ['compliance', 'coa', 'launch', 'labels', 'documents', 'quality'],
}

export default function SolutionPageTemplate({ content }: SolutionPageTemplateProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'
  const fullUrl = `${siteUrl}/${content.slug}`
  const comparisonSection = content.comparisonSection
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

  const problemSection = (
    <section className="grid gap-10 py-16 lg:grid-cols-[0.84fr_1.16fr]">
      <div>
        <p className="marketing-kicker">{content.categoryKicker || 'Category Pressure'}</p>
        <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
          {content.categoryProblemTitle}
        </h2>
      </div>
      <div className="grid gap-8 border-t border-[var(--color-border)] pt-8">
        <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">{content.categoryProblemBody}</p>
        <div className="grid gap-5 md:grid-cols-3">
          {content.categoryProblems.map((problem) => (
            <div key={problem.title} className="flex flex-col gap-6 rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5">
              <h3 className="text-[1.1rem] font-medium text-[var(--color-foreground)]">{problem.title}</h3>
              <p className="marketing-detail-copy text-[var(--color-foreground-muted)]">{problem.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  const platformSection = (
    <section className="border-y border-[var(--color-border)] py-16">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="marketing-kicker">{content.platformKicker || 'Platform Fit'}</p>
          <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
            {content.platformTitle}
          </h2>
          <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">{content.platformBody}</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {content.capabilityGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-6 rounded-[1.25rem] border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
              <h3 className="text-[1.22rem] font-medium text-[var(--color-foreground)]">{group.title}</h3>
              <div className="space-y-3">
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
  )

  const comparisonBlock = comparisonSection ? (
    <section className="py-16">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="marketing-kicker">{comparisonSection.kicker}</p>
          <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
            {comparisonSection.title}
          </h2>
          <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">{comparisonSection.body}</p>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
          <div className="grid gap-4 border-b border-[var(--color-border)] bg-[var(--bg-tertiary)] px-5 py-4 sm:grid-cols-[11rem_1fr_1fr] sm:gap-5">
            <div />
            <p className="text-sm font-semibold text-[var(--color-accent)]">{comparisonSection.leftTitle}</p>
            <p className="text-sm font-semibold text-[var(--color-foreground)]">{comparisonSection.rightTitle}</p>
          </div>

          {comparisonSection.rows.map((row, index) => (
            <div
              key={row.label}
              className={`grid gap-3 px-5 py-5 sm:grid-cols-[11rem_1fr_1fr] sm:gap-5 ${
                index < comparisonSection.rows.length - 1 ? 'border-b border-[var(--color-border)]' : ''
              }`}
            >
              <p className="marketing-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                {row.label}
              </p>
              <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">{row.left}</p>
              <p className="text-sm leading-7 text-[var(--color-foreground-secondary)]">{row.right}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ) : null

  const operatingSection = (
    <section className="grid gap-10 py-16 lg:grid-cols-[0.88fr_1.12fr]">
      <div>
        <p className="marketing-kicker">{content.operatingKicker || 'Operating Reality'}</p>
        <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
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
            <span className="marketing-mono text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
              0{index + 1}
            </span>
            <h3 className="text-[1.7rem] font-medium leading-[1.12] text-[var(--color-foreground)] sm:text-[1.9rem]">
              {section.title}
            </h3>
            <p className="marketing-detail-copy max-w-[30rem] text-[var(--color-foreground-secondary)]">{section.body}</p>
          </div>
        ))}
      </div>
    </section>
  )

  const archetype = content.archetype || 'default'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="px-4 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
        <div className="mx-auto max-w-[1320px]">
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

          <section className="grid gap-10 border-b border-[var(--color-border)] pb-12 xl:grid-cols-[1fr_0.92fr] xl:items-start">
            <div>
              <p className="marketing-kicker">{content.kicker}</p>
              <h1 className="mt-7 max-w-none pb-6 text-[2.9rem] font-medium tracking-[-0.018em] text-[var(--color-foreground)] !leading-[1.06] sm:text-[4rem] lg:text-[4.8rem] xl:text-[5.3rem]">
                {content.heroTitle}
              </h1>
              <p className="marketing-section-copy max-w-[46rem] text-[var(--color-foreground-secondary)]">{content.heroBody}</p>
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
                  className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border-strong)] px-7 py-3.5 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)]"
                >
                  See pricing
                </Link>
              </div>
            </div>

            <div className="space-y-5 xl:pt-1">
              {content.directAnswer ? (
                <div className="rounded-[1.1rem] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.72)] px-5 py-4 shadow-[var(--shadow-soft)] sm:px-6 sm:py-5">
                  <p className="marketing-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                    Direct answer
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-foreground-secondary)]">{content.directAnswer}</p>
                </div>
              ) : null}

              <div className="marketing-ui-panel marketing-diagonal-texture p-6 sm:p-8">
                <p className="marketing-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  {content.heroAsideTitle || 'What this page covers'}
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
            </div>
          </section>

          {content.pointOfView ? (
            <section className="py-10 sm:py-12">
              <div className="rounded-[1.5rem] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.82)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
                <p className="marketing-kicker">Operator View</p>
                <div className="mt-5 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                  <div>
                    <h2 className="text-[1.9rem] font-medium leading-[1.12] text-[var(--color-foreground)] sm:text-[2.2rem]">
                      {content.pointOfView.title}
                    </h2>
                  </div>
                  <div>
                    <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">{content.pointOfView.body}</p>
                    {content.pointOfView.bullets && content.pointOfView.bullets.length > 0 ? (
                      <div className="mt-5 space-y-3">
                        {content.pointOfView.bullets.map((item) => (
                          <div key={item} className="flex items-start gap-2.5">
                            <CheckCircle2 className="mt-1.5 h-4 w-4 flex-shrink-0 text-[var(--color-success)]" />
                            <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">{item}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {archetype === 'workflow' ? (
            <>
              {problemSection}
              {operatingSection}
              {platformSection}
              {comparisonBlock}
            </>
          ) : archetype === 'channel' ? (
            <>
              {problemSection}
              {comparisonBlock}
              {platformSection}
              {operatingSection}
            </>
          ) : archetype === 'category' ? (
            <>
              {problemSection}
              {platformSection}
              {comparisonBlock}
              {operatingSection}
            </>
          ) : (
            <>
              {problemSection}
              {platformSection}
              {comparisonBlock}
              {operatingSection}
            </>
          )}

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
                      className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-soft)] transition-colors hover:border-[var(--color-border-strong)]"
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
              <p className="marketing-kicker">{content.faqKicker || 'Questions'}</p>
              <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">{content.faqTitle}</h2>
            </div>
            <div className="border-y border-[var(--color-border)]">
              {content.faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`flex flex-col gap-6 py-7 sm:py-8 ${index < content.faqs.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}
                >
                  <h3 className="text-lg font-medium leading-[1.42] text-[var(--color-foreground)]">{faq.question}</h3>
                  <p className="marketing-detail-copy text-[var(--color-foreground-muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {content.articleCluster && articleTagGroups[content.articleCluster] ? (
            <SolutionRelatedArticles
              currentSlug={content.slug}
              tags={articleTagGroups[content.articleCluster]}
            />
          ) : null}

          <section className="border-t border-[var(--color-border)] py-16">
            <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr]">
              <div>
                <p className="marketing-kicker">{content.relatedKicker || 'Related Pages'}</p>
                <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
                  More on product content operations.
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {content.relatedPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-soft)] transition-colors hover:border-[var(--color-border-strong)]"
                  >
                    <h3 className="text-lg font-medium text-[var(--color-foreground)]">{page.title}</h3>
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
