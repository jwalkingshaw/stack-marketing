import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronRight, Home } from 'lucide-react'
import { buildAppAuthUrl } from '@/lib/app-links'
import { generateBreadcrumbSchema } from '@/lib/schema'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'
const pagePath = '/market-execution-for-supplement-brands'
const fullUrl = `${siteUrl}${pagePath}`

const keyTakeaways = [
  'Most execution problems start after the plan is approved, not before it.',
  'Partners need current product content, campaign assets, and support files in one usable delivery model.',
  'Execution speed improves when distributors and retailers can retrieve approved materials without resend work.',
]

const operatingLayers = [
  {
    id: 'partner-needs',
    title: 'Partner Needs',
    body: 'Distributors, retailers, and market teams do not need one file. They need a usable set of product content, assets, support documents, and activation materials.',
  },
  {
    id: 'approved-assets',
    title: 'Approved Assets',
    body: 'Packshots, banners, social cutdowns, launch kits, and ecommerce imagery need to stay current and clearly scoped to the right partner or campaign.',
  },
  {
    id: 'product-context',
    title: 'Product Context',
    body: 'Execution slows down when assets are separated from product truth. Copy, claims, labels, and supporting files need to stay linked to the product they represent.',
  },
  {
    id: 'delivery-model',
    title: 'Delivery Model',
    body: 'A strong operating model gives partners a controlled place to retrieve what is current instead of recreating the same pack through email and shared drives.',
  },
  {
    id: 'launch-velocity',
    title: 'Launch Velocity',
    body: 'The first launch window is usually the hardest test. If brand teams cannot deliver fast, distributors and retailers feel the drag immediately.',
  },
]

const failurePatterns = [
  'Joint business plans get signed but partners still wait on assets and copy.',
  'Retail and distributor packs are rebuilt manually for each request.',
  'Approved content drifts after the first resend cycle.',
  'Local teams create their own workaround versions to keep moving.',
  'Campaign files exist, but nobody is sure which set is current.',
  'Launch momentum is lost in the first weeks because execution materials arrive too late.',
]

const spokeLinks = [
  {
    href: '/post/why-joint-business-plans-fail-in-execution-not-alignment',
    title: 'Why Joint Business Plans Fail in Execution, Not Alignment',
    body: 'Read this when the commercial plan looks agreed but activation still stalls once the work reaches partners.',
  },
  {
    href: '/post/what-distributors-actually-need-from-supplement-brands-to-activate-faster',
    title: 'What Distributors Actually Need From Supplement Brands to Activate Faster',
    body: 'Read this when distributor relationships feel slower than they should because content delivery is still manual.',
  },
  {
    href: '/post/how-to-share-approved-campaign-assets-without-email-chains',
    title: 'How to Share Approved Campaign Assets Without Email Chains',
    body: 'Read this when campaign files are approved internally but still hard to distribute cleanly to external teams.',
  },
]

const solutionLinks = [
  {
    href: '/partner-portal-for-supplement-brands',
    title: 'Partner Portal for Supplement Brands',
    body: 'For controlled external access to current product content, assets, and supporting files.',
  },
  {
    href: '/marketing-enablement-for-supplement-brand-partners',
    title: 'Marketing Enablement for Brand Partners',
    body: 'For launch materials, campaign assets, and in-market activation support.',
  },
  {
    href: '/distributor-content-portal-for-supplement-brands',
    title: 'Distributor Content Portal',
    body: 'For faster distributor onboarding, current updates, and cleaner downstream retrieval.',
  },
  {
    href: '/retailer-content-portal-for-brands',
    title: 'Retailer Content Portal',
    body: 'For retailer-ready imagery, copy, and support files in one current view.',
  },
  {
    href: '/product-content-syndication-for-supplement-brands',
    title: 'Product Content Syndication',
    body: 'For repeatable delivery into portals, exports, and partner-specific packs from one source workflow.',
  },
]

const faqs = [
  {
    question: 'What does market execution mean for supplement brands?',
    answer:
      'It is the operating layer that turns an agreed plan into something distributors, retailers, and partners can actually activate. That usually means current product content, approved assets, support files, and campaign materials delivered in a usable way.',
  },
  {
    question: 'Why do joint business plans fail after alignment?',
    answer:
      'Because the commercial commitment is only one part of the job. Execution fails when the brand side still depends on resend work, unclear versions, and disconnected product or campaign materials.',
  },
  {
    question: 'How does Stackcess help with market execution?',
    answer:
      'Stackcess helps brands organize approved product content, assets, and supporting files so distributors, retailers, and partners can retrieve what they need faster without depending on ad hoc email coordination.',
  },
  {
    question: 'Is this a trade marketing strategy tool?',
    answer:
      'No. The focus is operational execution. Stackcess does not replace the plan. It helps brands make the approved content and asset side of that plan easier to deliver and use.',
  },
]

export const metadata: Metadata = {
  title: 'Market Execution for Supplement Brands | Stackcess',
  description:
    'A practical guide to market execution for supplement brands working across distributors, retailers, and partners with approved content, assets, and activation materials.',
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: 'Market Execution for Supplement Brands | Stackcess',
    description:
      'A practical guide to market execution for supplement brands working across distributors, retailers, and partners with approved content, assets, and activation materials.',
    url: pagePath,
  },
  twitter: {
    title: 'Market Execution for Supplement Brands | Stackcess',
    description:
      'A practical guide to market execution for supplement brands working across distributors, retailers, and partners with approved content, assets, and activation materials.',
  },
}

export default function MarketExecutionPillarPage() {
  const registerHref = buildAppAuthUrl('register', {
    planInterest: 'growth',
    postLoginRedirectPath: '/onboarding?create=1&origin=market_execution_pillar',
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Market Execution for Supplement Brands', url: fullUrl },
  ])

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
                Market Execution
              </li>
            </ol>
          </nav>

          <section className="grid gap-10 border-b border-[var(--color-border)] pb-12 xl:grid-cols-[1fr_0.92fr] xl:items-start">
            <div>
              <p className="marketing-kicker">Market Execution</p>
              <h1 className="mt-7 max-w-none pb-6 text-[2.9rem] font-medium tracking-[-0.018em] text-[var(--color-foreground)] !leading-[1.06] sm:text-[4rem] lg:text-[4.8rem] xl:text-[5.3rem]">
                How supplement brands improve market execution across distributors, retailers, and partners.
              </h1>
              <p className="marketing-section-copy max-w-[46rem] text-[var(--color-foreground-secondary)]">
                The plan is rarely the only problem. Execution breaks when approved product content, campaign assets,
                and partner-ready materials are not current, scoped, and easy to retrieve.
              </p>
              <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-8 text-[var(--color-foreground-muted)]">
                Brands usually already have the files somewhere. The failure starts when distributors, retailers, and
                market teams still depend on email chains, one-off ZIP packs, and local workarounds to activate what
                was already approved.
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
                  className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border-strong)] px-7 py-3.5 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)]"
                >
                  See pricing
                </Link>
              </div>
            </div>

            <div className="space-y-5 xl:pt-1">
              <div className="rounded-[1.1rem] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.72)] px-5 py-4 shadow-[var(--shadow-soft)] sm:px-6 sm:py-5">
                <p className="marketing-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  What this means
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--color-foreground-secondary)]">
                  Market execution is the operating model that helps partners retrieve the current product content,
                  campaign assets, and support materials they need without slowing down brand, distributor, or retailer
                  workflows.
                </p>
              </div>

              <div className="marketing-ui-panel marketing-diagonal-texture p-6 sm:p-8">
                <p className="marketing-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                  Key takeaways
                </p>
                <div className="mt-6 space-y-4">
                  {keyTakeaways.map((point) => (
                    <div key={point} className="flex items-start gap-3 border-t border-[var(--color-border)] pt-4 first:border-t-0 first:pt-0">
                      <CheckCircle2 className="mt-1.5 h-4 w-4 flex-shrink-0 text-[var(--color-accent)]" />
                      <p className="marketing-detail-copy text-[var(--color-foreground-secondary)]">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-10 sm:py-12">
            <div className="rounded-[1.5rem] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.82)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <p className="marketing-kicker">Why This Matters</p>
              <div className="mt-5 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                <div>
                  <h2 className="text-[1.9rem] font-medium leading-[1.12] text-[var(--color-foreground)] sm:text-[2.2rem]">
                    Agreements do not activate themselves.
                  </h2>
                </div>
                <div>
                  <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">
                    A joint business plan, launch calendar, or promotional agreement can look complete on paper and
                    still fail once the partner needs current files. The friction usually starts when product content,
                    assets, launch kits, and support documents are scattered across folders, inboxes, and one-off
                    exports instead of being delivered through one dependable operating model.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="border-y border-[var(--color-border)] py-16">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="marketing-kicker">What Teams Need To Control</p>
                <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
                  The five layers behind smoother partner execution.
                </h2>
                <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">
                  Brands do not need more one-off sends. They need a delivery model that makes current materials easy
                  to retrieve and harder to misuse.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {operatingLayers.map((layer) => (
                  <div
                    id={layer.id}
                    key={layer.title}
                    className="flex flex-col gap-6 rounded-[1.25rem] border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6"
                  >
                    <h3 className="text-[1.22rem] font-medium text-[var(--color-foreground)]">{layer.title}</h3>
                    <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">{layer.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-10 py-16 lg:grid-cols-[0.84fr_1.16fr]">
            <div>
              <p className="marketing-kicker">Where Teams Lose Control</p>
              <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
                What breaks when execution still depends on manual coordination.
              </h2>
            </div>
            <div className="grid gap-8 border-t border-[var(--color-border)] pt-8">
              <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">
                The visible symptom is usually a delayed activation. The underlying issue is that approved materials
                were never made easy to retrieve, trust, and reuse at the point of execution.
              </p>
              <div className="grid gap-5 md:grid-cols-2">
                {failurePatterns.map((pattern) => (
                  <div
                    key={pattern}
                    className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5"
                  >
                    <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">{pattern}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="marketing-kicker">What Good Looks Like</p>
                <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
                  Partners can activate faster because the execution layer is already organized.
                </h2>
                <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">
                  The goal is not more documentation. It is more confidence that the right product content and assets
                  are already packaged for real use.
                </p>
              </div>

              <div className="overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
                {[
                  'Current product content, assets, and support files in one controlled delivery flow.',
                  'Clear partner scope by distributor, retailer, market, or campaign.',
                  'Approved campaign files that are easy to retrieve without resend work.',
                  'Execution kits that stay tied to current product truth instead of drifting separately.',
                  'Faster launch support in the first critical weeks after release.',
                  'Less dependence on local workaround versions to keep activations moving.',
                ].map((item, index, items) => (
                  <div
                    key={item}
                    className={`grid gap-3 px-5 py-5 sm:grid-cols-[11rem_1fr] sm:gap-5 ${
                      index < items.length - 1 ? 'border-b border-[var(--color-border)]' : ''
                    }`}
                  >
                    <p className="marketing-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                      0{index + 1}
                    </p>
                    <p className="text-sm leading-7 text-[var(--color-foreground-secondary)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-[var(--color-border)] py-16">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
              <div>
                <p className="marketing-kicker">Related Articles</p>
                <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
                  Read the articles that explain where execution usually slows down.
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {spokeLinks.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-soft)] transition-colors hover:border-[var(--color-border-strong)]"
                  >
                    <h3 className="text-lg font-medium text-[var(--color-foreground)]">{page.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-foreground-muted)]">{page.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-foreground)]">
                      Read article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="border-t border-[var(--color-border)] py-16">
            <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr]">
              <div>
                <p className="marketing-kicker">Related Solutions</p>
                <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
                  More on partner execution workflows.
                </h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {solutionLinks.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-soft)] transition-colors hover:border-[var(--color-border-strong)]"
                  >
                    <h3 className="text-lg font-medium text-[var(--color-foreground)]">{page.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-foreground-muted)]">{page.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-foreground)]">
                      Open page
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-10 py-16 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="marketing-kicker">Questions</p>
              <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
                Common questions about this workflow.
              </h2>
            </div>
            <div className="border-y border-[var(--color-border)]">
              {faqs.map((faq, index) => (
                <div
                  key={faq.question}
                  className={`flex flex-col gap-6 py-7 sm:py-8 ${index < faqs.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}
                >
                  <h3 className="text-lg font-medium leading-[1.42] text-[var(--color-foreground)]">{faq.question}</h3>
                  <p className="marketing-detail-copy text-[var(--color-foreground-muted)]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[rgba(26,24,20,0.08)] bg-[var(--bg-dark)] px-6 py-10 shadow-[var(--shadow-soft)] sm:px-10 sm:py-12">
            <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="marketing-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Our take
                </p>
                <h2 className="mt-4 max-w-3xl text-[2.6rem] font-medium tracking-[-0.018em] !text-[var(--bg-primary)] !leading-[1.06] sm:text-[4rem]">
                  Partners remember which brands make activation easy and which brands make every campaign a chase.
                </h2>
                <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-[var(--text-muted)]">
                  Stackcess helps brands keep approved product content, campaign assets, and support files ready to
                  retrieve, package, and reuse without rebuilding the same execution kit every time.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href={registerHref}
                  className="marketing-primary-button inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-primary)] bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold hover:bg-[var(--color-primary-hover)]"
                >
                  Create Free Account
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-lg border border-[rgba(160,152,144,0.3)] px-6 py-3 text-sm font-semibold !text-white transition-colors hover:border-white/80 hover:!text-white"
                  style={{ color: 'white' }}
                >
                  See pricing
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
