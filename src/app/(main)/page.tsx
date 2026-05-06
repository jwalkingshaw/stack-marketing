'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, FileText, ImageIcon, Search } from 'lucide-react'
import MarketingFunnelTracker from '@/components/MarketingFunnelTracker'
import { buildAppAuthUrl } from '@/lib/app-links'
import { formatBillingGigabytes, formatBillingLimit, formatDeepLUsage } from '@/lib/billing-display'
import { BILLING_PLAN_CATALOG } from '@/lib/billing-catalog'
import { trackMarketingEvent } from '@/lib/marketing-analytics'
import { generateBreadcrumbSchema } from '@/lib/schema'

type HomePlanId = 'free' | 'starter' | 'growth' | 'scale'
type VisiblePlan = (typeof BILLING_PLAN_CATALOG)[number] & { id: HomePlanId }

const plans = BILLING_PLAN_CATALOG.filter(
  (plan): plan is VisiblePlan =>
    plan.id === 'free' || plan.id === 'starter' || plan.id === 'growth' || plan.id === 'scale'
)

const homepagePlanDescriptors: Record<HomePlanId, string> = {
  free: 'No credit card required. Full platform, limited catalog size.',
  starter: 'Up to 50 SKUs, 2 internal users, 10 partner invites.',
  growth: 'Up to 500 SKUs, 8 internal users, 100 partner invites.',
  scale: 'Up to 2,500 SKUs, unlimited users, unlimited partner invites.',
}

const problemStatements = [
  "Your retail partner is listing your product with assets from six months ago. They don't know. You don't know.",
  'A new distributor needs product data, renders, and compliance documents before they can register your range. Your team is assembling it from three different places.',
  "Your brand copy reads differently in every market. Nobody changed it deliberately - it just drifted.",
  'Every new partner gets a slightly different onboarding pack. Nobody planned it that way.',
]

const faqs = [
  {
    q: 'Do you charge per seat?',
    a: 'No. Stackcess is billed per workspace. Limits cover active SKUs, storage, internal users, partner invites, and included translation usage.',
  },
  {
    q: 'Can Stackcess prepare content for Amazon, ecommerce, and other channels?',
    a: 'Yes. Stackcess stores product data and assets once, then structures exports and output profiles for Amazon, ecommerce, retail, and partner delivery.',
  },
  {
    q: 'Can we manage product content for multiple markets and languages?',
    a: 'Yes. Stackcess manages product content at the market and language level from one core record, with AI-assisted adaptation, governed terminology, and scoped delivery by region and locale.',
  },
  {
    q: 'How is Stackcess different from using a separate PIM, DAM, and CMS?',
    a: 'Stackcess is built as one product content operations platform. Structured product data, approved assets, localization workflows, and partner syndication stay connected instead of being stitched together across separate tools.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
}

function HeroPimMock() {
  const readinessRows = [
    {
      status: 'Active',
      name: 'Pre-Workout 30 Serve',
      assets: 'Front / Back / Hero / COA',
      score: 96,
      tone: 'bg-[rgba(22,163,74,0.14)] text-[var(--color-success)]',
      bar: 'bg-[var(--color-success)]',
    },
    {
      status: 'Review',
      name: 'Creatine Chews Sour Apple 60 Serve',
      assets: 'Front / Hero / Label',
      score: 82,
      tone: 'bg-[rgba(202,138,4,0.14)] text-[var(--color-warning)]',
      bar: 'bg-[var(--color-warning)]',
    },
    {
      status: 'Draft',
      name: 'Whey Isolate Chocolate 2kg',
      assets: 'Front / COA',
      score: 67,
      tone: 'bg-[rgba(220,38,38,0.12)] text-[var(--color-error)]',
      bar: 'bg-[var(--color-error)]',
    },
  ]

  return (
    <div className="marketing-ui-panel marketing-sheen relative ml-auto w-full max-w-[760px] overflow-hidden border border-[var(--border-subtle)] bg-[var(--color-surface)] xl:max-w-[820px] 2xl:max-w-[840px]">
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[rgba(250,249,245,0.18)] to-transparent" />
      <div className="border-b border-[var(--border-subtle)] px-5 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              Brand workspace
            </p>
            <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
              Product content, assets, and readiness from one operating view
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--text-secondary)] md:flex">
            <Search className="h-4 w-4" />
            Search products and assets
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-primary)] p-5 sm:px-6 sm:py-6">
        <div className="grid gap-3 border-b border-[var(--border-subtle)] pb-4 sm:grid-cols-3">
          {[
            ['42 active SKUs', 'Families and variants tracked'],
            ['64 approved assets', 'Mapped to product and channel slots'],
            ['87% readiness', 'Visibility across the catalog'],
          ].map(([title, detail]) => (
            <div key={title} className="rounded-2xl border border-[var(--border-subtle)] bg-white px-4 py-3">
              <p className="text-sm font-semibold text-[var(--text-primary)]">{title}</p>
              <p className="mt-1 text-xs leading-6 text-[var(--text-secondary)]">{detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-[1.1rem] border border-[var(--border-subtle)] bg-white">
          <div className="grid grid-cols-[86px_minmax(0,1.4fr)_minmax(0,1fr)_72px] gap-3 border-b border-[var(--border-subtle)] px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            <span>Status</span>
            <span>Product</span>
            <span>Assets</span>
            <span>Ready</span>
          </div>
          {readinessRows.map((row, index) => (
            <div
              key={row.name}
              className={`grid grid-cols-[86px_minmax(0,1.4fr)_minmax(0,1fr)_72px] gap-3 px-4 py-3 ${
                index < readinessRows.length - 1 ? 'border-b border-[var(--border-subtle)]' : ''
              }`}
            >
              <span className={`inline-flex h-fit w-fit rounded-full px-2.5 py-1 text-[11px] font-medium ${row.tone}`}>
                {row.status}
              </span>
              <span className="text-sm font-medium text-[var(--text-primary)]">{row.name}</span>
              <span className="text-xs text-[var(--text-secondary)]">{row.assets}</span>
              <div>
                <span className="text-xs font-semibold text-[var(--text-primary)]">{row.score}%</span>
                <div className="mt-2 h-1.5 rounded-full bg-[var(--bg-tertiary)]">
                  <div className={`h-full rounded-full ${row.bar}`} style={{ width: `${row.score}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-[var(--border-subtle)] pt-4 font-[var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
          <span>42 active SKUs</span>
          <span>64 approved assets</span>
          <span>87% avg readiness</span>
        </div>
      </div>
    </div>
  )
}

function PortalMock() {
  return (
    <div className="marketing-ui-panel overflow-hidden">
      <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] px-5 py-4 sm:px-6">
        <p className="font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Partner portal
        </p>
        <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
          Scoped delivery for distributors, retailers, and launch partners
        </p>
      </div>

      <div className="bg-[var(--bg-primary)] p-5 sm:px-6 sm:py-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ['AU Retail Core Range', '18 products, 64 assets, 12 docs', 'Updated 2 hours ago'],
            ['NZ Distributor', 'Market-scoped specs and hero assets', 'Updated today'],
            ['EU Launch Pack', 'Amazon, ecommerce, PDF exports', 'Updated yesterday'],
          ].map(([title, body, timestamp]) => (
            <div key={title} className="rounded-[1.15rem] border border-[var(--border-subtle)] bg-white p-4">
              <p className="text-sm font-semibold text-[var(--text-primary)]">{title}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{body}</p>
              <div className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                <span>{timestamp}</span>
                <span className="text-[var(--color-accent)]">View portal</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-[1.1rem] border border-[var(--border-subtle)] bg-white">
          <div className="border-b border-[var(--border-subtle)] px-4 py-3">
            <div className="flex flex-wrap gap-2 font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.16em]">
              {['Products', 'Assets', 'Documents', 'Exports'].map((tab, index) => (
                <span
                  key={tab}
                  className={`rounded-full px-2.5 py-1 ${
                    index === 1
                      ? 'bg-[var(--accent-soft)] text-[var(--color-accent)]'
                      : 'border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-muted)]'
                  }`}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          <div className="border-b border-[var(--border-subtle)] px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">Social Media - Q2 Campaign</p>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">Current social assets for retailer promotions and agency handoff</p>
              </div>
              <span className="rounded-full bg-[rgba(22,163,74,0.12)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-success)]">
                Current
              </span>
            </div>
          </div>

          <div className="grid gap-0">
            {[
              ['15s video', 'MP4', '1080x1080'],
              ['30s video', 'MP4', '1920x1080'],
              ['Static 1:1', 'PNG', '1080x1080'],
              ['Static 9:16', 'PNG', '1080x1920'],
              ['Story format', 'PNG', '1080x1920'],
            ].map(([name, format, size], index) => (
              <div
                key={name}
                className={`grid grid-cols-[minmax(0,1.3fr)_80px_110px_auto] items-center gap-3 px-4 py-3 ${
                  index < 4 ? 'border-b border-[var(--border-subtle)]' : ''
                }`}
              >
                <p className="text-sm font-medium text-[var(--text-primary)]">{name}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-secondary)]">{format}</p>
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--text-secondary)]">{size}</p>
                <span className="justify-self-end rounded-full bg-[rgba(22,163,74,0.12)] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-success)]">
                  Current
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductDetailMock() {
  return (
    <div className="marketing-ui-panel overflow-hidden">
      <div className="border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] px-5 py-4 sm:px-6">
        <p className="font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
          Product detail
        </p>
        <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
          Assets, docs, and readiness stay attached to the source record
        </p>
      </div>

      <div className="bg-[var(--bg-primary)] p-5 sm:px-6 sm:py-6">
        <div className="overflow-hidden rounded-[1.15rem] border border-[var(--border-subtle)] bg-white">
          <div className="border-b border-[var(--border-subtle)] px-4 py-3">
            <p className="text-sm font-semibold text-[var(--text-primary)]">Pre-Workout - SKU PCW-WM-30</p>
            <div className="mt-3 flex flex-wrap gap-2 font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]">
              {['Assets', 'Localization', 'Markets', 'Documents'].map((tab, index) => (
                <span
                  key={tab}
                  className={`rounded-full px-2.5 py-1 ${index === 0 ? 'bg-[var(--accent-soft)] text-[var(--color-accent)]' : 'bg-[var(--bg-primary)]'}`}
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 p-4">
            {[
              ['Front Label', 'Approved'],
              ['Back Label', 'Approved'],
              ['Hero Shot', 'Pending'],
              ['COA', 'Approved'],
            ].map(([slot, status]) => (
              <div key={slot} className="rounded-xl border border-[var(--border-subtle)] p-2.5">
                <div className="flex h-14 items-center justify-center rounded-lg bg-[var(--bg-primary)] text-[var(--text-muted)]">
                  {slot === 'COA' ? <FileText className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <p className="text-[11px] text-[var(--text-primary)]">{slot}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      status === 'Approved'
                        ? 'bg-[rgba(22,163,74,0.12)] text-[var(--color-success)]'
                        : 'bg-[rgba(202,138,4,0.12)] text-[var(--color-warning)]'
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-[1.15rem] border border-[var(--border-subtle)] bg-white px-4 py-4">
          <p className="font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Market readiness
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {([
              ['AU', true],
              ['NZ', true],
              ['DE', true],
              ['JP', false],
            ] as Array<[string, boolean]>).map(([market, ready]) => (
              <span
                key={market}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  ready ? 'bg-[rgba(22,163,74,0.12)] text-[var(--color-success)]' : 'bg-[rgba(202,138,4,0.12)] text-[var(--color-warning)]'
                }`}
              >
                {market} {ready ? 'ready' : 'pending'}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function LocalizationMock() {
  return (
    <div className="marketing-ui-panel overflow-hidden">
      <div className="grid lg:grid-cols-[1fr_1fr]">
        <div className="border-b border-[var(--border-subtle)] bg-white p-5 lg:border-b-0 lg:border-r sm:p-6">
          <p className="font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
            Source copy
          </p>
          <p className="mt-3 text-sm font-semibold text-[var(--text-primary)]">Pre-Workout product body copy</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
            <p>High-stim pre-workout with caffeine, beta-alanine, and citrulline for training sessions that need sharper output.</p>
            <p>Supports launch copy, pack language, and retailer-ready descriptions from one governed source record.</p>
          </div>
        </div>
        <div className="bg-[var(--bg-primary)] p-5 sm:p-6">
          <div className="flex flex-wrap gap-2 font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.16em]">
            {['DE', 'FR', 'JP'].map((locale, index) => (
              <span
                key={locale}
                className={`rounded-full px-2.5 py-1 ${index === 0 ? 'bg-[var(--accent-soft)] text-[var(--color-accent)]' : 'bg-white text-[var(--text-muted)] border border-[var(--border-subtle)]'}`}
              >
                {locale}
              </span>
            ))}
          </div>
          <div className="mt-4 rounded-[1.1rem] border border-[var(--border-subtle)] bg-white p-4">
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-accent)]">
                Terminology locked
              </span>
              {['Creatine Monohydrate', 'Pre-Workout'].map((term) => (
                <span key={term} className="rounded-full border border-[var(--border-subtle)] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                  {term}
                </span>
              ))}
            </div>
            <div className="space-y-3 text-sm leading-7 text-[var(--text-secondary)]">
              <p>Leistungsstarke Pre-Workout-Formel mit klar gesteuerter Terminologie, claims-sensitiver Sprache und marktspezifischen Hinweisen.</p>
              <p>Pack copy, retailer descriptions, and compliance notes stay aligned across each locale instead of being rebuilt from scratch.</p>
            </div>
            <p className="mt-4 text-[13px] leading-6 text-[var(--text-muted)]">
              Adapted content should be reviewed by your team before publishing to any market.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: 'Home', url: siteUrl }])

  const registerByPlan: Record<HomePlanId, string> = {
    free: buildAppAuthUrl('register', {
      planInterest: 'free',
      postLoginRedirectPath: '/onboarding?create=1&origin=marketing_home_free',
    }),
    starter: buildAppAuthUrl('register', {
      planInterest: 'starter',
      postLoginRedirectPath: '/onboarding?create=1&origin=marketing_home_starter',
    }),
    growth: buildAppAuthUrl('register', {
      planInterest: 'growth',
      postLoginRedirectPath: '/onboarding?create=1&origin=marketing_home_growth',
    }),
    scale: buildAppAuthUrl('register', {
      planInterest: 'scale',
      postLoginRedirectPath: '/onboarding?create=1&origin=marketing_home_scale',
    }),
  }

  const trackRegisterRedirect = (section: string, ctaLabel: string, planInterest: string) => {
    trackMarketingEvent('redirect_to_register', { page: 'home', section, ctaLabel, planInterest })
  }

  const describeCoreLimits = (plan: VisiblePlan) => {
    const summary = [
      `${formatBillingLimit(plan.activeSkuLimit)} active SKUs`,
      `${formatBillingGigabytes(plan.storageLimitGb)} storage`,
      `${formatBillingLimit(plan.internalUserLimit)} internal users`,
      `${formatBillingLimit(plan.partnerInviteLimit)} partner invites`,
      plan.deeplTotalCharLimit > 0
        ? `${formatDeepLUsage(plan.deeplTotalCharLimit)} translated characters / month`
        : 'Translation not included',
    ]

    return `${summary.join(', ')}.`
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MarketingFunnelTracker page="home" trackScroll />

      <div className="overflow-hidden">
        <section className="-mt-14 overflow-hidden px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-30 lg:pt-32 xl:pt-34">
          <div className="mx-auto max-w-[1480px]">
            <div className="grid gap-12 xl:grid-cols-[minmax(0,520px)_minmax(0,1fr)] xl:items-center xl:gap-8">
              <div className="marketing-reveal">
                <p className="marketing-kicker">Product Content Operations</p>
                <h1 className="mt-8 max-w-[680px] pb-6 text-[3rem] font-semibold tracking-[-0.02em] text-[var(--text-primary)] !leading-[1.02] sm:text-[4rem] lg:text-[4.4rem] xl:max-w-none xl:text-[4.9rem] 2xl:text-[5.45rem]">
                  <span className="marketing-hero-stagger-word" style={{ animationDelay: '0ms' }}>Your</span>{' '}
                  <span className="marketing-hero-stagger-word" style={{ animationDelay: '80ms' }}>partners</span>{' '}
                  <span className="marketing-hero-stagger-word" style={{ animationDelay: '160ms' }}>are</span>{' '}
                  <span className="marketing-hero-stagger-word" style={{ animationDelay: '240ms' }}>working</span>{' '}
                  <span className="marketing-hero-stagger-word" style={{ animationDelay: '320ms' }}>from</span>
                  <br />
                  <span className="marketing-hero-stagger-word marketing-hero-word text-[1.04em]" style={{ animationDelay: '400ms' }}>content you&apos;ve already updated.</span>
                </h1>
                <p className="marketing-section-copy-lg max-w-[620px] text-[var(--text-secondary)] xl:max-w-[520px]">
                  Stackcess gives supplement brands a single system for product data, approved assets,
                  compliance documents, and partner delivery so your content keeps pace with your distribution.
                </p>

                <div className="mt-12 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={registerByPlan.free}
                    onClick={() => {
                      trackMarketingEvent('hero_cta_click', {
                        page: 'home',
                        section: 'hero',
                        ctaLabel: 'Create Free Account',
                        planInterest: 'free',
                      })
                      trackRegisterRedirect('hero', 'Create Free Account', 'free')
                    }}
                    className="marketing-primary-button group inline-flex w-full items-center justify-center gap-2 border border-[var(--color-primary)] bg-[var(--color-primary)] px-7 py-3.5 text-sm font-bold transition-colors hover:bg-[var(--color-primary-hover)] sm:w-auto"
                  >
                    Create Free Account
                    <ArrowRight size={15} className="marketing-button-arrow" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex w-full items-center justify-center rounded-lg border border-[var(--border-default)] bg-transparent px-7 py-3.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--color-accent)] hover:bg-white sm:w-auto"
                  >
                    Explore the platform
                  </Link>
                </div>

                <div className="mt-14 max-w-[620px] border-t border-[var(--border-subtle)] pt-5 xl:max-w-[520px]">
                  <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                    {[
                      ['Variant-heavy catalogs', 'Claims, flavors, pack sizes, and channel slots stay attached to the source record.'],
                      ['Market-aware delivery', 'Localization, compliance notes, and partner outputs stay in the same workflow.'],
                    ].map(([title, body]) => (
                      <div key={title}>
                        <p className="font-[var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.12em] text-[var(--color-accent)]">
                          {title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="marketing-float marketing-reveal relative 2xl:-mr-24">
                <HeroPimMock />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg-tertiary)] px-4 py-18 sm:px-6 sm:py-22">
          <div className="mx-auto max-w-[1480px]">
            <div className="mb-8 sm:mb-10">
              <p className="font-[var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                What this replaces
              </p>
            </div>
            <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
              {problemStatements.map((statement) => (
                <div
                  key={statement}
                  className="min-h-[188px] border border-[var(--border-default)] bg-[var(--bg-primary)] p-6 shadow-[0_10px_24px_rgba(26,24,20,0.04)]"
                >
                  <p className="marketing-mono text-[0.95rem] leading-[1.9] text-[var(--text-primary)]">
                    {statement}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="platform" className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start sm:gap-14">
            <div>
              <p className="marketing-kicker">Product Catalog</p>
              <h2 className="marketing-section-title mt-6 pb-6 text-[var(--color-foreground)] !leading-[1.08]">
                Every SKU. Every variant. Every market.
                <br />
                One source of truth.
              </h2>
              <p className="marketing-section-copy max-w-[480px] text-[var(--text-secondary)]">
                Supplement catalogs are not simple. Flavors, pack sizes, market-specific formulas,
                and channel-specific claims multiply fast. Stackcess manages the structure,
                approved assets, and readiness status so your team stops hunting for the current version.
              </p>
            </div>
            <div className="grid gap-11">
              <div className="grid gap-0 border-t border-[var(--border-subtle)]">
                {[
                  ['Structured catalog', 'Families, variants, pack sizes, and field completeness tracked in one view.'],
                  ['Asset governance', 'Labels, pack shots, COAs, and campaign files linked to the right product.'],
                  ['Readiness visibility', 'See what is complete, what is missing, and what is ready to ship.'],
                ].map(([title, detail], index) => (
                  <div
                    key={title}
                    className={`grid gap-5 py-7 md:grid-cols-[4.5rem_1fr_1.05fr] sm:gap-6 sm:py-8 ${
                      index < 2 ? 'border-b border-[var(--border-subtle)]' : ''
                    }`}
                  >
                    <span className="font-[var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                      0{index + 1}
                    </span>
                    <h3 className="text-[1.78rem] font-semibold leading-[1.1] text-[var(--color-foreground)] sm:text-[1.92rem]">{title}</h3>
                    <p className="marketing-detail-copy max-w-[28rem] text-[var(--color-foreground-secondary)]">{detail}</p>
                  </div>
                ))}
              </div>
              <div className="marketing-reveal marketing-reveal-delay-1">
                <ProductDetailMock />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg-secondary)] px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-start sm:gap-14">
            <div>
              <p className="marketing-kicker">AI Localization</p>
              <h2 className="marketing-section-title mt-6 pb-6 text-[var(--color-foreground)] !leading-[1.08]">
                Market-ready content.
                <br />
                Not another translation spreadsheet.
              </h2>
              <p className="marketing-section-copy max-w-[480px] text-[var(--text-secondary)]">
                Supplement content is not generic text. Ingredient names, claims language,
                and regulatory guidance vary by market. Stackcess adapts product content with
                market-aware AI while keeping terminology, brand voice, and compliance notes consistent.
              </p>
            </div>
            <div className="grid gap-11">
              <div className="grid gap-0 border-t border-[var(--border-subtle)]">
                {[
                  ['Governed terminology', 'Ingredient names and claims stay consistent, not translated differently by every tool.'],
                  ['Market-aware guidance', 'Regulatory context for EU Novel Food, Amazon JP, and AU TGA sits inside the workflow.'],
                  ["Reuse, don't rebuild", 'Structured data and approved assets carry forward into every market adaptation.'],
                ].map(([title, detail], index) => (
                  <div
                    key={title}
                    className={`grid gap-5 py-7 md:grid-cols-[4.5rem_1fr_1.05fr] sm:gap-6 sm:py-8 ${
                      index < 2 ? 'border-b border-[var(--border-subtle)]' : ''
                    }`}
                  >
                    <span className="font-[var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                      0{index + 1}
                    </span>
                    <h3 className="text-[1.78rem] font-semibold leading-[1.1] text-[var(--color-foreground)] sm:text-[1.92rem]">{title}</h3>
                    <p className="marketing-detail-copy max-w-[28rem] text-[var(--color-foreground-secondary)]">{detail}</p>
                  </div>
                ))}
              </div>
              <div className="marketing-reveal marketing-reveal-delay-1">
                <LocalizationMock />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start sm:gap-14">
            <div>
              <p className="marketing-kicker">Partner Syndication</p>
              <h2 className="marketing-section-title mt-6 pb-6 text-[var(--color-foreground)] !leading-[1.08]">
                Your partners get what they need.
                <br />
                Without emailing your team to get it.
              </h2>
              <p className="marketing-section-copy max-w-[480px] text-[var(--text-secondary)]">
                Retailers, distributors, and agencies do not just need files at launch. A retailer running
                a promotion needs current social assets. A distributor onboarding your range needs compliant
                product data and renders. An agency managing your Amazon store needs updated lifestyle images
                for the next campaign. Stackcess gives every partner a scoped portal without a request going through your inbox.
              </p>
            </div>
            <div className="grid gap-11">
              <div className="grid gap-0 border-t border-[var(--border-subtle)]">
                {[
                  ['Launch onboarding', 'New partners get a complete, structured product pack without your team assembling it from scratch each time.'],
                  ['Ongoing asset access', 'Retailers and agencies pull current social content, renders, and campaign files directly from their portal.'],
                  ['Always current', 'When assets update, partners see the new version automatically. No re-send required.'],
                ].map(([title, detail], index) => (
                  <div
                    key={title}
                    className={`grid gap-5 py-7 md:grid-cols-[4.5rem_1fr_1.05fr] sm:gap-6 sm:py-8 ${
                      index < 2 ? 'border-b border-[var(--border-subtle)]' : ''
                    }`}
                  >
                    <span className="font-[var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                      0{index + 1}
                    </span>
                    <h3 className="text-[1.78rem] font-semibold leading-[1.1] text-[var(--color-foreground)] sm:text-[1.92rem]">{title}</h3>
                    <p className="marketing-detail-copy max-w-[28rem] text-[var(--color-foreground-secondary)]">{detail}</p>
                  </div>
                ))}
              </div>
              <div className="marketing-reveal marketing-reveal-delay-1">
                <PortalMock />
              </div>
            </div>
          </div>
        </section>

        <section className="marketing-diagonal-texture bg-[var(--bg-tertiary)] px-4 py-18 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-[720px] text-center">
            <p className="marketing-kicker">Origin</p>
            <h2 className="marketing-section-title mt-6 text-[var(--color-foreground)]">
              We didn&apos;t research this problem. We had it
            </h2>
            <div className="mt-10 space-y-6 text-left">
              <p className="marketing-section-copy text-[var(--text-secondary)]">
                Stackcess started from managing product content for a sports nutrition brand selling across multiple
                markets through Amazon, distributors, and retail partners. Every launch had the same pattern:
                right product, right formula, wrong assets.
              </p>
              <p className="marketing-section-copy text-[var(--text-secondary)]">
                Outdated labels. Missing COAs. Partners working from old links. There was no tool built for how
                supplement brands actually operate. So we built one.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg-primary)] px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="max-w-3xl">
              <p className="marketing-kicker">Comparison</p>
              <h2 className="marketing-section-title mt-6 text-[var(--color-foreground)]">
                One operating model instead of three disconnected tools.
              </h2>
            </div>

            <div className="mt-14 overflow-x-auto rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--bg-primary)] sm:mt-16">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-tertiary)]">
                    <th className="px-4 py-4 text-left font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      What teams need
                    </th>
                    <th className="px-4 py-4 text-left font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      Typical point tools
                    </th>
                    <th className="px-4 py-4 text-left font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
                      Stackcess
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Structured product data and variants', 'Usually handled in a PIM, separated from content delivery', 'Managed in the same workflow as assets, localization, and syndication'],
                    ['Approved assets with governance', 'Usually handled in a DAM, disconnected from product readiness', 'Linked to labels, pack shots, documents, channels, and partner outputs without duplication'],
                    ['Multi-market content adaptation', 'Often pushed into documents, agencies, or manual rewrites', 'AI-assisted localization with governed terminology, claims, and market-aware guidance'],
                    ['Partner-ready distribution', 'Usually handled with exports, email, and file sharing', 'Controlled portal views and scoped syndication from one source record'],
                  ].map(([need, pointTool, stackcess], index) => (
                    <tr key={need} className={index < 3 ? 'border-b border-[var(--border-subtle)]' : ''}>
                      <td className="px-4 py-6 text-[1rem] font-semibold leading-[1.45] text-[var(--color-foreground)] sm:px-5 sm:py-7 sm:text-[1.05rem]">{need}</td>
                      <td className="px-4 py-6 sm:px-5 sm:py-7">
                        <span className="mb-3 inline-flex rounded-full bg-[rgba(202,138,4,0.12)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-warning)]">
                          Separate tool
                        </span>
                        <p className="text-[1rem] leading-[1.9] text-[var(--color-foreground-muted)] sm:text-[1.05rem]">{pointTool}</p>
                      </td>
                      <td className="px-4 py-6 sm:px-5 sm:py-7">
                        <span className="mb-3 inline-flex rounded-full bg-[rgba(22,163,74,0.12)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-success)]">
                          Included
                        </span>
                        <p className="text-[1rem] leading-[1.9] text-[var(--color-foreground-secondary)] sm:text-[1.05rem]">{stackcess}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="max-w-3xl">
              <p className="marketing-kicker">Pricing</p>
              <h2 className="marketing-section-title mt-6 text-[var(--color-foreground)]">
                Start free. Scale when it makes sense.
              </h2>
              <p className="marketing-section-copy mt-6 text-[var(--text-secondary)]">
                Every plan includes the full platform. Pricing expands with operational volume.
              </p>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-4">
              {plans.map((plan) => {
                const ctaLabel = plan.id === 'free' ? 'Create Free Account' : `Start ${plan.name}`
                const isGrowth = plan.id === 'growth'
                const isFree = plan.id === 'free'
                return (
                  <div
                    key={plan.id}
                    className={`relative flex h-full flex-col rounded-[1.25rem] border px-5 py-6 ${
                      isFree
                        ? 'border-[var(--border-subtle)] bg-[var(--bg-secondary)]'
                        : 'border-[var(--border-subtle)] bg-white'
                    } ${isGrowth ? 'border-t-[3px] border-t-[var(--color-accent)]' : ''}`}
                  >
                    {isGrowth ? (
                      <span className="mb-4 inline-flex w-fit rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--color-accent)]">
                        Most Popular
                      </span>
                    ) : null}
                    <div className="border-b border-[var(--border-subtle)] pb-5">
                      <p className="text-base font-semibold text-[var(--text-primary)]">{plan.name}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{homepagePlanDescriptors[plan.id]}</p>
                      <p className="mt-5 text-[2rem] font-semibold leading-none text-[var(--text-primary)]">
                        ${plan.price}
                        <span className="ml-1 text-sm font-normal text-[var(--text-muted)]">/month</span>
                      </p>
                    </div>
                    <p className="mt-5 flex-1 text-sm leading-7 text-[var(--text-secondary)]">
                      {describeCoreLimits(plan)}
                    </p>
                    <Link
                      href={registerByPlan[plan.id]}
                      onClick={() => {
                        trackMarketingEvent('plan_cta_click', {
                          page: 'home',
                          section: 'pricing_preview',
                          ctaLabel,
                          planInterest: plan.id,
                        })
                        trackRegisterRedirect('pricing_preview', ctaLabel, plan.id)
                      }}
                        className={`mt-6 inline-flex items-center justify-center rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${
                        isGrowth
                          ? 'marketing-primary-button border-[var(--color-primary)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]'
                          : 'border-[var(--border-default)] bg-transparent text-[var(--text-primary)] hover:border-[var(--color-accent)] hover:bg-[var(--bg-primary)]'
                      }`}
                    >
                      {ctaLabel}
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="marketing-kicker mx-auto w-fit">FAQ</p>
            <h2 className="marketing-section-title mt-6 text-center text-[var(--color-foreground)]">
              Before you sign up
            </h2>
            <div className="mt-14 border-y border-[var(--border-subtle)] sm:mt-16">
              {faqs.map((item, index) => {
                const isOpen = openFaq === index
                return (
                  <button
                    key={item.q}
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className={`block w-full py-7 text-left sm:py-8 ${
                      index < faqs.length - 1 ? 'border-b border-[var(--border-subtle)]' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-6">
                      <h3 className="text-lg font-semibold leading-[1.3] text-[var(--color-foreground)]">{item.q}</h3>
                      <span className="mt-0.5 text-xl leading-none text-[var(--color-accent)]">
                        {isOpen ? '-' : '+'}
                      </span>
                    </div>
                    {isOpen ? (
                      <p className="marketing-detail-copy mt-4 max-w-3xl text-[var(--color-foreground-muted)]">{item.a}</p>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg-dark)] px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-[var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Get Started
              </p>
              <h2 className="mt-5 max-w-4xl text-[2.6rem] font-semibold leading-[0.96] !text-[var(--bg-primary)] sm:text-[3.7rem] lg:text-[4.5rem]">
                Start with a free account.
              </h2>
              <p className="marketing-section-copy mt-8 max-w-2xl text-[var(--text-muted)]">
                Organize your supplement catalog, localize faster, and deliver approved assets to every partner from one workspace.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Link
                href={registerByPlan.free}
                onClick={() => {
                  trackMarketingEvent('hero_cta_click', {
                    page: 'home',
                    section: 'final_cta',
                    ctaLabel: 'Create Free Account',
                    planInterest: 'free',
                  })
                  trackRegisterRedirect('final_cta', 'Create Free Account', 'free')
                }}
                className="inline-flex items-center justify-center rounded-lg bg-[#c8f135] px-7 py-3.5 text-sm font-semibold text-[var(--bg-dark)] transition-colors hover:bg-[#d2f657]"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
