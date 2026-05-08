'use client'

import { useState } from 'react'
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

const planDescriptors: Record<PlanId, string> = {
  free: 'No credit card required. Full platform, limited catalog size.',
  starter: 'Up to 50 SKUs, 2 internal users, 10 partner invites.',
  growth: 'Up to 500 SKUs, 8 internal users, 100 partner invites.',
  scale: 'Up to 2,500 SKUs, unlimited users, unlimited partner invites.',
}

const marketingPlanFeatures: Record<PlanId, string[]> = {
  free: ['10 active SKUs', '2 GB storage', '1 internal user', '2 external partner invites', 'Translation not included'],
  starter: ['50 active SKUs', '15 GB storage', '2 internal users', '10 external partner invites', '50,000 translated characters / month'],
  growth: ['500 active SKUs', '100 GB storage', '8 internal users', '100 external partner invites', '250,000 translated characters / month'],
  scale: ['2,500 active SKUs', '500 GB storage', 'Unlimited internal users', 'Unlimited external partner invites', '500,000 translated characters / month'],
}

const metrics = [
  ['Active SKUs', plans.map((plan) => formatBillingLimit(plan.activeSkuLimit))],
  ['Storage', plans.map((plan) => formatBillingGigabytes(plan.storageLimitGb))],
  ['Internal users', plans.map((plan) => formatBillingLimit(plan.internalUserLimit))],
  ['External partner invites', plans.map((plan) => formatBillingLimit(plan.partnerInviteLimit))],
  [
    'Translated characters / month',
    plans.map((plan) => (plan.deeplTotalCharLimit > 0 ? formatDeepLUsage(plan.deeplTotalCharLimit) : 'Not included')),
  ],
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
    q: 'How does translation usage work?',
    a: 'Translation allowances are included monthly usage. Higher-volume localization needs can be handled with add-ons or custom plans.',
  },
  {
    q: 'How does AI content generation relate to translation usage?',
    a: 'AI content generation creates product copy directly from your structured product data - ingredients, claims, format, and market context already in context. Translation usage covers character volume when adapting existing content across locales. Both are included in every plan within the limits of your tier. Generated content is also checked against your market adaptation and compliance rules before it is applied.',
  },
  {
    q: 'What if we need custom packaging?',
    a: 'Enterprise supports custom packaging, negotiated limits, and higher-volume delivery and distribution use where needed.',
  },
  {
    q: 'How accurate is the AI content adaptation?',
    a: 'AI-adapted content is generated from your structured product data and checked against your market adaptation rules. It is designed to get you to a strong first draft - accurate terminology, governed claims language, and market-aware copy. Final review and sign-off before publishing to any market remains with your team. For regulated markets or compliance-sensitive claims, treat adapted content as a reviewed draft rather than a final proof.',
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
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: siteUrl },
    { name: 'Pricing', url: `${siteUrl}/pricing` },
  ])

  const registerByPlan: Record<PlanId, string> = {
    free: buildAppAuthUrl('register', {
      planInterest: 'free',
      postLoginRedirectPath: '/onboarding?create=1&origin=marketing_pricing_free',
    }),
    starter: buildAppAuthUrl('register', {
      planInterest: 'starter',
      postLoginRedirectPath: '/onboarding?create=1&origin=marketing_pricing_starter',
    }),
    growth: buildAppAuthUrl('register', {
      planInterest: 'growth',
      postLoginRedirectPath: '/onboarding?create=1&origin=marketing_pricing_growth',
    }),
    scale: buildAppAuthUrl('register', {
      planInterest: 'scale',
      postLoginRedirectPath: '/onboarding?create=1&origin=marketing_pricing_scale',
    }),
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
        <section className="px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-12 xl:grid-cols-[0.9fr_1.1fr] xl:items-end">
              <div className="max-w-3xl">
                <p className="marketing-kicker">Marketing / Pricing</p>
                <h1 className="mt-7 max-w-4xl pb-6 text-[3rem] font-medium tracking-[-0.018em] text-[var(--color-foreground)] !leading-[1.06] sm:text-[4rem] lg:text-[4.8rem] xl:text-[6rem]">
                  Start free.
                  <br />
                  Pay for what your
                  <span className="marketing-hero-word"> operation actually needs.</span>
                </h1>
                <p className="marketing-section-copy max-w-2xl text-[var(--text-secondary)]">
                  Every plan includes the full platform. Pricing reflects the size of your catalog, your partner
                  network, and the markets you operate in - nothing else.
                </p>
              </div>

              <div className="marketing-ui-panel marketing-diagonal-texture overflow-hidden p-6 sm:p-8">
                <div className="grid gap-4 border-b border-[var(--border-subtle)] pb-5 md:grid-cols-3">
                  {[
                    ['Same product', 'Catalog, assets, localization, scoped portals, and sharing are included across paid plans.'],
                    ['Bigger limits', 'Plans expand for more active SKUs, more storage, more collaborators, and more external access.'],
                    ['Cleaner upgrades', 'Move up when the catalog, market count, or partner load needs more headroom.'],
                  ].map(([title, body]) => (
                    <div key={title}>
                      <p className="marketing-mono text-[0.66rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                        {title}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{body}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  {[
                    ['Free', 'Prove the workflow with a smaller catalog'],
                    ['Growth', 'The default operating plan for scaling brands'],
                    ['Enterprise', 'Custom terms for larger rollouts and partner networks'],
                  ].map(([label, value], index) => (
                    <div
                      key={label}
                      className={`rounded-[1rem] border px-4 py-4 ${
                        index === 1
                          ? 'border-[rgba(39,94,70,0.28)] bg-[rgba(39,94,70,0.08)]'
                          : 'border-[var(--border-subtle)] bg-[rgba(255,255,255,0.72)]'
                      }`}
                    >
                      <p className="marketing-mono text-[0.63rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                        {label}
                      </p>
                      <p className="mt-3 text-sm font-semibold leading-6 text-[var(--color-foreground)]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-12 sm:px-6 sm:pb-16">
          <div className="mx-auto grid max-w-[1380px] gap-5 xl:grid-cols-4">
            {plans.map((plan) => {
              const ctaLabel = plan.id === 'free' ? 'Start Free' : `Start ${plan.name}`
              const isGrowth = plan.id === 'growth'
              const isFree = plan.id === 'free'
              return (
                <div
                  key={plan.id}
                  className={`relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border px-6 py-6 shadow-[0_4px_16px_rgba(26,24,20,0.06)] ${
                    isGrowth
                      ? 'border-[var(--border-subtle)] border-t-[3px] border-t-[var(--color-accent)] bg-white'
                      : isFree
                        ? 'border-[var(--border-subtle)] bg-[var(--bg-primary)]'
                        : 'border-[var(--border-subtle)] bg-white'
                  }`}
                >
                  {isGrowth ? (
                    <span className="mb-4 inline-flex w-fit rounded-[6px] border border-[var(--color-accent)] px-2.5 py-1 text-[13px] uppercase tracking-[0.08em] text-[var(--color-accent)]">
                      Most Popular
                    </span>
                  ) : null}
                  <div className="border-b border-[var(--border-subtle)] pb-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[1.15rem] font-semibold text-[var(--color-foreground)]">{plan.name}</p>
                        <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{planDescriptors[plan.id]}</p>
                      </div>
                    </div>

                    <div className="mt-6 flex items-end gap-2">
                      <p className="text-[2.5rem] font-semibold leading-none text-[var(--text-primary)]">${plan.price}</p>
                      <span className="pb-1 text-sm text-[var(--text-muted)]">/month</span>
                    </div>
                    {isFree ? (
                      <p className="mt-2 text-[13px] leading-5 text-[var(--text-muted)]">No credit card required.</p>
                    ) : null}
                  </div>

                  <div className="mt-5 flex-1 space-y-3">
                    {marketingPlanFeatures[plan.id].map((feature, index) => (
                      <div key={`${plan.id}-${index}`} className="flex items-start gap-2.5 text-sm leading-7 text-[var(--text-secondary)]">
                        <Check className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--color-success)]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7">
                    <Link
                      href={registerByPlan[plan.id]}
                      onClick={() => {
                        trackMarketingEvent('plan_cta_click', { page: 'pricing', section: 'plan_rows', ctaLabel, planInterest: plan.id })
                        trackRegisterRedirect('plan_rows', ctaLabel, plan.id)
                      }}
                      className={`group inline-flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-3.5 text-sm font-semibold ${
                        isGrowth
                          ? 'marketing-primary-button border-[var(--color-primary)] bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]'
                          : 'marketing-black-button border-[var(--color-accent-black)] bg-[var(--color-accent-black)] text-[var(--color-accent-black-foreground)] hover:bg-[var(--color-accent-black-hover)] hover:text-[var(--color-accent-black-foreground)]'
                      }`}
                    >
                      {ctaLabel}
                      <ArrowRight size={14} className={isGrowth ? '' : 'marketing-button-arrow'} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="bg-[var(--bg-tertiary)] px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-[1380px]">
            <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="marketing-kicker">Capacity By Plan</p>
                <h2 className="mt-7 pb-6 text-[2.75rem] font-normal tracking-[-0.018em] text-[var(--color-foreground)] !leading-[1.06] sm:text-[4rem]">
                  Operational limits.
                  <br />
                  The same product at every plan.
                </h2>
                <p className="marketing-section-copy max-w-xl text-[var(--text-secondary)]">
                  Every plan includes the full platform. Limits reflect catalog size, partner volume, and the markets
                  you operate in - not feature unlocks.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  ['Catalog size', 'Active SKUs and storage scale with your range - flavors, pack sizes, and market variants included.'],
                  ['Partner access', 'More distributors, retailers, and agencies in your portal network as your distribution expands.'],
                  ['Market adaptation', 'Included translation usage scales with the plan. Manage content across markets, languages, and channel requirements without a separate tool.'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-[1rem] border border-[rgba(26,24,20,0.08)] bg-[var(--bg-primary)] p-4">
                    <p className="marketing-mono text-[0.63rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">{title}</p>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{body}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-9 overflow-x-auto rounded-[1.5rem] border border-[rgba(26,24,20,0.08)] bg-white shadow-[0_4px_16px_rgba(26,24,20,0.06)] [-webkit-overflow-scrolling:touch]">
              <table className="w-full min-w-[860px] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] bg-[var(--bg-tertiary)]">
                    <th className="px-5 py-4 text-left text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      Limit
                    </th>
                    {plans.map((plan) => (
                      <th
                        key={plan.id}
                        className={`px-5 py-4 text-left text-[0.65rem] font-semibold uppercase tracking-[0.16em] ${
                          plan.id === 'growth' ? 'text-[var(--color-accent)]' : 'text-[var(--text-muted)]'
                        }`}
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {metrics.map(([label, values], rowIndex) => (
                    <tr key={label} className={rowIndex < metrics.length - 1 ? 'border-b border-[var(--border-subtle)]' : ''}>
                      <td className="px-5 py-4 font-semibold text-[var(--color-foreground-secondary)]">{label}</td>
                      {values.map((value, index) => (
                        <td
                          key={`${label}-${plans[index].id}`}
                          className={`px-5 py-4 ${
                            plans[index].id === 'growth'
                              ? 'font-semibold text-[var(--color-accent)]'
                              : 'text-[var(--text-secondary)]'
                          }`}
                        >
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

        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto grid max-w-[1380px] gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.5rem] border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-6 shadow-[0_4px_16px_rgba(26,24,20,0.06)] sm:p-8">
              <p className="marketing-kicker">Included In Paid Plans</p>
              <h2 className="mt-7 pb-6 text-[2.6rem] font-normal tracking-[-0.018em] text-[var(--color-foreground)] !leading-[1.06] sm:text-[3.6rem]">
                Every plan.
                <br />
                The full platform.
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  'Structured product catalog with variant and market support',
                  'Asset management with processing and product media store',
                  'Retailer, distributor, and agency portal access',
                  'Market, locale, and destination scoping',
                  'AI content and market adaptation - write in your language, adapted and compliance-checked for every market you operate in',
                  'Included translation usage scales with your plan',
                  'Usage visibility with upgrade prompts',
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5 border-t border-[var(--border-subtle)] py-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--color-success)]" />
                    <p className="marketing-detail-copy text-[var(--text-secondary)]">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[var(--border-subtle)] bg-[var(--bg-tertiary)] p-6 shadow-[0_4px_16px_rgba(26,24,20,0.06)] sm:p-8">
              <p className="marketing-kicker">Enterprise</p>
              <h2 className="mt-7 pb-6 text-[2.6rem] font-normal tracking-[-0.018em] text-[var(--color-foreground)] !leading-[1.06] sm:text-[3.5rem]">
                Enterprise terms
                <br />
                for broader rollouts.
              </h2>
              <p className="marketing-section-copy max-w-2xl text-[var(--text-secondary)]">
                Use Enterprise when you need broader commercial flexibility - custom limits, dedicated support,
                coordination across multiple brands or partner networks, and higher-volume delivery outside standard
                plan packaging.
              </p>
              <div className="mt-6 space-y-3">
                {enterprisePlan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--color-success)]" />
                    <p className="marketing-detail-copy text-[var(--text-secondary)]">{feature}</p>
                  </div>
                ))}
              </div>
              <a
                href="mailto:sales@stackcess.com?subject=Stackcess%20Enterprise%20Pricing"
                className="marketing-black-button mt-7 inline-flex items-center justify-center rounded-lg border border-[var(--color-accent-black)] bg-[var(--color-accent-black)] px-5 py-3 text-sm font-semibold text-[var(--color-accent-black-foreground)] transition-colors hover:bg-[var(--color-accent-black-hover)]"
              >
                Talk to sales
              </a>
            </div>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <p className="marketing-kicker mx-auto w-fit">FAQ</p>
            <h2 className="mt-7 text-center text-[2.8rem] font-normal tracking-[-0.018em] text-[var(--color-foreground)] !leading-[1.06] sm:text-[4rem]">
              Before you choose a plan.
            </h2>
            <div className="mt-10 border-y border-[var(--border-subtle)]">
              {faqs.map((faq, index) => (
                <button
                  key={faq.q}
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className={`block w-full py-7 text-left sm:py-8 ${
                    index < faqs.length - 1 ? 'border-b border-[var(--border-subtle)]' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <h3 className="text-lg font-medium leading-[1.4] text-[var(--color-foreground)]">{faq.q}</h3>
                    <span className="mt-0.5 text-xl leading-none text-[var(--color-accent)]">{openFaq === index ? '-' : '+'}</span>
                  </div>
                  {openFaq === index ? <p className="marketing-detail-copy mt-6 text-[var(--text-secondary)]">{faq.a}</p> : null}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[var(--bg-dark)] px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
          <div className="mx-auto grid max-w-[1380px] gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="marketing-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Start free
              </p>
              <h2 className="mt-4 max-w-3xl text-[2.6rem] font-medium tracking-[-0.018em] !text-[var(--bg-primary)] !leading-[1.06] sm:text-[4rem]">
                Start with one workspace.
                <br />
                Upgrade when the catalog and partner load demand it.
              </h2>
              <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-[var(--text-muted)]">
                Use the free plan to prove the workflow, then expand when more products, more markets, and more
                partner requests make it necessary.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={registerByPlan.free}
                onClick={() => {
                  trackMarketingEvent('pricing_cta_click', {
                    page: 'pricing',
                    section: 'final_cta',
                    ctaLabel: 'Start Free',
                    planInterest: 'free',
                  })
                  trackRegisterRedirect('final_cta', 'Start Free', 'free')
                }}
                className="marketing-black-button inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--color-accent-black)] bg-[var(--color-accent-black)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-black-foreground)] transition-colors hover:bg-[var(--color-accent-black-hover)] sm:w-auto"
              >
                Start Free
                <ArrowRight size={16} />
              </Link>
              <a
                href="mailto:sales@stackcess.com?subject=Stackcess%20Pricing%20Questions"
                className="marketing-black-button inline-flex w-full items-center justify-center rounded-lg border border-[var(--color-accent-black)] bg-[var(--color-accent-black)] px-6 py-3 text-sm font-semibold text-[var(--color-accent-black-foreground)] transition-colors hover:bg-[var(--color-accent-black-hover)] sm:w-auto"
              >
                Talk to sales
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
