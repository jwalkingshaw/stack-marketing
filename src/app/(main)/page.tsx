'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2, Layers, ShieldCheck, Target } from 'lucide-react'
import { EmailSignup } from '@/components/forms'
import MarketingFunnelTracker from '@/components/MarketingFunnelTracker'
import { buildAppAuthUrl } from '@/lib/app-links'
import { trackMarketingEvent } from '@/lib/marketing-analytics'
import { generateBreadcrumbSchema } from '@/lib/schema'

type PlanId = 'starter' | 'growth' | 'scale'

const problems = [
  {
    title: 'Stale assets still reach retail pages',
    detail:
      'Old pack shots and copy survive in inbox threads, so launch teams spend week one on rework instead of execution.',
  },
  {
    title: 'Launch readiness is spread across too many tools',
    detail:
      'Catalog fields, labels, COAs, translations, and approvals are not in one operational view.',
  },
  {
    title: 'Every market rollout repeats compliance work',
    detail:
      'Teams rebuild routing and document handoffs each cycle because distribution is not scoped by destination.',
  },
]

const steps = [
  {
    title: 'Model products once',
    detail: 'Create parent and variant structure once so every downstream launch starts from clean SKU data.',
    icon: Layers,
  },
  {
    title: 'Attach assets and compliance',
    detail: 'Bind imagery, copy, labels, and COAs directly to SKU records with version history.',
    icon: ShieldCheck,
  },
  {
    title: 'Distribute by market and partner',
    detail: 'Ship approved content to destination scopes only, with full audit visibility.',
    icon: Target,
  },
]

const faqItems = [
  {
    q: 'Do we pay per seat?',
    a: 'No. Billing is workspace-based. Plan limits are operational caps, not per-user charges.',
  },
  {
    q: 'Do partners need paid accounts?',
    a: 'No. Partners can receive shared content for free. Invite capacity scales by plan.',
  },
  {
    q: 'Are features locked by tier?',
    a: 'No. Paid plans include the full product. Tiers differ by scale limits only.',
  },
  {
    q: 'What happens when we hit limits?',
    a: 'In-app threshold warnings appear and teams can upgrade immediately.',
  },
]

const planRows: Array<{ id: PlanId; name: string; price: string; description: string }> = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$49 / month',
    description: 'Lower-volume entry for teams building launch discipline.',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$129 / month',
    description: 'Default for active brand ops and marketing teams shipping across markets.',
  },
  {
    id: 'scale',
    name: 'Scale',
    price: '$299 / month',
    description: 'For global teams with high SKU, partner, and localization volume.',
  },
]

export default function Home() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: process.env.NEXT_PUBLIC_SITE_URL || 'https://stackcess.com' },
  ])

  const registerGrowthHref = buildAppAuthUrl('register', {
    planInterest: 'growth',
    postLoginRedirectPath: '/onboarding?create=1&origin=marketing_home',
  })

  const registerByPlan: Record<PlanId, string> = {
    starter: buildAppAuthUrl('register', {
      planInterest: 'starter',
      postLoginRedirectPath: '/onboarding?create=1&origin=marketing_home_plan_starter',
    }),
    growth: buildAppAuthUrl('register', {
      planInterest: 'growth',
      postLoginRedirectPath: '/onboarding?create=1&origin=marketing_home_plan_growth',
    }),
    scale: buildAppAuthUrl('register', {
      planInterest: 'scale',
      postLoginRedirectPath: '/onboarding?create=1&origin=marketing_home_plan_scale',
    }),
  }

  const salesHref = 'mailto:sales@stackcess.com?subject=Stackcess%20Demo%20Request'

  const trackRegisterRedirect = (section: string, ctaLabel: string, planInterest: string) => {
    trackMarketingEvent('redirect_to_register', {
      page: 'home',
      section,
      ctaLabel,
      planInterest,
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <MarketingFunnelTracker page="home" trackScroll />

      <div className="bg-[var(--color-background)]">
        <section className="-mt-16 px-4 pb-20 pt-36 sm:px-6 sm:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-subtle)]">
                  Stackcess for supplement brand ops and marketing
                </p>
                <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[0.9] text-[var(--color-foreground)] sm:text-6xl lg:text-7xl">
                  Launch content should not live in inbox threads.
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-[1.75] text-[var(--color-foreground-muted)] sm:text-lg">
                  Stackcess connects SKU data, approved assets, compliance docs, and partner distribution so teams ship
                  faster without version confusion.
                </p>

                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href={registerGrowthHref}
                    onClick={() => {
                      trackMarketingEvent('hero_cta_click', {
                        page: 'home',
                        section: 'hero',
                        ctaLabel: 'Start free',
                        planInterest: 'growth',
                      })
                      trackRegisterRedirect('hero', 'Start free', 'growth')
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-[var(--color-primary)] px-7 py-3.5 text-sm font-semibold text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-primary-hover)]"
                  >
                    Start free
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/pricing"
                    onClick={() => {
                      trackMarketingEvent('pricing_cta_click', {
                        page: 'home',
                        section: 'hero',
                        ctaLabel: 'See pricing',
                      })
                    }}
                    className="inline-flex items-center justify-center bg-[var(--color-surface)] px-7 py-3.5 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-surface-muted)]"
                  >
                    See pricing
                  </Link>
                </div>

                <p className="mt-4 text-xs text-[var(--color-foreground-subtle)]">
                  No credit card required. Teams typically move to Growth when SKU, partner, or localization
                  volume outgrows free limits.
                </p>
              </div>

              <div className="bg-gradient-to-b from-[#07183d] via-[#0a1f4e] to-[#08142d] p-5 text-slate-100 shadow-[var(--shadow-card)]">
                <div className="space-y-3">
                  <div className="bg-slate-900/70 p-3.5">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-300">Launch status</p>
                      <span className="bg-emerald-500/25 px-2.5 py-1 text-[11px] font-semibold text-emerald-200">
                        18 of 22 SKUs approved
                      </span>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="bg-slate-800/80 px-3 py-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Nitro Surge 30 Serve</span>
                          <span className="bg-slate-700 px-2 py-0.5 text-[11px]">Ready</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">Pack shots, label, COA, and copy linked</p>
                      </div>
                      <div className="bg-slate-800/80 px-3 py-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Hydrate Plus Orange</span>
                          <span className="bg-amber-500/20 px-2 py-0.5 text-[11px] text-amber-200">In review</span>
                        </div>
                        <p className="mt-1 text-xs text-slate-400">EU label pending, AU packet ready</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="bg-slate-900/70 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-300">Distribution queue</p>
                      <p className="mt-1 text-sm text-slate-100">EU Retail Bundle</p>
                      <p className="mt-1 text-xs text-slate-400">12 partners, scoped docs and copy</p>
                    </div>
                    <div className="bg-slate-900/70 p-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-300">Progress</p>
                      <div className="mt-2 h-2 bg-slate-700">
                        <div className="h-2 w-[72%] bg-[#4ade80]" />
                      </div>
                      <p className="mt-1 text-xs text-slate-400">72% release complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-2 border-t border-[var(--color-border)] pt-4 text-xs font-semibold uppercase tracking-[0.07em] text-[var(--color-foreground-muted)] md:grid-cols-3">
              {[
                'SKU anchored launch packets',
                'Market scoped compliance delivery',
                'Partner access with audit trail',
              ].map((item) => (
                <div key={item} className="pl-3">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-[0.86fr_1.14fr]">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-subtle)]">
                  Problem Proof
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-[1] text-[var(--color-foreground)] sm:text-5xl">
                  Why launch operations break for supplement brands.
                </h2>
                <p className="mt-4 text-sm leading-[1.8] text-[var(--color-foreground-muted)] sm:text-base">
                  The friction is structural, not tactical.
                </p>
              </div>

              <div className="border-l border-[var(--color-border)] pl-6 sm:pl-10">
                {problems.map((item, idx) => (
                  <div key={item.title} className={`${idx > 0 ? 'mt-10 border-t border-[var(--color-border)] pt-10' : ''}`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--color-foreground-subtle)]">
                      0{idx + 1}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold leading-[1.1] text-[var(--color-foreground)]">{item.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-[1.8] text-[var(--color-foreground-muted)] sm:text-base">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="product-workflows" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-subtle)]">Mechanism</p>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-[1] text-[var(--color-foreground)] sm:text-5xl">
              One operating sequence from product model to partner release.
            </h2>

            <div className="mt-10 border-t border-[var(--color-border)]">
              {steps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <div
                    key={step.title}
                    className={`grid gap-6 py-7 md:grid-cols-[120px_1fr_auto] md:items-start ${
                      idx < steps.length - 1 ? 'border-b border-[var(--color-border)]' : ''
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-subtle)]">
                      Step {idx + 1}
                    </p>
                    <div>
                      <h3 className="text-2xl font-semibold leading-[1.1] text-[var(--color-foreground)]">{step.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-[1.8] text-[var(--color-foreground-muted)] sm:text-base">
                        {step.detail}
                      </p>
                    </div>
                    <Icon className="hidden h-5 w-5 text-[var(--color-accent)] md:block" />
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-subtle)]">Workflow Proof</p>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-[1] text-[var(--color-foreground)] sm:text-5xl">
              Two output bundles teams ship every week.
            </h2>

            <div className="mt-10 bg-gradient-to-b from-[#07183f] to-[#08142b] p-5 text-slate-100 shadow-[var(--shadow-card)]">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="bg-slate-900/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-300">Launch Kit Workflow</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    <li>- Hero images and pack shots linked to launch SKUs</li>
                    <li>- Approved product copy in market languages</li>
                    <li>- Spec sheet and channel-ready product data</li>
                    <li>- Scheduled partner release on launch date</li>
                  </ul>
                </div>
                <div className="bg-slate-900/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-300">Regulatory Kit Workflow</p>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    <li>- Version-locked COAs and approved labels</li>
                    <li>- Market-specific document routing by scope</li>
                    <li>- Full audit trail of partner delivery</li>
                    <li>- Instant revocation when scope changes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-subtle)]">Why Teams Pay</p>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-[1] text-[var(--color-foreground)] sm:text-5xl">
              Upgrade is triggered by operational volume, not feature gating.
            </h2>

            <div className="mt-10 overflow-x-auto bg-[var(--color-surface)]">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-subtle)]">
                      Operational Limit
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-subtle)]">
                      Starter
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-subtle)]">
                      Growth
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-subtle)]">
                      Scale
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    ['Active SKUs', '50', '500', '2,500'],
                    ['Storage', '15 GB', '100 GB', '500 GB'],
                    ['Partner Invites', '10', '100', 'Unlimited'],
                    ['Translation Volume', '750K chars', '3M chars', '12M chars'],
                  ].map((row, idx) => (
                    <tr key={row[0]} className={idx < 3 ? 'border-b border-[var(--color-border)]' : ''}>
                      <td className="px-5 py-3 font-semibold text-[var(--color-foreground)]">{row[0]}</td>
                      <td className="px-5 py-3 text-[var(--color-foreground-muted)]">{row[1]}</td>
                      <td className="px-5 py-3 text-[var(--color-foreground-muted)]">{row[2]}</td>
                      <td className="px-5 py-3 text-[var(--color-foreground-muted)]">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-subtle)]">Pricing Preview</p>
            <h2 className="mt-3 max-w-4xl text-3xl font-semibold leading-[1] text-[var(--color-foreground)] sm:text-5xl">
              Pick the plan that matches current volume.
            </h2>

            <div className="mt-10 border-y border-[var(--color-border)]">
              {planRows.map((plan, idx) => (
                <div
                  key={plan.id}
                  className={`grid gap-3 py-6 sm:grid-cols-[1fr_auto] sm:items-center ${idx < planRows.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-subtle)]">
                      {plan.name}
                    </p>
                    <p className="mt-1 text-xl font-semibold text-[var(--color-foreground)]">{plan.price}</p>
                    <p className="mt-1 text-sm leading-[1.75] text-[var(--color-foreground-muted)]">{plan.description}</p>
                  </div>
                  <Link
                    href={registerByPlan[plan.id]}
                    onClick={() => {
                      trackMarketingEvent('plan_cta_click', {
                        page: 'home',
                        section: 'pricing_preview',
                        ctaLabel: `Start ${plan.name}`,
                        planInterest: plan.id,
                      })
                      trackRegisterRedirect('pricing_preview', `Start ${plan.name}`, plan.id)
                    }}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold ${
                      plan.id === 'growth'
                        ? 'bg-[var(--color-accent)] text-[var(--color-accent-foreground)]'
                        : 'bg-[var(--color-surface-muted)] text-[var(--color-foreground)]'
                    }`}
                  >
                    Start {plan.name}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-subtle)]">FAQ</p>
            <h2 className="mt-3 text-center text-3xl font-semibold leading-[1] text-[var(--color-foreground)] sm:text-5xl">
              Questions teams ask before buying
            </h2>

            <div className="mt-10 border-y border-[var(--color-border)]">
              {faqItems.map((item, idx) => (
                <div key={item.q} className={`py-5 ${idx < faqItems.length - 1 ? 'border-b border-[var(--color-border)]' : ''}`}>
                  <h3 className="text-base font-semibold text-[var(--color-foreground)]">{item.q}</h3>
                  <p className="mt-2 text-sm leading-[1.8] text-[var(--color-foreground-muted)]">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-24 pt-18 sm:px-6">
          <div className="mx-auto max-w-6xl bg-gradient-to-br from-[#08183f] via-[#0f2f71] to-[#174792] p-8 shadow-[var(--shadow-card)] sm:p-10">
            <h2 className="mx-auto max-w-3xl text-center text-3xl font-semibold leading-[0.95] text-white sm:text-5xl">
              Ready to run launches without content chaos?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-[1.7] text-blue-100 sm:text-xl">
              Start free now. Upgrade only when your team reaches production limits.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href={registerGrowthHref}
                onClick={() => {
                  trackMarketingEvent('hero_cta_click', {
                    page: 'home',
                    section: 'final_cta',
                    ctaLabel: 'Start free',
                    planInterest: 'growth',
                  })
                  trackRegisterRedirect('final_cta', 'Start free', 'growth')
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#ff5a1f] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#df4a1a]"
              >
                Start free
                <ArrowRight size={18} />
              </Link>
              <a
                href={salesHref}
                className="inline-flex items-center justify-center bg-white/10 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/15"
              >
                Talk to sales
              </a>
            </div>

            <div className="mx-auto mt-8 max-w-md bg-[var(--color-surface)] p-4">
              <EmailSignup
                source="newsletter"
                placeholder="Get product updates by email"
                buttonText="Subscribe"
                successMessage="Thanks. You are subscribed."
                size="default"
                variant="secondary"
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-blue-100">
              {['No per-seat surprises', 'Partners can receive content free', 'Usage-based upgrade path'].map((item) => (
                <span key={item} className="inline-flex items-center gap-1 bg-white/10 px-3 py-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
