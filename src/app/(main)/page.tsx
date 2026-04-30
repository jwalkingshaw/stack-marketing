'use client'

import Link from 'next/link'
import { ArrowRight, FileText, ImageIcon, Search } from 'lucide-react'
import MarketingFunnelTracker from '@/components/MarketingFunnelTracker'
import { buildAppAuthUrl } from '@/lib/app-links'
import {
  formatBillingGigabytes,
  formatBillingLimit,
  formatDeepLUsage,
  formatUploadBytes,
} from '@/lib/billing-display'
import { trackMarketingEvent } from '@/lib/marketing-analytics'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { BILLING_PLAN_CATALOG, shouldShowMaxUploadInMarketing } from '@/lib/billing-catalog'

type HomePlanId = 'free' | 'starter' | 'growth' | 'scale'
type VisiblePlan = (typeof BILLING_PLAN_CATALOG)[number] & { id: HomePlanId }

const plans = BILLING_PLAN_CATALOG.filter(
  (plan): plan is VisiblePlan =>
    plan.id === 'free' || plan.id === 'starter' || plan.id === 'growth' || plan.id === 'scale'
)

const proof = [
  'Launches are one moment. The real workload is retailer refreshes, reformulations, and campaign swaps.',
  'Partners need a dedicated portal with current files and product data, not another resend request.',
  'Your catalog, partner views, and product detail pages should all reflect the same product state.',
]

const faqs = [
  {
    q: 'Do you charge per seat?',
    a: 'No. Stackcess is billed per workspace. Limits cover active SKUs, storage, bandwidth, internal users, partner invites, and translation volume.',
  },
  {
    q: 'Can Stackcess prepare content for Amazon, ecommerce, and other channels?',
    a: 'Yes. Stackcess stores product data once, then helps structure exports and output profiles for channels like Amazon, ecommerce, retail, and partner delivery.',
  },
  {
    q: 'Can we manage product content for multiple markets and languages?',
    a: 'Yes. Stackcess manages product content at the market and language level from one core record. Partners and channels receive the version scoped to their region and locale, without the brand rebuilding content separately for each.',
  },
]

function HeroPimMock() {
  return (
    <div className="marketing-dark-panel marketing-sheen overflow-hidden border border-white/10">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-white/45">
              Brand workspace
            </p>
            <p className="mt-1 text-sm font-medium text-white">Structured product catalog with asset and readiness context</p>
          </div>
          <div className="hidden items-center gap-2 border border-white/10 px-3 py-2 text-sm text-white/55 md:flex">
            <Search className="h-4 w-4" />
            Search products and assets
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="grid gap-4 border-b border-white/10 pb-4 sm:grid-cols-3">
          {[
            ['42 active SKUs', 'Families and variants tracked'],
            ['64 approved assets', 'Mapped to product slots'],
            ['87% completeness', 'Visibility across the catalog'],
          ].map(([title, detail]) => (
            <div key={title}>
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="mt-1 text-xs leading-6 text-white/55">{detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 overflow-hidden border border-white/10 bg-white/[0.03]">
          <div className="grid grid-cols-[84px_1.4fr_1fr_66px] gap-3 border-b border-white/10 px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-white/45">
            <span>Status</span>
            <span>Product</span>
            <span>Assets</span>
            <span>Score</span>
          </div>
          {[
            ['Active', 'Nitro Surge 30 Serve', 'Front / Back / Hero / COA', '96'],
            ['Review', 'Hydrate Plus Orange', 'Front / Hero / Label', '82'],
            ['Draft', 'Daily Greens Travel', 'Front / COA', '67'],
          ].map(([status, name, assets, score], index) => (
            <div
              key={name}
              className={`grid grid-cols-[84px_1.4fr_1fr_66px] gap-3 px-4 py-3 ${
                index < 2 ? 'border-b border-white/10' : ''
              }`}
            >
              <span className="text-[11px] text-white/60">{status}</span>
              <span className="text-sm font-medium text-white">{name}</span>
              <span className="text-xs text-white/55">{assets}</span>
              <span className="text-xs font-semibold text-[#a8bee5]">{score}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PortalMock() {
  return (
    <div className="marketing-dark-panel overflow-hidden border border-white/10">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-white/45">
          Retailer and partner portal
        </p>
        <p className="mt-1 text-sm font-medium text-white">Dedicated views for retailers, distributors, and agencies</p>
      </div>

      <div className="p-5">
        <div className="grid gap-3 border-b border-white/10 pb-4">
          {[
            ['AU Retail Core Range', '18 products, 64 assets, 12 docs'],
            ['NZ Distributor', 'Market-scoped specs and hero assets'],
            ['Campaign Agency', 'Approved exports, launch assets, and campaign kits'],
          ].map(([title, body], index) => (
            <div key={title} className={index < 2 ? 'border-b border-white/10 pb-3' : ''}>
              <p className="text-sm font-medium text-white">{title}</p>
              <p className="mt-1 text-xs leading-6 text-white/55">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ['Products', 'Current assortment'],
            ['Assets', 'Approved files only'],
            ['Documents', 'COA, specs, and regulatory docs'],
            ['Exports', 'Amazon, ecommerce, PDF'],
          ].map(([label, value]) => (
            <div key={label} className="border border-white/10 p-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">{label}</p>
              <p className="mt-2 text-sm font-medium text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductDetailMock() {
  return (
    <div className="marketing-dark-panel overflow-hidden border border-white/10">
      <div className="border-b border-white/10 px-5 py-4">
        <p className="font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-white/45">
          Product detail
        </p>
        <p className="mt-1 text-sm font-medium text-white">Assets, docs, and readiness stay with the product record</p>
      </div>

      <div className="p-5">
        <div className="border border-white/10">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-sm font-semibold text-white">Hydrate Plus Orange</p>
            <p className="mt-1 text-xs text-white/55">SKU HYD-ORG-30 • AU Retail Core Range</p>
          </div>
          <div className="grid grid-cols-2 gap-2 p-4">
            {['Front', 'Back', 'Hero', 'COA'].map((slot) => (
              <div key={slot} className="border border-white/10 p-2.5">
                <div className="flex h-14 items-center justify-center bg-white/[0.04] text-white/35">
                  {slot === 'COA' ? <FileText className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
                </div>
                <p className="mt-2 text-[11px] text-white/65">{slot}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-2">
          {[
            ['AU retail', 'Ready for portal export'],
            ['Localization', 'EN complete, FR in progress'],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs font-semibold text-white">{label}</p>
              <p className="mt-1 text-xs leading-6 text-white/55">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: 'Home', url: siteUrl }])
  const salesHref = 'mailto:sales@stackcess.com?subject=Stackcess%20Demo%20Request'

  const registerByPlan: Record<HomePlanId, string> = {
    free: buildAppAuthUrl('register', { planInterest: 'free', postLoginRedirectPath: '/onboarding?create=1&origin=marketing_home_free' }),
    starter: buildAppAuthUrl('register', { planInterest: 'starter', postLoginRedirectPath: '/onboarding?create=1&origin=marketing_home_starter' }),
    growth: buildAppAuthUrl('register', { planInterest: 'growth', postLoginRedirectPath: '/onboarding?create=1&origin=marketing_home_growth' }),
    scale: buildAppAuthUrl('register', { planInterest: 'scale', postLoginRedirectPath: '/onboarding?create=1&origin=marketing_home_scale' }),
  }

  const trackRegisterRedirect = (section: string, ctaLabel: string, planInterest: string) => {
    trackMarketingEvent('redirect_to_register', { page: 'home', section, ctaLabel, planInterest })
  }

  const describeCoreLimits = (plan: VisiblePlan) => {
    const summary = [
      `${formatBillingLimit(plan.activeSkuLimit)} active SKUs`,
      `${formatBillingGigabytes(plan.storageLimitGb)} storage`,
      `${formatBillingGigabytes(plan.deliveryBandwidthLimitGb)} bandwidth`,
      `${formatBillingLimit(plan.partnerInviteLimit)} partner invites`,
      plan.deeplTotalCharLimit > 0
        ? `${formatDeepLUsage(plan.deeplTotalCharLimit)} translation volume`
        : 'Translation not included',
    ]

    if (shouldShowMaxUploadInMarketing(plan.id)) {
      summary.push(`${formatUploadBytes(plan.maxUploadBytes)} upload`)
    }

    return `${summary.join(', ')}.`
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MarketingFunnelTracker page="home" trackScroll />

      <div className="overflow-hidden">
        <section className="-mt-16 px-4 pb-20 pt-36 sm:px-6 sm:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center xl:gap-14">
              <div className="marketing-reveal lg:col-span-5">
                <p className="marketing-kicker">Product Content System</p>
                <h1 className="mt-6 max-w-3xl text-[3rem] font-semibold leading-[0.92] text-[var(--color-foreground)] sm:text-[3.9rem] lg:text-[4.7rem]">
                  Run product content, assets, and partner delivery from one <span className="marketing-hero-word">system</span>.
                </h1>
                <p className="mt-7 max-w-xl text-base leading-[1.9] text-[var(--color-foreground-secondary)] sm:text-lg">
                  Stackcess gives supplement brands one source of truth for product data and assets, a built-in portal for retailers and distributors, and destination-ready output for Amazon, ecommerce, and partner delivery — all from the same core record.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={registerByPlan.free}
                    onClick={() => {
                      trackMarketingEvent('hero_cta_click', { page: 'home', section: 'hero', ctaLabel: 'Start Free', planInterest: 'free' })
                      trackRegisterRedirect('hero', 'Start Free', 'free')
                    }}
                    className="marketing-primary-button inline-flex w-full items-center justify-center gap-2 border border-[var(--color-primary)] bg-[var(--color-primary)] px-7 py-3.5 text-sm font-bold transition-colors hover:bg-[var(--color-primary-hover)] sm:w-auto"
                  >
                    Start Free
                    <ArrowRight size={15} />
                  </Link>
                  <a href={salesHref} className="inline-flex w-full items-center justify-center border border-[var(--color-border-strong)] px-7 py-3.5 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)] sm:w-auto">
                    Talk to sales
                  </a>
                </div>

                <div className="mt-10 grid gap-5 border-t border-[var(--color-border)] pt-6 text-sm">
                  {proof.map((item, index) => (
                    <div key={item} className="grid gap-3 md:grid-cols-[3rem_1fr]">
                      <span className="font-[var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]">0{index + 1}</span>
                      <p className="leading-[1.9] text-[var(--color-foreground-secondary)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="marketing-float marketing-reveal lg:col-span-7">
                <HeroPimMock />
              </div>
            </div>

            <div className="marketing-reveal marketing-reveal-delay-3 mt-14 grid gap-6 border-t border-[var(--color-border)] pt-6 md:grid-cols-4">
              {[
                ['Keep one current catalog', 'Products, assets, and docs stay aligned in one place.'],
                ['Give partners a real portal', 'Retailers and agencies pull what they need without chasing your team for updates.'],
                ['Build for each output channel', 'Structure exports and profiles for Amazon, ecommerce, retail, and partner delivery.'],
                ['Know what is ready', 'Check completeness and readiness across the catalog before exporting or sharing anything.'],
              ].map(([value, label]) => (
                <div key={value}>
                  <p className="text-2xl font-semibold text-[var(--color-foreground)]">{value}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--color-foreground-muted)]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[rgba(255,255,255,0.62)] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <p className="marketing-kicker">Retailer And Partner Portal</p>
              <h2 className="mt-5 text-4xl font-semibold leading-[0.95] text-[var(--color-foreground)] sm:text-5xl">
                Share product content through a dedicated portal your partners can actually use.
              </h2>
            </div>
            <div className="grid gap-6 border-t border-[var(--color-border)] pt-6">
              <p className="max-w-3xl text-base leading-[1.9] text-[var(--color-foreground-secondary)]">
                Brands need more than a file dump. Stackcess gives retailers, distributors, and agencies a dedicated
                portal where they can access current product data, approved assets, and supporting documents in the
                formats they need.
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  ['Dedicated partner views', 'Give each partner a clear working space instead of sending mixed folders and one-off links.'],
                  ['Current content on demand', 'Partners pull the latest files, specs, and exports without chasing your team for updates.'],
                  ['Scoped access per partner', 'Control exactly what each retailer, distributor, or agency can see — and in the destination format they need.'],
                ].map(([title, detail]) => (
                  <div key={title}>
                    <p className="text-sm font-semibold text-[var(--color-foreground)]">{title}</p>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-foreground-muted)]">{detail}</p>
                  </div>
                ))}
              </div>
              <div className="marketing-reveal marketing-reveal-delay-1">
                <PortalMock />
              </div>
            </div>
          </div>
        </section>

        <section id="product-workflows" className="bg-[rgba(255,255,255,0.72)] px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="marketing-kicker">Built From The Product</p>
              <h2 className="mt-5 text-4xl font-semibold leading-[0.95] text-[var(--color-foreground)] sm:text-5xl">
                Manage product content once, then deliver the right version to every channel and partner.
              </h2>
            </div>
            <div className="grid gap-8">
              <div className="grid gap-0 border-t border-[var(--color-border)]">
                {[
                ['Structured product catalog', 'Families, variants, assets, and completeness stay visible in one operational grid.'],
                  ['One partner workspace across shared brands', 'Partners can view all brand content shared with them in one space, then open the products, assets, and updates that matter.'],
                  ['Product detail and media context', 'Assets, docs, readiness, and market detail stay attached to the record.'],
                  ['Output profiles and exports', 'Store product data once, then shape it for Amazon, ecommerce, retail, and partner delivery.'],
                ].map(([title, detail], index) => (
                  <div key={title} className={`grid gap-5 py-7 md:grid-cols-[4.5rem_1fr_1.05fr] ${index < 3 ? 'border-b border-[var(--color-border)]' : ''}`}>
                    <span className="font-[var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]">0{index + 1}</span>
                    <h3 className="text-2xl font-semibold text-[var(--color-foreground)]">{title}</h3>
                    <p className="text-sm leading-[1.9] text-[var(--color-foreground-secondary)] sm:text-base">{detail}</p>
                  </div>
                ))}
              </div>
              <div className="marketing-reveal marketing-reveal-delay-1">
                <ProductDetailMock />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 border-t border-[var(--color-border)] pt-8 lg:grid-cols-[0.74fr_1.26fr]">
            <div>
              <p className="marketing-kicker">Pricing Preview</p>
              <h2 className="mt-5 text-4xl font-semibold leading-[0.95] text-[var(--color-foreground)] sm:text-5xl">
                Every paid plan includes the platform. Pricing expands with operational volume.
              </h2>
            </div>

            <div className="overflow-x-auto border-y border-[var(--color-border)] bg-[rgba(255,255,255,0.5)]">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="px-4 py-4 text-left font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">Plan</th>
                    <th className="px-4 py-4 text-left font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">Price</th>
                    <th className="px-4 py-4 text-left font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">Core limits</th>
                    <th className="px-4 py-4 text-right font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => {
                    const ctaLabel = plan.id === 'free' ? 'Start Free' : `Start ${plan.name}`
                    return (
                      <tr key={plan.id} className="border-b border-[var(--color-border)] last:border-b-0">
                        <td className="px-4 py-5">
                          <p className="text-base font-semibold text-[var(--color-foreground)]">{plan.name}</p>
                          <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">{plan.description}</p>
                        </td>
                        <td className="px-4 py-5 text-xl font-semibold text-[var(--color-foreground)]">
                          ${plan.price}<span className="ml-1 text-sm font-normal text-[var(--color-foreground-muted)]">/month</span>
                        </td>
                        <td className="px-4 py-5 text-sm leading-[1.8] text-[var(--color-foreground-secondary)]">
                          {describeCoreLimits(plan)}
                        </td>
                        <td className="px-4 py-5 text-right">
                          <Link
                            href={registerByPlan[plan.id]}
                            onClick={() => {
                              trackMarketingEvent('plan_cta_click', { page: 'home', section: 'pricing_preview', ctaLabel, planInterest: plan.id })
                              trackRegisterRedirect('pricing_preview', ctaLabel, plan.id)
                            }}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent)]"
                          >
                            {ctaLabel}
                            <ArrowRight size={14} />
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <p className="marketing-kicker mx-auto w-fit">FAQ</p>
            <h2 className="mt-5 text-center text-4xl font-semibold leading-[0.95] text-[var(--color-foreground)] sm:text-5xl">Before you sign up</h2>
            <div className="mt-12 border-y border-[var(--color-border)]">
              {faqs.map((item, index) => (
                <div key={item.q} className={`py-6 ${index < faqs.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}>
                  <h3 className="text-base font-semibold text-[var(--color-foreground)]">{item.q}</h3>
                  <p className="mt-2 text-sm leading-[1.9] text-[var(--color-foreground-muted)]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-28 pt-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-10 border-t border-[var(--color-border)] pt-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="marketing-kicker">Get Started</p>
              <h2 className="mt-5 max-w-4xl text-4xl font-semibold leading-[0.95] text-[var(--color-foreground)] sm:text-5xl lg:text-6xl">
                Replace the spreadsheet, folder, and resend loop with one product content system.
              </h2>
            </div>
            <div className="flex flex-col gap-3 lg:items-end">
              <Link
                href={registerByPlan.free}
                onClick={() => {
                  trackMarketingEvent('hero_cta_click', { page: 'home', section: 'final_cta', ctaLabel: 'Start Free', planInterest: 'free' })
                  trackRegisterRedirect('final_cta', 'Start Free', 'free')
                }}
                className="marketing-primary-button inline-flex w-full items-center justify-center gap-2 border border-[var(--color-primary)] bg-[var(--color-primary)] px-8 py-4 text-base font-bold transition-colors hover:bg-[var(--color-primary-hover)] lg:w-auto"
              >
                Start Free
                <ArrowRight size={17} />
              </Link>
              <a href={salesHref} className="inline-flex w-full items-center justify-center border border-[var(--color-border-strong)] px-8 py-4 text-base font-semibold text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)] lg:w-auto">
                Talk to sales
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
