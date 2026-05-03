'use client'

import Link from 'next/link'
import { ArrowRight, Check, CheckCircle2 } from 'lucide-react'
import MarketingFunnelTracker from '@/components/MarketingFunnelTracker'
import { buildAppAuthUrl } from '@/lib/app-links'
import { formatBillingGigabytes, formatBillingLimit, formatDeepLUsage } from '@/lib/billing-display'
import { trackMarketingEvent } from '@/lib/marketing-analytics'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { BILLING_PLAN_CATALOG } from '@/lib/billing-catalog'

type PlanId = 'free' | 'starter' | 'growth' | 'scale'
type DisplayPlan = (typeof BILLING_PLAN_CATALOG)[number] & { id: PlanId }

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'
const enterprisePlan = BILLING_PLAN_CATALOG.find((plan) => plan.id === 'enterprise')!
const plans = BILLING_PLAN_CATALOG.filter(
  (plan): plan is DisplayPlan =>
    plan.id === 'free' || plan.id === 'starter' || plan.id === 'growth' || plan.id === 'scale'
)

const metrics = [
  ['Active SKUs', plans.map((plan) => formatBillingLimit(plan.activeSkuLimit))],
  ['Storage', plans.map((plan) => formatBillingGigabytes(plan.storageLimitGb))],
  ['Internal users', plans.map((plan) => formatBillingLimit(plan.internalUserLimit))],
  ['External partner invites', plans.map((plan) => formatBillingLimit(plan.partnerInviteLimit))],
  ['Translated characters / month', plans.map((plan) => (plan.deeplTotalCharLimit > 0 ? formatDeepLUsage(plan.deeplTotalCharLimit) : 'Not included'))],
  ['Public share links', plans.map((plan) => (plan.publicShareLinksEnabled ? 'Included' : 'Not included'))],
] as const

const faqs = [
  {
    q: 'Do you charge per seat?',
    a: 'No. Stackcess is billed per workspace. Limits are based on operational scale like active SKUs, storage, internal users, partner invites, and included translation usage.',
  },
  {
    q: 'Do partners need a paid Stackcess plan?',
    a: 'No. Brands pay for the workspace. Retailers, distributors, agencies, and partner teams can access the portal through the invite capacity included in your plan.',
  },
  {
    q: 'Are features gated by plan?',
    a: 'No. Every paid plan includes the full platform, including the product catalog, asset management, the partner portal, localization, and scoped sharing.',
  },
  {
    q: 'When do public share links become available?',
    a: 'Public share links are disabled on the free plan and available from Starter upward.',
  },
  {
    q: 'How does translation usage work?',
    a: 'Translation allowances are included monthly usage. Higher-volume localization needs can be handled with add-ons or custom plans.',
  },
  {
    q: 'What if we need custom packaging?',
    a: 'Enterprise supports custom packaging, negotiated limits, and higher-volume delivery and distribution use where needed.',
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

export default function PricingPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Pricing', url: `${siteUrl}/pricing` },
  ])

  const registerByPlan: Record<PlanId, string> = {
    free: buildAppAuthUrl('register', { planInterest: 'free', postLoginRedirectPath: '/onboarding?create=1&origin=marketing_pricing_free' }),
    starter: buildAppAuthUrl('register', { planInterest: 'starter', postLoginRedirectPath: '/onboarding?create=1&origin=marketing_pricing_starter' }),
    growth: buildAppAuthUrl('register', { planInterest: 'growth', postLoginRedirectPath: '/onboarding?create=1&origin=marketing_pricing_growth' }),
    scale: buildAppAuthUrl('register', { planInterest: 'scale', postLoginRedirectPath: '/onboarding?create=1&origin=marketing_pricing_scale' }),
  }

  const trackRegisterRedirect = (section: string, ctaLabel: string, planInterest: string) => {
    trackMarketingEvent('redirect_to_register', { page: 'pricing', section, ctaLabel, planInterest })
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <MarketingFunnelTracker page="pricing" />

      <div className="min-h-screen bg-[var(--color-background)]">
        <section className="px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl border-b border-[var(--color-border)] pb-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-end">
              <div>
                <p className="marketing-kicker">Workspace Pricing</p>
                <h1 className="mt-7 max-w-4xl font-[var(--font-display-serif)] text-[2.55rem] font-normal leading-[1.04] tracking-[-0.025em] text-[var(--color-foreground)] sm:text-[4rem] md:text-[4.6rem]">
                  Pricing for product content operations, not per-seat admin overhead.
                </h1>
                <p className="marketing-section-copy mt-11 max-w-3xl border-t border-[var(--color-border)]/70 pt-5 text-[var(--color-foreground-muted)] sm:mt-13 sm:pt-6">
                  Start free, then expand with catalog size, storage, team access, partner collaboration, and included translation usage.
                  Every paid plan includes the unified PIM + DAM, AI localization workflows, and partner portal syndication.
                </p>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                {[
                  ['Free plan', 'Best for proving the workflow with a smaller catalog'],
                  ['Starter', 'Adds more product capacity, collaborators, and monthly translation usage'],
                  ['Growth', 'Built for brands managing more markets, products, and external partners'],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className={`${index > 0 ? 'mt-4 border-t border-[var(--color-border)] pt-4' : ''}`}
                  >
                    <p className="font-[var(--font-ibm-plex-mono)] text-[0.65rem] uppercase tracking-[0.16em] text-[var(--color-foreground-subtle)]">{label}</p>
                    <p className="mt-3 text-base font-semibold leading-[1.45] text-[var(--color-foreground)]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-8 sm:px-6">
          <div className="mx-auto max-w-6xl border-y border-[var(--color-border)]">
            {plans.map((plan) => {
              const ctaLabel = plan.id === 'free' ? 'Start Free' : `Start ${plan.name}`
              return (
                <div
                  key={plan.id}
                  className={`grid gap-5 px-1 py-7 md:grid-cols-[11rem_10rem_1fr_auto] md:items-start sm:gap-6 sm:py-8 ${
                    plan.id !== plans[plans.length - 1].id ? 'border-b border-[var(--color-border)]' : ''
                  }`}
                >
                  <div className="px-3">
                    <p className="font-[var(--font-ibm-plex-mono)] text-[0.65rem] uppercase tracking-[0.16em] text-[var(--color-foreground-subtle)]">
                      {plan.popular ? 'Recommended plan' : 'Plan'}
                    </p>
                    <h2 className="mt-2 text-[1.8rem] font-semibold leading-[1.05] text-[var(--color-foreground)]">{plan.name}</h2>
                    <p className="marketing-detail-copy mt-3 text-[var(--color-foreground-muted)]">{plan.description}</p>
                  </div>

                  <div className="border-t border-[var(--color-border)] px-3 pt-3 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-semibold text-[var(--color-foreground)]">${plan.price}</span>
                      <span className="mb-1 text-sm text-[var(--color-foreground-muted)]">/month</span>
                    </div>
                  </div>

                  <div className="grid gap-3 border-t border-[var(--color-border)] px-3 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0 lg:grid-cols-2">
                    {[
                      ...plan.features,
                    ].map((feature, index) => (
                      <div key={`${plan.id}-${index}`} className="marketing-detail-copy flex items-start gap-2.5 text-[var(--color-foreground-muted)]">
                        <Check className="mt-0.5 h-4 w-4 text-[var(--color-success)]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="px-3 md:pl-0">
                    <Link
                      href={registerByPlan[plan.id]}
                      onClick={() => {
                        trackMarketingEvent('plan_cta_click', { page: 'pricing', section: 'plan_rows', ctaLabel, planInterest: plan.id })
                        trackRegisterRedirect('plan_rows', ctaLabel, plan.id)
                      }}
                      className={`inline-flex items-center gap-2 border px-4 py-3 text-sm font-semibold transition-colors ${
                        plan.popular
                          ? 'marketing-primary-button border-[var(--color-primary)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]'
                          : 'border-[var(--color-border-strong)] text-[var(--color-foreground)] hover:border-[var(--color-accent)]'
                      }`}
                    >
                      {ctaLabel}
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <h2 className="font-[var(--font-display-serif)] text-[2rem] font-normal leading-[1.08] tracking-[-0.025em] text-[var(--color-foreground)] sm:text-[2.35rem]">Operational limits by plan</h2>
                <p className="marketing-detail-copy mt-4 max-w-xl text-[var(--color-foreground-muted)]">
                  These are the product and collaboration limits that expand as your operation grows. The core platform stays the same.
                </p>
              </div>
              <p className="marketing-detail-copy text-[var(--color-foreground-secondary)]">
                Every paid plan includes structured product data, governed asset management, scoped sharing,
                the partner portal, localization workflows, and in-product usage alerts.
              </p>
            </div>

            <div className="mt-8 overflow-x-auto border-y border-[var(--color-border)] [-webkit-overflow-scrolling:touch]">
              <table className="w-full min-w-[860px] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-foreground-subtle)]">Limit</th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="px-5 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-foreground-subtle)]">{plan.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {metrics.map(([label, values], rowIndex) => (
                    <tr key={label} className={rowIndex < metrics.length - 1 ? 'border-b border-[var(--color-border)]' : ''}>
                      <td className="px-5 py-4 font-semibold text-[var(--color-foreground-secondary)]">{label}</td>
                      {values.map((value, index) => (
                        <td key={`${label}-${plans[index].id}`} className={`px-5 py-4 ${plans[index].id === 'growth' ? 'font-semibold text-[var(--color-accent)]' : 'text-[var(--color-foreground-muted)]'}`}>
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="border-t border-[var(--color-border)] pt-6">
              <h2 className="font-[var(--font-display-serif)] text-[2rem] font-normal leading-[1.08] tracking-[-0.025em] text-[var(--color-foreground)] sm:text-[2.35rem]">Included in every paid plan</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  'Structured product catalog with variant support',
                  'Asset management with versioning and product media slots',
                  'Retailer, distributor, and agency portal access',
                  'Market, locale, and destination scoping',
                  'AI-assisted localization with included translation usage',
                  'Usage visibility with upgrade prompts',
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5 border-t border-[var(--color-border)] py-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--color-success)]" />
                    <p className="marketing-detail-copy text-[var(--color-foreground-muted)]">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--color-border)] pt-6 lg:border-l lg:pl-10">
              <p className="font-[var(--font-ibm-plex-mono)] text-[0.65rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">Enterprise</p>
              <h2 className="mt-4 font-[var(--font-display-serif)] text-[2rem] font-normal leading-[1.1] tracking-[-0.025em] text-[var(--color-foreground)] sm:text-[2.35rem]">Custom commercial and technical terms for larger rollouts</h2>
              <p className="marketing-detail-copy mt-5 text-[var(--color-foreground-muted)]">
                {enterprisePlan.description}. Use Enterprise when you need broader commercial flexibility,
                custom limits, rollout support, deeper coordination across brands, markets, and partner networks,
                or higher-volume delivery and distribution use under custom packaging.
              </p>
              <div className="mt-5 space-y-3">
                {enterprisePlan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--color-success)]" />
                    <p className="marketing-detail-copy text-[var(--color-foreground-secondary)]">{feature}</p>
                  </div>
                ))}
              </div>
              <a href="mailto:sales@stackcess.com?subject=Stackcess%20Enterprise%20Pricing" className="mt-6 inline-flex items-center justify-center border border-[var(--color-border-strong)] px-5 py-3 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)]">
                Talk to sales
              </a>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-[var(--font-display-serif)] text-center text-[2.25rem] font-normal leading-[1.08] tracking-[-0.025em] text-[var(--color-foreground)] sm:text-[3rem]">Common questions</h2>
            <div className="mt-8 border-y border-[var(--color-border)]">
              {faqs.map((faq, index) => (
                <div key={faq.q} className={`py-7 sm:py-8 ${index < faqs.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}>
                  <h3 className="text-lg font-semibold leading-[1.3] text-[var(--color-foreground)]">{faq.q}</h3>
                  <p className="marketing-detail-copy mt-3 text-[var(--color-foreground-muted)]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12">
          <div className="mx-auto grid max-w-6xl gap-7 border-t border-[var(--color-border)] pt-8 lg:grid-cols-[1fr_auto] lg:items-end sm:gap-8 sm:pt-10">
            <div>
              <p className="font-[var(--font-ibm-plex-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Start free
              </p>
              <h2 className="mt-4 max-w-3xl font-[var(--font-display-serif)] text-[2.1rem] font-normal leading-[1.1] tracking-[-0.025em] text-[var(--color-foreground)] sm:text-[3rem]">
                Start with one workspace. Upgrade when the catalog, team, and partner network need more headroom.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={registerByPlan.free}
                onClick={() => {
                  trackMarketingEvent('pricing_cta_click', { page: 'pricing', section: 'final_cta', ctaLabel: 'Start Free', planInterest: 'free' })
                  trackRegisterRedirect('final_cta', 'Start Free', 'free')
                }}
                className="marketing-primary-button inline-flex w-full items-center justify-center gap-2 border border-[var(--color-primary)] bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold transition-colors hover:bg-[var(--color-primary-hover)] sm:w-auto"
              >
                Start Free
                <ArrowRight size={16} />
              </Link>
              <a href="mailto:sales@stackcess.com?subject=Stackcess%20Pricing%20Questions" className="inline-flex w-full items-center justify-center border border-[var(--color-border-strong)] px-6 py-3 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)] sm:w-auto">
                Talk to sales
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
