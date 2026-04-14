import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildAppAuthUrl } from '@/lib/app-links'

export const metadata: Metadata = {
  title: 'About - Stackcess',
  description:
    'We built Stackcess because the sports supplement industry deserved better than spreadsheets, shared drives, and email threads.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About - Stackcess',
    description:
      'We built Stackcess because the sports supplement industry deserved better than spreadsheets, shared drives, and email threads.',
    url: '/about',
  },
  twitter: {
    title: 'About - Stackcess',
    description:
      'We built Stackcess because the sports supplement industry deserved better than spreadsheets, shared drives, and email threads.',
  },
}

export default function AboutPage() {
  const registerHref = buildAppAuthUrl('register', {
    planInterest: 'growth',
    postLoginRedirectPath: '/onboarding?create=1&origin=marketing_about',
  })

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-muted)]">
          Why we built this
        </p>

        <h1 className="mb-10 text-3xl font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--color-foreground)] sm:text-4xl">
          We got tired of watching great products get managed badly.
        </h1>

        <div className="space-y-6 text-base leading-[1.75] text-[var(--color-foreground-muted)] sm:text-lg">
          <p>
            Spend time inside sports supplement brands and you find the same picture. Box over here.
            Google Drive over there. An internal build that only two people understand. Ops teams still
            sending giant attachment threads. Nobody has the same version of anything.
          </p>
          <p>
            Teams tried to fix it with generic DAMs and file-sharing tools, but those tools do not understand
            supplement workflows. A COA belongs to a specific product. An approved label can be market-specific.
            Onboarding a retailer in Germany should not mean blasting all files to everyone.
          </p>
          <p>
            Launches became improvised projects: hero images, pack shots, approved copy, specs, regulatory docs,
            and variant details spread everywhere. Every new market registration restarted the same scramble.
          </p>
          <p>
            We built Stackcess to replace that scramble with a system: one workspace where catalog, assets,
            documents, and partner relationships live together, and where distribution is a workflow instead of a fire drill.
          </p>
        </div>

        <div className="my-14 h-px bg-[var(--color-border)]" />

        <h2 className="mb-8 text-xl font-semibold tracking-[-0.01em] text-[var(--color-foreground)]">
          What we believe
        </h2>
        <div className="space-y-8">
          <div>
            <p className="mb-2 text-sm font-semibold text-[var(--color-foreground)]">Built for this industry, not adapted for it.</p>
            <p className="text-sm leading-[1.7] text-[var(--color-foreground-muted)]">
              Generic tools can be bent into supplement workflows. We build directly for SKU hierarchies,
              regulatory docs, and multi-market partner relationships.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-[var(--color-foreground)]">The whole network matters.</p>
            <p className="text-sm leading-[1.7] text-[var(--color-foreground-muted)]">
              A brand content problem is also a retailer problem and a distributor problem. The system works
              when every participant gets operational value.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-[var(--color-foreground)]">Complexity should feel simple.</p>
            <p className="text-sm leading-[1.7] text-[var(--color-foreground-muted)]">
              Market scoping, variant structures, and partner access control should be usable without consultants.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--color-border)] pt-10">
          <p className="mb-5 text-sm text-[var(--color-foreground-muted)]">
            If this sounds like your operation, the free plan is the fastest way to validate it.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href={registerHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-foreground)]"
            >
              Start sandbox
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/roadmap"
              className="text-sm text-[var(--color-foreground-muted)] transition-colors hover:text-[var(--color-foreground)]"
            >
              Shape the roadmap
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

