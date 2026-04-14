'use client'

import Link from 'next/link'
import { ArrowRight, Check, CheckCircle2 } from 'lucide-react'
import MarketingFunnelTracker from '@/components/MarketingFunnelTracker'
import { buildAppAuthUrl } from '@/lib/app-links'
import { formatBillingGigabytes, formatBillingLimit, formatDeepLUsage, formatUploadBytes } from '@/lib/billing-display'
import { trackMarketingEvent } from '@/lib/marketing-analytics'
import { generateBreadcrumbSchema } from '@/lib/schema'
import { BILLING_PLAN_CATALOG, shouldShowMaxUploadInMarketing } from '@tradetool/types'

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
  ['Delivery bandwidth', plans.map((plan) => formatBillingGigabytes(plan.deliveryBandwidthLimitGb))],
  ['Internal users', plans.map((plan) => formatBillingLimit(plan.internalUserLimit))],
  ['Partner invites', plans.map((plan) => formatBillingLimit(plan.partnerInviteLimit))],
  ['Translation volume', plans.map((plan) => formatDeepLUsage(plan.deeplTotalCharLimit))],
  ['Public share links', plans.map((plan) => (plan.publicShareLinksEnabled ? 'Included' : 'Not included'))],
] as const

const faqs = [
  {
    q: 'Do you charge per seat?',
    a: 'No. Stackcess is billed per workspace. Limits are based on operational scale like SKUs, storage, bandwidth, internal users, partner invites, and translation volume.',
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
    a: 'Public share links are disabled on the free sandbox and available from Starter upward.',
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

function formatMarketingPlanFeature(feature: string): string {
  if (feature === 'DeepL usage not included') {
    return 'Translation not included'
  }

  return feature.replace(/DeepL characters \/ month/g, 'translated characters / month')
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
        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl border-b border-[var(--color-border)] pb-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-end">
              <div>
                <p className="marketing-kicker">Workspace Pricing</p>
                <h1 className="mt-6 max-w-4xl text-3xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)] sm:text-5xl md:text-6xl">
                  Scale on catalog volume, delivery, and partner access. Not on seat count.
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-[1.8] text-[var(--color-foreground-muted)] sm:text-lg">
                  The free sandbox gets you started. Every paid plan includes the full platform. You move up
                  only when you need more SKUs, storage, bandwidth, internal users, partner invites, or
                  translation volume.
                </p>
              </div>

              <div className="border-t border-[var(--color-border)] pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                {[
                  ['Free sandbox', '10 active SKUs and 2 GB storage'],
                  ['Starter', 'Public share links and 10 partner invites'],
                  ['Growth', '500 SKUs, 100 GB storage, 100 partner invites'],
                ].map(([label, value], index) => (
                  <div
                    key={label}
                    className={`${index > 0 ? 'mt-4 border-t border-[var(--color-border)] pt-4' : ''}`}
                  >
                    <p className="font-[var(--font-ibm-plex-mono)] text-[0.65rem] uppercase tracking-[0.16em] text-[var(--color-foreground-subtle)]">{label}</p>
                    <p className="mt-2 text-sm font-semibold text-[var(--color-foreground)]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-8 sm:px-6">
          <div className="mx-auto max-w-6xl border-y border-[var(--color-border)]">
            {plans.map((plan) => {
              const ctaLabel = plan.id === 'free' ? 'Start sandbox' : `Start ${plan.name}`
              return (
                <div
                  key={plan.id}
                  className={`grid gap-6 px-1 py-8 md:grid-cols-[11rem_10rem_1fr_auto] md:items-start ${
                    plan.id !== plans[plans.length - 1].id ? 'border-b border-[var(--color-border)]' : ''
                  }`}
                >
                  <div className="px-3">
                    <p className="font-[var(--font-ibm-plex-mono)] text-[0.65rem] uppercase tracking-[0.16em] text-[var(--color-foreground-subtle)]">
                      {plan.popular ? 'Recommended plan' : 'Plan'}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-[var(--color-foreground)]">{plan.name}</h2>
                    <p className="mt-2 text-sm leading-[1.7] text-[var(--color-foreground-muted)]">{plan.description}</p>
                  </div>

                  <div className="border-t border-[var(--color-border)] px-3 pt-3 md:border-t-0 md:border-l md:pt-0 md:pl-6">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-semibold text-[var(--color-foreground)]">${plan.price}</span>
                      <span className="mb-1 text-sm text-[var(--color-foreground-muted)]">/month</span>
                    </div>
                  </div>

                  <div className="grid gap-3 border-t border-[var(--color-border)] px-3 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0 lg:grid-cols-2">
                    {[
                      ...plan.features.map(formatMarketingPlanFeature),
                      ...(shouldShowMaxUploadInMarketing(plan.id)
                        ? [`${formatUploadBytes(plan.maxUploadBytes)} max file upload`]
                        : []),
                      plan.publicShareLinksEnabled ? 'Public share links included' : 'Public share links disabled',
                    ].map((feature, index) => (
                      <div key={`${plan.id}-${index}`} className="flex items-start gap-2.5 text-sm text-[var(--color-foreground-muted)]">
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

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)] sm:text-3xl">Operational limits by plan</h2>
                <p className="mt-3 max-w-xl text-sm leading-[1.8] text-[var(--color-foreground-muted)] sm:text-base">
                  These are the limits that change between plans. The product itself stays the same.
                </p>
              </div>
              <p className="text-sm text-[var(--color-foreground-secondary)]">
                Every paid plan includes the product catalog, asset management, scoped sharing, the retailer and partner portal,
                localization workflows, and in-product usage alerts.
              </p>
            </div>

            <div className="mt-8 overflow-x-auto border-y border-[var(--color-border)]">
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

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="border-t border-[var(--color-border)] pt-6">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)] sm:text-3xl">Included in every paid plan</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  'Structured product catalog with variant support',
                  'Asset management with versioning and product media slots',
                  'Retailer and partner portal access',
                  'Market, locale, and destination scoping',
                  'Regulatory document workflows and audit trails',
                  'Usage visibility with upgrade prompts',
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5 border-t border-[var(--color-border)] py-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--color-success)]" />
                    <p className="text-sm text-[var(--color-foreground-muted)]">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--color-border)] pt-6 lg:border-l lg:pl-10">
              <p className="font-[var(--font-ibm-plex-mono)] text-[0.65rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">Enterprise</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)] sm:text-3xl">Custom commercial and technical terms for larger rollouts</h2>
              <p className="mt-4 text-sm leading-[1.8] text-[var(--color-foreground-muted)] sm:text-base">
                {enterprisePlan.description}. Use Enterprise when you need broader commercial flexibility,
                custom limits, rollout support, or deeper coordination across brands, markets, and partner networks.
              </p>
              <div className="mt-5 space-y-3">
                {enterprisePlan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--color-success)]" />
                    <p className="text-sm text-[var(--color-foreground-secondary)]">{feature}</p>
                  </div>
                ))}
              </div>
              <a href="mailto:sales@stackcess.com?subject=Stackcess%20Enterprise%20Pricing" className="mt-6 inline-flex items-center justify-center border border-[var(--color-border-strong)] px-5 py-3 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)]">
                Talk to sales
              </a>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)] sm:text-4xl">Common questions</h2>
            <div className="mt-8 border-y border-[var(--color-border)]">
              {faqs.map((faq, index) => (
                <div key={faq.q} className={`py-6 ${index < faqs.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}>
                  <h3 className="text-base font-semibold text-[var(--color-foreground)]">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-[1.8] text-[var(--color-foreground-muted)]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 pt-12 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-8 border-t border-[var(--color-border)] pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-[var(--font-ibm-plex-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Start in the sandbox
              </p>
              <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)] sm:text-4xl">
                Upgrade when your operation actually needs more headroom.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={registerByPlan.free}
                onClick={() => {
                  trackMarketingEvent('pricing_cta_click', { page: 'pricing', section: 'final_cta', ctaLabel: 'Start sandbox', planInterest: 'free' })
                  trackRegisterRedirect('final_cta', 'Start sandbox', 'free')
                }}
                className="marketing-primary-button inline-flex items-center justify-center gap-2 border border-[var(--color-primary)] bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                Start sandbox
                <ArrowRight size={16} />
              </Link>
              <a href="mailto:sales@stackcess.com?subject=Stackcess%20Pricing%20Questions" className="inline-flex items-center justify-center border border-[var(--color-border-strong)] px-6 py-3 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)]">
                Talk to sales
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
