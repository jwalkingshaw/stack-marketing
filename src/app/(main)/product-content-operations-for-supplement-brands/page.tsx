import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronRight, Home } from 'lucide-react'
import { buildAppAuthUrl } from '@/lib/app-links'
import { generateBreadcrumbSchema } from '@/lib/schema'
import SolutionRelatedArticles from '@/components/SolutionRelatedArticles'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'
const pagePath = '/product-content-operations-for-supplement-brands'
const fullUrl = `${siteUrl}${pagePath}`

const keyTakeaways = [
  'Product content operations is broader than PIM, DAM, translation, or compliance documentation alone.',
  'The operating layers are product data, approved assets, market adaptation, partner delivery, and launch readiness.',
  'Most supplement teams break on exceptions across variants, markets, and partners, not on SKU count alone.',
]

const operatorReality = [
  {
    title: 'The label changed, but the commercial pack did not.',
    body: 'A reformulated pre-workout gets a revised label and Supplement Facts panel, but the old hero packshot is still sitting in the distributor folder and the retailer PDP copy still reflects the previous caffeine callout. The team spends the week before launch in Slack, email, and shared drives proving which version is actually current.',
  },
  {
    title: 'The local market moved first and left the source behind.',
    body: 'A distributor in Germany needs local-ready copy and a claims-safe product pack for a retailer pitch. Someone duplicates the English sheet, rewrites a few lines, swaps a warning, and sends it forward. Six weeks later the base product changes, but nobody is confident the German version inherited the same update.',
  },
  {
    title: 'One partner request exposes the whole model.',
    body: 'A retail buyer asks for current packshots, dimensions, ingredient panels, and launch-support files for three flavors by Friday. The issue is not whether the files exist. The issue is that the team has to reconstruct the answer from tabs, folders, inboxes, and old exports instead of opening one governed operating source.',
  },
]

const diagnosticRows = [
  {
    label: 'Product data',
    failingSignal: 'Variant sheets, GTIN notes, and product descriptions stop agreeing once the family changes by size, flavor, or market.',
    strongerModel: 'Shared fields, variant overrides, and market-level differences stay explicit instead of being patched through duplicate rows.',
  },
  {
    label: 'Approved assets',
    failingSignal: 'The label team, ecommerce team, and distributor are all using different packshots or PDFs for the same SKU.',
    strongerModel: 'Current labels, packshots, and support files stay linked to the product record and approval state they belong to.',
  },
  {
    label: 'Market adaptation',
    failingSignal: 'Local teams keep their own wording edits because the translated version is no longer trusted to match the approved source.',
    strongerModel: 'Market-specific wording, warnings, and review decisions stay attached to the same base record instead of becoming side documents.',
  },
  {
    label: 'Partner delivery',
    failingSignal: 'Every distributor or retailer request triggers a fresh assembly exercise across spreadsheets, shared drives, and inboxes.',
    strongerModel: 'Partner-ready packs are scoped from one current source instead of rebuilt one request at a time.',
  },
  {
    label: 'Launch readiness',
    failingSignal: 'Teams say the product is ready, but one late asset, warning change, or market pack exception still delays go-live.',
    strongerModel: 'Readiness reflects whether data, assets, market content, and partner materials are aligned, not whether the base row is filled in.',
  },
]

const industryContext = [
  {
    title: 'Claims sensitivity raises the stakes.',
    body: 'Supplement content is harder than generic catalog work because benefit language, warnings, Supplement Facts panels, and supporting claims often need tighter handling across ecommerce, labels, distributors, and market teams.',
  },
  {
    title: 'Market differences are real operational work.',
    body: 'The same product may need different wording, support files, or approval history by market. Teams feel that pressure operationally long before they describe it as a localization or compliance problem.',
  },
  {
    title: 'Partner-facing content has to stay commercially usable.',
    body: 'Retailers, distributors, and agencies do not want interpretation. They want current, scoped product content and files they can trust while the launch window is still open.',
  },
]

const operatingLayers = [
  {
    id: 'product-data-structure',
    title: 'Product Data Structure',
    body: 'Ingredients, nutritionals, warnings, pack data, GTINs, and variant logic need a structure that knows what is shared, what changes by variant, and what changes by market or channel.',
  },
  {
    id: 'approved-assets',
    title: 'Approved Assets',
    body: 'Labels, packshots, spec sheets, lifestyle images, and support documents must stay tied to product truth instead of floating in disconnected folders and email threads.',
  },
  {
    id: 'market-adaptation',
    title: 'Market Adaptation',
    body: 'Multilingual supplement content is not just translation. Teams need to manage wording, review pressure, and market-specific differences without duplicating the whole record.',
  },
  {
    id: 'partner-delivery',
    title: 'Partner Delivery',
    body: 'Distributors, retailers, and agencies need scoped, current product packages. The system must package the right outputs without manual assembly every time.',
  },
  {
    id: 'launch-readiness',
    title: 'Launch Readiness',
    body: 'A product is only ready when data, assets, localized content, and downstream partner materials all reflect the same current truth.',
  },
]

const failurePatterns = [
  'Claims drift between ecommerce, labels, and partner materials.',
  'Local markets keep their own unofficial versions of copy.',
  'Packshots and labels stop matching the current product record.',
  'Distributor onboarding turns into email-based assembly work.',
  'Teams duplicate records to handle market differences manually.',
  'Launch readiness becomes a chase across tabs, folders, and inboxes.',
]

const solutionLinks = [
  {
    href: '/pim-for-supplement-brands',
    title: 'PIM for Supplement Brands',
    body: 'For teams whose first hard problem is variant structure, claims-sensitive product data, and catalog control.',
  },
  {
    href: '/dam-for-supplement-brands',
    title: 'DAM for Supplement Brands',
    body: 'For teams trying to keep approved labels, packshots, and support assets connected to the product record.',
  },
  {
    href: '/ai-localization-for-supplement-brands',
    title: 'AI Market Adaptation',
    body: 'For teams dealing with multilingual copy, local review loops, and claims-sensitive market adaptation.',
  },
  {
    href: '/product-content-syndication-for-supplement-brands',
    title: 'Product Content Syndication',
    body: 'For teams that have the content but still struggle to package and deliver it cleanly to partners.',
  },
]

const faqs = [
  {
    question: 'What is product content operations for supplement brands?',
    answer:
      'It is the operating model that keeps product data, approved assets, market-specific content, and partner-ready outputs aligned across teams, channels, and regions.',
  },
  {
    question: 'How is product content operations different from PIM?',
    answer:
      'PIM is one part of the system. Product content operations is broader and includes product data, assets, localization or market adaptation, partner delivery, and readiness workflows.',
  },
  {
    question: 'Why is multilingual content not just a translation problem?',
    answer:
      'Because a direct translation can still create local review issues, claims friction, or channel-level problems. Teams need to manage market differences, not just convert language.',
  },
  {
    question: 'Why do supplement launches break when data and assets are split?',
    answer:
      'Because launch readiness depends on multiple connected outputs. If copy, assets, localized content, and partner packs live in separate systems, change propagation becomes manual and unreliable.',
  },
]

export const metadata: Metadata = {
  title: 'Product Content Operations for Supplement Brands | Stackcess',
  description:
    'A practical guide to product content operations for supplement brands managing product data, approved assets, market adaptation, and partner delivery across markets.',
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: 'Product Content Operations for Supplement Brands | Stackcess',
    description:
      'A practical guide to product content operations for supplement brands managing product data, approved assets, market adaptation, and partner delivery across markets.',
    url: pagePath,
  },
  twitter: {
    title: 'Product Content Operations for Supplement Brands | Stackcess',
    description:
      'A practical guide to product content operations for supplement brands managing product data, approved assets, market adaptation, and partner delivery across markets.',
  },
}

export default function ProductContentOperationsPillarPage() {
  const registerHref = buildAppAuthUrl('register', {
    planInterest: 'growth',
    postLoginRedirectPath: '/onboarding?create=1&origin=product_content_operations_pillar',
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Product Content Operations for Supplement Brands', url: fullUrl },
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
                Product Content Operations
              </li>
            </ol>
          </nav>

          <section className="grid gap-10 border-b border-[var(--color-border)] pb-12 xl:grid-cols-[1fr_0.92fr] xl:items-start">
            <div>
              <p className="marketing-kicker">Product Content Operations</p>
              <h1 className="mt-7 max-w-none pb-6 text-[2.9rem] font-medium tracking-[-0.018em] text-[var(--color-foreground)] !leading-[1.06] sm:text-[4rem] lg:text-[4.8rem] xl:text-[5.3rem]">
                Product content operations for supplement brands is a connected system.
              </h1>
              <p className="marketing-section-copy max-w-[46rem] text-[var(--color-foreground-secondary)]">
                Supplement brands do not usually break on content because one file is missing. They break when product
                data, approved assets, market adaptation, and partner delivery stop moving through one operating model.
              </p>
              <p className="mt-6 max-w-[44rem] text-[1.05rem] leading-8 text-[var(--color-foreground-muted)]">
                If you manage product content across more than one market, channel, or partner, you are not just
                managing product information. You are managing product truth as it moves through variants, labels,
                localized copy, distributor packs, and launch workflows.
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
                  Product content operations is the operating model that keeps product data, approved assets,
                  market-specific content, and partner-ready outputs aligned across teams, channels, and regions.
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
              <p className="marketing-kicker">Why This Is Different</p>
              <div className="mt-5 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                <div>
                  <h2 className="text-[1.9rem] font-medium leading-[1.12] text-[var(--color-foreground)] sm:text-[2.2rem]">
                    This is not just a PIM problem, a DAM problem, a translation problem, or a compliance problem.
                  </h2>
                </div>
                <div>
                  <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">
                    A spreadsheet can hold attributes. A DAM can hold packshots. A translation workflow can create
                    another language version. A compliance folder can store support documents. But supplement brands do
                    not struggle because one of those pieces is missing in isolation. They struggle because all of them
                    have to stay aligned while products change by variant, market, channel, and partner.
                  </p>
                  <p className="mt-5 text-[1rem] leading-8 text-[var(--color-foreground-muted)]">
                    In supplement brands, the pressure is higher because copy is claims-sensitive, labels change under
                    regulatory and market review, and one retailer or distributor exception can ripple across the full
                    product pack. What looks like catalog maintenance in another category quickly becomes operating risk
                    here.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-10 py-16 lg:grid-cols-[0.84fr_1.16fr]">
            <div>
              <p className="marketing-kicker">What We See In Practice</p>
              <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
                What this looks like inside a real supplement team.
              </h2>
              <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">
                This is the point of view behind Stackcess. The problem is usually not one missing field. It is the
                week of reconstruction work around the field, file, or market exception that changed.
              </p>
            </div>
            <div className="grid gap-5 border-t border-[var(--color-border)] pt-8">
              {operatorReality.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-soft)]"
                >
                  <h3 className="text-[1.15rem] font-medium text-[var(--color-foreground)]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-foreground-muted)]">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="border-y border-[var(--color-border)] py-16">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="marketing-kicker">What Teams Need To Control</p>
                <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
                  The Stackcess Five Operating Layers.
                </h2>
                <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">
                  This is the framework we use to describe where supplement content operations actually breaks. When
                  these five layers stay connected, a team can update once and push that change through the places that
                  need it. When they are disconnected, every launch turns into a manual coordination exercise.
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

          <section className="py-16">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="marketing-kicker">Diagnostic Table</p>
                <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
                  Where your content operations model is usually failing.
                </h2>
                <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">
                  This is the practical diagnostic. Most teams feel the symptom first and only later identify which
                  operating layer underneath it is weak.
                </p>
              </div>

              <div className="overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
                <div className="grid gap-4 border-b border-[var(--color-border)] bg-[var(--bg-tertiary)] px-5 py-4 sm:grid-cols-[11rem_1fr_1fr] sm:gap-5">
                  <div />
                  <p className="text-sm font-semibold text-[var(--color-accent)]">When the layer is failing</p>
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">What a stronger model does</p>
                </div>

                {diagnosticRows.map((row, index) => (
                  <div
                    key={row.label}
                    className={`grid gap-3 px-5 py-5 sm:grid-cols-[11rem_1fr_1fr] sm:gap-5 ${
                      index < diagnosticRows.length - 1 ? 'border-b border-[var(--color-border)]' : ''
                    }`}
                  >
                    <p className="marketing-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                      {row.label}
                    </p>
                    <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">{row.failingSignal}</p>
                    <p className="text-sm leading-7 text-[var(--color-foreground-secondary)]">{row.strongerModel}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-10 py-16 lg:grid-cols-[0.84fr_1.16fr]">
            <div>
              <p className="marketing-kicker">Where Teams Lose Control</p>
              <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
                What breaks when the layers are disconnected.
              </h2>
            </div>
            <div className="grid gap-8 border-t border-[var(--color-border)] pt-8">
              <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">
                Most supplement teams do not fail because the catalog is large in a simple sense. They fail because
                claims, assets, localized copy, and partner outputs start changing in more than one direction at the
                same time.
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

          <section className="border-t border-[var(--color-border)] py-16">
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <p className="marketing-kicker">Industry Context</p>
                <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
                  Why supplement content operations is harder than generic catalog work.
                </h2>
              </div>
              <div className="grid gap-5 border-t border-[var(--color-border)] pt-8 md:grid-cols-3">
                {industryContext.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5"
                  >
                    <h3 className="text-[1.05rem] font-medium text-[var(--color-foreground)]">{item.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-[var(--color-foreground-muted)]">{item.body}</p>
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
                  Product truth survives variants, markets, and partners from one source model.
                </h2>
                <p className="marketing-section-copy text-[var(--color-foreground-secondary)]">
                  A stronger operating model does not require every field to be custom every time. It requires the
                  system to be deliberate about where differences belong.
                </p>
              </div>

              <div className="overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
                {[
                  'One structured source record for product truth.',
                  'Clear variant logic instead of duplicated rows.',
                  'Governed assets tied back to products and uses.',
                  'Market-aware content handling rather than language-only duplication.',
                  'Scoped outputs for distributors, retailers, and internal teams.',
                  'Visible readiness states before launch.',
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

          <SolutionRelatedArticles
            currentSlug="product-content-operations-for-supplement-brands"
            tags={['product content', 'catalog', 'variant', 'market', 'retail', 'distributor']}
            pillarKey="product-content-operations"
          />

          <section className="border-t border-[var(--color-border)] py-16">
            <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr]">
              <div>
                <p className="marketing-kicker">Related Solutions</p>
                <h2 className="marketing-section-title mt-7 pb-6 text-[var(--color-foreground)]">
                  More on product content operations.
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
                Common questions about this operating model.
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
                  The brands that stay in control treat product content as an operating system, not a set of files.
                </h2>
                <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-[var(--text-muted)]">
                  That means structuring product data properly, governing approved assets, handling market differences
                  deliberately, and packaging partner-ready outputs from the same underlying source. In practice, that
                  means things like market-level exceptions without duplicating the base record, product-linked asset
                  governance instead of loose folders, and partner-ready outputs that can be reused without rebuilding
                  the same pack every time.
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
