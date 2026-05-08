import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildAppAuthUrl } from '@/lib/app-links'

export const metadata: Metadata = {
  title: 'About - Stackcess',
  description:
    'We built Stackcess because product data, approved assets, localization, and partner delivery should not live in separate systems.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About - Stackcess',
    description:
      'We built Stackcess because product data, approved assets, localization, and partner delivery should not live in separate systems.',
    url: '/about',
  },
  twitter: {
    title: 'About - Stackcess',
    description:
      'We built Stackcess because product data, approved assets, localization, and partner delivery should not live in separate systems.',
  },
}

export default function AboutPage() {
  const registerHref = buildAppAuthUrl('register', {
    planInterest: 'growth',
    postLoginRedirectPath: '/onboarding?create=1&origin=marketing_about',
  })

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <section className="px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-12">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-10 xl:grid-cols-[0.92fr_1.08fr] xl:items-end">
            <div className="max-w-3xl">
              <p className="marketing-kicker">Why We Built This</p>
              <h1 className="mt-7 pb-6 text-[3rem] font-medium tracking-[-0.018em] text-[var(--color-foreground)] !leading-[1.06] sm:text-[4rem] lg:text-[4.8rem] xl:text-[5.6rem]">
                We didn&apos;t research
                <br />
                this problem.
                <br />
                <span className="marketing-hero-word">We had it.</span>
              </h1>
              <p className="marketing-section-copy max-w-2xl text-[var(--text-secondary)]">
                Stackcess started from managing product content for a sports nutrition brand selling across multiple
                markets through Amazon, distributors, and retail partners. Every launch had the same pattern: right
                product, right formula, wrong assets.
              </p>
            </div>

            <div className="marketing-ui-panel marketing-diagonal-texture p-6 sm:p-8">
              <p className="marketing-mono text-[0.66rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                The repeated failure pattern
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  ['Outdated labels', 'Partners were still working from old links and old packaging files.'],
                  ['Missing docs', 'COAs, specs, and support files were scattered across folders and inboxes.'],
                  ['Drift by market', 'Copy, claims, and assets changed unevenly as more markets came online.'],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-[1rem] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.76)] p-4">
                    <p className="marketing-mono text-[0.63rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      {title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-tertiary)] px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-[1180px]">
          <div className="rounded-[1.75rem] border border-[rgba(26,24,20,0.08)] bg-[rgba(250,249,245,0.78)] px-6 py-8 shadow-[var(--shadow-soft)] sm:px-10 sm:py-10">
            <p className="marketing-kicker">Origin</p>
            <div className="mt-7 max-w-4xl space-y-6 text-[1.1rem] leading-8 text-[var(--text-secondary)] sm:text-[1.18rem] sm:leading-9">
              <p>
                Stackcess started from managing product content for a sports nutrition brand selling across multiple
                markets through Amazon, distributors, and retail partners. Every launch had the same pattern: right
                product, right formula, wrong assets. Outdated labels. Missing COAs. Partners working from old links.
              </p>
              <p>
                There was no tool built for how supplement brands actually operate. Product data lived in one place.
                Assets lived somewhere else. Localization happened in documents and chat threads. Partner delivery
                still depended on someone resending the current pack.
              </p>
              <p className="text-[var(--color-foreground)]">
                There was no tool built for how supplement brands actually operate. So we built one.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="marketing-kicker">What We Believe</p>
            <h2 className="mt-7 pb-6 text-[2.7rem] font-normal tracking-[-0.018em] text-[var(--color-foreground)] !leading-[1.06] sm:text-[4rem]">
              Product content
              <br />
              is an operating system.
            </h2>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: 'A source record is not complete without the assets attached to it.',
                body: 'A product record should hold the approved copy, imagery, documents, and destination rules together rather than splitting them across separate tools.',
              },
              {
                title: 'Localization belongs inside the workflow, not beside it.',
                body: 'Multi-market teams need market-aware adaptation with consistent terminology, voice, and compliance logic built into the operating layer.',
              },
              {
                title: 'Partner delivery should be structured, scoped, and current.',
                body: 'Retailers, distributors, and agencies need current files without seeing everything else or waiting for a resend from your team.',
              },
            ].map((belief, index) => (
              <div
                key={belief.title}
                className={`grid gap-5 rounded-[1.25rem] border border-[var(--border-subtle)] bg-white px-5 py-5 shadow-[var(--shadow-soft)] md:grid-cols-[4.5rem_1fr_1.08fr] ${
                  index === 1 ? 'md:translate-x-8' : ''
                }`}
              >
                <span className="marketing-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  0{index + 1}
                </span>
                <h3 className="text-[1.8rem] font-normal tracking-[-0.014em] text-[var(--color-foreground)] !leading-[1.12]">
                  {belief.title}
                </h3>
                <p className="marketing-detail-copy text-[var(--text-secondary)]">{belief.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border-subtle)] px-4 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="marketing-kicker">What Stackcess Replaces</p>
            <h2 className="mt-7 pb-6 text-[2.7rem] font-normal tracking-[-0.018em] text-[var(--color-foreground)] !leading-[1.06] sm:text-[4rem]">
              Not another
              <br />
              tool in the chain.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Spreadsheet logic', 'Claim mapping, market notes, and pack variations should not depend on tabs nobody wants to own.'],
              ['Folder archaeology', 'Teams should not have to search shared drives to discover what the current pack shot actually is.'],
              ['Email resend loops', 'A partner needing current files should not trigger another manual assembly request.'],
              ['Workflow drift', 'As more markets and channels come online, the system should tighten control instead of multiplying variations.'],
            ].map(([title, body]) => (
              <div key={title} className="rounded-[1.25rem] border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-5">
                <p className="marketing-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--color-accent)]">{title}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--bg-dark)] px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
        <div className="mx-auto grid max-w-[1280px] gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="marketing-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
              See the model
            </p>
            <h2 className="mt-4 max-w-3xl text-[2.6rem] font-medium tracking-[-0.018em] !text-[var(--bg-primary)] !leading-[1.06] sm:text-[4rem]">
              If your team is still stitching this together across tools, start with one workspace.
            </h2>
            <p className="mt-6 max-w-2xl text-[1.05rem] leading-8 text-[var(--text-muted)]">
              The free plan is the fastest way to see how product data, approved assets, localization, and partner
              delivery work when they sit inside the same operating model.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={registerHref}
              className="marketing-primary-button inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-primary)] bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold hover:bg-[var(--color-primary-hover)]"
            >
              Start Free
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center justify-center rounded-lg border border-[rgba(160,152,144,0.3)] px-6 py-3 text-sm font-semibold text-[var(--bg-primary)] transition-colors hover:border-[var(--bg-primary)]"
            >
              Shape the roadmap
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
