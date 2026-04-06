'use client'

import Link from 'next/link'
import { ArrowRight, Check, CheckCircle2 } from 'lucide-react'
import MarketingFunnelTracker from '@/components/MarketingFunnelTracker'
import { buildAppAuthUrl } from '@/lib/app-links'
import { trackMarketingEvent } from '@/lib/marketing-analytics'
import { generateBreadcrumbSchema } from '@/lib/schema'

type PaidPlan = {
  id: 'starter' | 'growth' | 'scale'
  name: string
  description: string
  priceLabel: string
  popular?: boolean
  features: string[]
}

const paidPlans: PaidPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'For teams building their first structured product operation.',
    priceLabel: '$49',
    features: [
      '50 active SKUs',
      '15 GB storage',
      '25 GB monthly delivery bandwidth',
      '2 internal users',
      '10 external partner invites',
      '750K translation characters / month',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'Default plan for active brand ops and marketing teams.',
    priceLabel: '$129',
    popular: true,
    features: [
      '500 active SKUs',
      '100 GB storage',
      '200 GB monthly delivery bandwidth',
      '8 internal users',
      '100 external partner invites',
      '3M translation characters / month',
    ],
  },
  {
    id: 'scale',
    name: 'Scale',
    description: 'For global teams managing high-volume partner distribution.',
    priceLabel: '$299',
    features: [
      '2,500 active SKUs',
      '500 GB storage',
      '1 TB monthly delivery bandwidth',
      'Unlimited internal users',
      'Unlimited external partner invites',
      '12M translation characters / month',
    ],
  },
]

const faqs = [
  {
    q: 'Do you charge per seat?',
    a: 'No. Stackcess is billed per workspace. Team member limits are plan-based, not per-user billing line items.',
  },
  {
    q: 'Do partners need a paid Stackcess plan?',
    a: 'No. Partners can receive and view shared content without paying. Your invite capacity depends on your selected plan.',
  },
  {
    q: 'Are features gated by plan?',
    a: 'No. Paid tiers include the full platform. Pricing tiers adjust operational limits like SKUs, storage, invites, and translation volume.',
  },
  {
    q: 'What happens when we hit a limit?',
    a: 'Usage warnings appear in-product. You can upgrade immediately, and your existing workspace structure remains intact.',
  },
]

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com'

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

  const registerFreeHref = buildAppAuthUrl('register', {
    planInterest: 'free',
    postLoginRedirectPath: '/onboarding?create=1&origin=marketing_pricing_free',
  })

  const registerByPlan: Record<PaidPlan['id'], string> = {
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
    trackMarketingEvent('redirect_to_register', {
      page: 'pricing',
      section,
      ctaLabel,
      planInterest,
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <MarketingFunnelTracker page="pricing" />

      <div className="min-h-screen bg-[var(--color-background)]">
        <section className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-10 text-center shadow-[var(--shadow-soft)] sm:px-10">
            <span className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-muted)]">
              Transparent workspace pricing
            </span>
            <h1 className="mt-6 text-3xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)] sm:text-5xl md:text-6xl">
              Pay per workspace. Upgrade when your operations outgrow free.
            </h1>
            <p className="mt-5 text-base leading-[1.7] text-[var(--color-foreground-muted)] sm:text-lg">
              Growth is the default paid path for active supplement teams. No per-seat surprises, and no
              feature lockouts once you are on a paid plan.
            </p>
          </div>
        </section>

        <section className="px-4 pb-6 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-5 shadow-[var(--shadow-soft)] sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-muted)]">
                Free sandbox
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--color-foreground)]">
                Evaluate the platform before paying.
              </p>
              <p className="mt-2 text-sm text-[var(--color-foreground-muted)]">
                10 active SKUs, 2 GB storage, 1 internal user, and 2 partner invites.
              </p>
              <Link
                href={registerFreeHref}
                onClick={() => {
                  trackMarketingEvent('pricing_cta_click', {
                    page: 'pricing',
                    section: 'free_strip',
                    ctaLabel: 'Start free',
                    planInterest: 'free',
                  })
                  trackRegisterRedirect('free_strip', 'Start free', 'free')
                }}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-foreground)]"
              >
                Start free
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
            {paidPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border p-6 shadow-[var(--shadow-soft)] transition-transform duration-200 hover:-translate-y-0.5 ${
                  plan.popular
                    ? 'border-[#8eb0f7] bg-gradient-to-b from-[#edf4ff] to-[#e6f0ff]'
                    : 'border-[var(--color-border)] bg-[var(--color-surface)]'
                }`}
              >
                {plan.popular ? (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold text-[var(--color-accent-foreground)]">
                      Default Team Plan
                    </span>
                  </div>
                ) : null}

                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-[var(--color-foreground)]">{plan.name}</h2>
                  <p className="mt-2 text-sm leading-[1.6] text-[var(--color-foreground-muted)]">{plan.description}</p>
                </div>

                <div className="mb-5 flex items-end gap-1">
                  <span className="text-4xl font-semibold text-[var(--color-foreground)]">{plan.priceLabel}</span>
                  <span className="mb-1 text-sm text-[var(--color-foreground-muted)]">/month</span>
                </div>

                <Link
                  href={registerByPlan[plan.id]}
                  onClick={() => {
                    trackMarketingEvent('plan_cta_click', {
                      page: 'pricing',
                      section: 'plan_cards',
                      ctaLabel: `Start ${plan.name}`,
                      planInterest: plan.id,
                    })
                    trackRegisterRedirect('plan_cards', `Start ${plan.name}`, plan.id)
                  }}
                  className={`mb-6 inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:brightness-95'
                      : 'border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-foreground)] hover:bg-[var(--color-surface-strong)]'
                  }`}
                >
                  Start {plan.name}
                  <ArrowRight size={14} />
                </Link>

                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-[var(--color-foreground-muted)]">
                      <Check className="mt-0.5 h-4 w-4 text-[var(--color-success)]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)] sm:text-3xl">
              Included in every paid plan
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                'Full PIM and variant support',
                'Full DAM with versioning',
                'COA and label document workflows',
                'Market, locale, and destination controls',
                'Partner sharing and scoped access',
                'In-product usage visibility and upgrade prompts',
              ].map((feature) => (
                <div key={feature} className="flex items-start gap-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-3 py-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--color-success)]" />
                  <p className="text-sm text-[var(--color-foreground-muted)]">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)] sm:text-4xl">
              Common questions
            </h2>
            <div className="mt-8 space-y-3">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-soft)]">
                  <h3 className="text-base font-semibold text-[var(--color-foreground)]">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-[1.7] text-[var(--color-foreground-muted)]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 pt-12 sm:px-6">
          <div className="mx-auto max-w-2xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center shadow-[var(--shadow-card)]">
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)] sm:text-4xl">
              Start free, then scale into Growth when usage demands it.
            </h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={registerByPlan.growth}
                onClick={() => {
                  trackMarketingEvent('pricing_cta_click', {
                    page: 'pricing',
                    section: 'final_cta',
                    ctaLabel: 'Start with Growth path',
                    planInterest: 'growth',
                  })
                  trackRegisterRedirect('final_cta', 'Start with Growth path', 'growth')
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                Start free
                <ArrowRight size={16} />
              </Link>
              <a
                href="mailto:sales@stackcess.com?subject=Stackcess%20Pricing%20Questions"
                className="inline-flex items-center justify-center rounded-lg border border-[var(--color-border)] px-6 py-3 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-surface-muted)]"
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
