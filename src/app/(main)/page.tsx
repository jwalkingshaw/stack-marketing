'use client'

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

const proof = [
  'Built for variant-heavy supplement catalogs with claims, flavors, pack sizes, and channel-specific assets.',
  'Adapt content for each market with AI while keeping terminology, labels, and compliance guidance aligned.',
  'Give retailers, distributors, and agencies a controlled portal instead of another resend request.',
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

function HeroPimMock() {
  return (
    <div className="marketing-dark-panel marketing-sheen overflow-hidden border border-white/10">
      <div className="border-b border-white/10 px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-white/45">
              Brand workspace
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              Structured product catalog with asset, readiness, and localization context
            </p>
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
            ['64 approved assets', 'Mapped to product and channel slots'],
            ['87% readiness', 'Visibility across the catalog'],
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
          Partner portal
        </p>
        <p className="mt-1 text-sm font-medium text-white">
          Dedicated views for retailers, distributors, and agencies
        </p>
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

        <div className="mt-4 grid gap-3 grid-cols-1 sm:grid-cols-2">
          {[
            ['Products', 'Current assortment'],
            ['Assets', 'Approved files only'],
            ['Documents', 'Specs, compliance, and support docs'],
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
        <p className="mt-1 text-sm font-medium text-white">
          Assets, docs, and readiness stay attached to the source record
        </p>
      </div>

      <div className="p-5">
        <div className="border border-white/10">
          <div className="border-b border-white/10 px-4 py-3">
            <p className="text-sm font-semibold text-white">Hydrate Plus Orange</p>
            <p className="mt-1 text-xs text-white/55">SKU HYD-ORG-30 | AU Retail Core Range</p>
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
      <MarketingFunnelTracker page="home" trackScroll />

      <div className="overflow-hidden">
        <section className="-mt-16 px-4 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-36">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center xl:gap-14">
              <div className="marketing-reveal lg:col-span-5">
                <p className="marketing-kicker">Unified PIM + DAM</p>
                <h1 className="mt-7 max-w-3xl text-[2.7rem] font-semibold leading-[0.97] text-[var(--color-foreground)] sm:text-[4.15rem] lg:text-[4.85rem]">
                  One <span className="marketing-hero-word">system</span> for product content, assets, and partner syndication.
                </h1>
                <p className="marketing-section-copy-lg mt-12 max-w-2xl border-t border-[var(--color-border)]/70 pt-5 text-[var(--color-foreground-secondary)] sm:mt-14 sm:pt-6">
                  Stackcess brings PIM and DAM together so sales and marketing teams can create channel-ready
                  product content, adapt it for every market with AI, and share it with retailers,
                  distributors, and agencies from one place. For supplement brands, that includes labels,
                  claims, pack shots, specs, compliance documents, and launch assets tied to the same source record.
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
                    className="marketing-primary-button inline-flex w-full items-center justify-center gap-2 border border-[var(--color-primary)] bg-[var(--color-primary)] px-7 py-3.5 text-sm font-bold transition-colors hover:bg-[var(--color-primary-hover)] sm:w-auto"
                  >
                    Create Free Account
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex w-full items-center justify-center border border-[var(--color-border-strong)] px-7 py-3.5 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)] sm:w-auto"
                  >
                    Explore the platform
                  </Link>
                </div>

                <div className="mt-12 grid gap-6 border-t border-[var(--color-border)] pt-7 sm:mt-14 sm:gap-7 sm:pt-8">
                  {proof.map((item, index) => (
                    <div key={item} className="grid gap-3 md:grid-cols-[3rem_1fr]">
                      <span className="font-[var(--font-ibm-plex-mono)] text-[11px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                        0{index + 1}
                      </span>
                      <p className="marketing-detail-copy max-w-[34rem] text-[var(--color-foreground-secondary)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="marketing-float marketing-reveal lg:col-span-7">
                <HeroPimMock />
              </div>
            </div>

            <div className="marketing-reveal marketing-reveal-delay-3 mt-16 grid gap-8 border-t border-[var(--color-border)] pt-8 md:grid-cols-4 sm:mt-18 sm:gap-10 sm:pt-9">
              {[
                ['Unified PIM + DAM', 'Manage structured product data and approved assets in one operating model.'],
                ['AI localization', 'Adapt supplement content by market and language with governed terminology, claims, and guidance.'],
                ['Partner portal syndication', 'Share current product files and launch assets with retailers, distributors, and agencies.'],
                ['Bulk catalog workflows', 'Import, enrich, update, and organize large supplement catalogs without spreadsheet churn.'],
              ].map(([value, label]) => (
                <div key={value}>
                  <p className="text-[1.8rem] font-semibold leading-[1.08] text-[var(--color-foreground)] sm:text-[2rem]">{value}</p>
                  <p className="marketing-detail-copy mt-4 max-w-[18rem] text-[var(--color-foreground-muted)]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[rgba(255,255,255,0.62)] px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start sm:gap-14">
            <div>
              <p className="marketing-kicker">AI Localization</p>
              <h2 className="marketing-section-title mt-6 text-[var(--color-foreground)]">
                Adapt product content for each market without rewriting everything from scratch.
              </h2>
            </div>
            <div className="grid gap-8 border-t border-[var(--color-border)] pt-8">
              <p className="marketing-section-copy mt-1 max-w-3xl text-[var(--color-foreground-secondary)]">
                Stackcess helps teams localize faster with AI-assisted adaptation, consistent terminology,
                and market-aware guidance. Your product data, approved assets, and localized content stay
                connected to the same source record. That matters when supplement teams need market-specific
                claims, label language, pack copy, and supporting documents without duplicating work.
              </p>
              <div className="grid gap-9 md:grid-cols-3">
                {[
                  ['Brand tone and glossary control', 'Keep ingredient names, claims language, and product messaging consistent across markets.'],
                  ['Locale-aware guidance', 'Work with market-specific requirements for labels, product copy, and supporting documents inside the workflow.'],
                  ['Faster market launches', 'Reuse structured content and approved assets instead of rebuilding each supplement launch pack from zero.'],
                ].map(([title, detail]) => (
                  <div key={title}>
                    <p className="text-[1.08rem] font-semibold leading-[1.4] text-[var(--color-foreground)] sm:text-[1.14rem]">{title}</p>
                    <p className="marketing-detail-copy mt-4 text-[var(--color-foreground-muted)]">{detail}</p>
                  </div>
                ))}
              </div>
              <div className="marketing-reveal marketing-reveal-delay-1">
                <HeroPimMock />
              </div>
            </div>
          </div>
        </section>

        <section id="platform" className="bg-[rgba(255,255,255,0.72)] px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start sm:gap-14">
            <div>
              <p className="marketing-kicker">Partner Portal Syndication</p>
              <h2 className="marketing-section-title mt-6 text-[var(--color-foreground)]">
                Create approved content once, then syndicate the right version to every partner.
              </h2>
            </div>
            <div className="grid gap-11">
              <div className="grid gap-0 border-t border-[var(--color-border)]">
                {[
                  ['Dedicated partner views', 'Give each retailer, distributor, or agency access to the supplement content that applies to them.'],
                  ['Current files on demand', 'Partners pull approved specs, pack shots, claims decks, and support documents without waiting on your team.'],
                  ['Scoped by market and destination', 'Control what each audience sees by market, locale, and output requirements.'],
                  ['Ready for downstream delivery', 'Shape one source record into portal, export, and retail-specific outputs.'],
                ].map(([title, detail], index) => (
                  <div
                    key={title}
                    className={`grid gap-5 py-7 md:grid-cols-[4.5rem_1fr_1.05fr] sm:gap-6 sm:py-8 ${
                      index < 3 ? 'border-b border-[var(--color-border)]' : ''
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

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:items-start sm:gap-14">
            <div>
              <p className="marketing-kicker">Unified Platform</p>
              <h2 className="marketing-section-title mt-6 text-[var(--color-foreground)]">
                Bring product data, approved assets, and readiness into one workflow.
              </h2>
            </div>
            <div className="grid gap-11">
              <div className="grid gap-0 border-t border-[var(--color-border)]">
                {[
                  ['Structured product catalog', 'Manage supplement families, flavors, pack sizes, variants, and field completeness in one operational view.'],
                  ['Approved asset governance', 'Link the right label, pack shot, document, or campaign file to the right product and destination without duplicating assets.'],
                  ['Bulk product management', 'Import, enrich, and update large supplement catalogs faster with repeatable workflows.'],
                  ['Readiness visibility', 'See what is complete, what is missing, and what is ready for launch, export, or partner delivery.'],
                ].map(([title, detail], index) => (
                  <div
                    key={title}
                    className={`grid gap-5 py-7 md:grid-cols-[4.5rem_1fr_1.05fr] sm:gap-6 sm:py-8 ${
                      index < 3 ? 'border-b border-[var(--color-border)]' : ''
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

        <section className="bg-[rgba(255,255,255,0.58)] px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="marketing-kicker">Why Stackcess</p>
              <h2 className="marketing-section-title mt-6 text-[var(--color-foreground)]">
                More operational than a CMS. More content-ready than a PIM. More structured than a DAM.
              </h2>
              <p className="marketing-section-copy mt-12 sm:mt-14 max-w-[52rem] text-[var(--color-foreground-secondary)]">
                Stackcess combines the structure of a PIM, the governance of a DAM, and the reach of a partner
                portal in one system. It is especially well suited to supplement brands managing launches across
                retailers, distributors, and multiple markets.
              </p>
            </div>

            <div className="mt-14 overflow-x-auto border-y border-[var(--color-border)] bg-[rgba(255,255,255,0.5)] sm:mt-16">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="px-4 py-4 text-left font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">
                      What teams need
                    </th>
                    <th className="px-4 py-4 text-left font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">
                      Typical point tools
                    </th>
                    <th className="px-4 py-4 text-left font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">
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
                    <tr key={need} className={index < 3 ? 'border-b border-[var(--color-border)]' : ''}>
                      <td className="px-4 py-6 text-[1rem] font-semibold leading-[1.45] text-[var(--color-foreground)] sm:px-5 sm:py-7 sm:text-[1.05rem]">{need}</td>
                      <td className="px-4 py-6 text-[1rem] leading-[1.9] text-[var(--color-foreground-muted)] sm:px-5 sm:py-7 sm:text-[1.05rem]">{pointTool}</td>
                      <td className="px-4 py-6 text-[1rem] leading-[1.9] text-[var(--color-foreground-secondary)] sm:px-5 sm:py-7 sm:text-[1.05rem]">{stackcess}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-9 border-t border-[var(--color-border)] pt-8 lg:grid-cols-[0.74fr_1.26fr] sm:gap-11 sm:pt-9">
            <div>
              <p className="marketing-kicker">Pricing Preview</p>
              <h2 className="marketing-section-title mt-6 text-[var(--color-foreground)]">
                Every paid plan includes the platform. Pricing expands with operational volume.
              </h2>
            </div>

            <div className="overflow-x-auto border-y border-[var(--color-border)] bg-[rgba(255,255,255,0.5)] [-webkit-overflow-scrolling:touch]">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="px-4 py-4 text-left font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">
                      Plan
                    </th>
                    <th className="px-4 py-4 text-left font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">
                      Price
                    </th>
                    <th className="px-4 py-4 text-left font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">
                      Core limits
                    </th>
                    <th className="px-4 py-4 text-right font-[var(--font-ibm-plex-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-foreground-subtle)]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => {
                    const ctaLabel = plan.id === 'free' ? 'Create Free Account' : `Start ${plan.name}`
                    return (
                      <tr key={plan.id} className="border-b border-[var(--color-border)] last:border-b-0">
                        <td className="px-4 py-5">
                          <p className="text-base font-semibold text-[var(--color-foreground)]">{plan.name}</p>
                          <p className="mt-1 text-sm text-[var(--color-foreground-muted)]">{plan.description}</p>
                        </td>
                        <td className="px-4 py-5 text-xl font-semibold text-[var(--color-foreground)]">
                          ${plan.price}
                          <span className="ml-1 text-sm font-normal text-[var(--color-foreground-muted)]">/month</span>
                        </td>
                        <td className="px-4 py-5 text-sm leading-[1.8] text-[var(--color-foreground-secondary)]">
                          {describeCoreLimits(plan)}
                        </td>
                        <td className="px-4 py-5 text-right">
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

        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-4xl">
            <p className="marketing-kicker mx-auto w-fit">FAQ</p>
            <h2 className="marketing-section-title mt-6 text-center text-[var(--color-foreground)]">
              Before you sign up
            </h2>
            <div className="mt-14 border-y border-[var(--color-border)] sm:mt-16">
              {faqs.map((item, index) => (
                <div
                  key={item.q}
                  className={`py-7 sm:py-8 ${index < faqs.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}
                >
                  <h3 className="text-lg font-semibold leading-[1.3] text-[var(--color-foreground)]">{item.q}</h3>
                  <p className="marketing-detail-copy mt-3 text-[var(--color-foreground-muted)]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 pt-10 sm:px-6 sm:pb-28 sm:pt-12">
          <div className="mx-auto grid max-w-7xl gap-9 border-t border-[var(--color-border)] pt-10 lg:grid-cols-[1fr_auto] lg:items-end sm:gap-11 sm:pt-12">
            <div>
              <p className="marketing-kicker">Get Started</p>
              <h2 className="mt-6 max-w-4xl text-[2.2rem] font-semibold leading-[1.01] text-[var(--color-foreground)] sm:text-[3.35rem] lg:text-[4.35rem]">
                Start with a free account and turn product content into a system your team can actually run.
              </h2>
              <p className="marketing-section-copy mt-12 max-w-2xl border-t border-[var(--color-border)]/70 pt-5 text-[var(--color-foreground-secondary)] sm:mt-14 sm:pt-6">
                Organize supplement product content, localize faster, and syndicate approved assets and information
                to every partner channel from one workspace.
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
                className="marketing-primary-button inline-flex w-full items-center justify-center gap-2 border border-[var(--color-primary)] bg-[var(--color-primary)] px-8 py-4 text-base font-bold transition-colors hover:bg-[var(--color-primary-hover)] lg:w-auto"
              >
                Create Free Account
                <ArrowRight size={17} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex w-full items-center justify-center border border-[var(--color-border-strong)] px-8 py-4 text-base font-semibold text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)] lg:w-auto"
              >
                See pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
