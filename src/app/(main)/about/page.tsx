import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buildAppAuthUrl } from '@/lib/app-links'

export const metadata: Metadata = {
  title: 'About - Stackcess',
  description:
    'We built Stackcess because sales and marketing teams needed one place to manage product data, approved assets, localization, and partner syndication.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About - Stackcess',
    description:
      'We built Stackcess because sales and marketing teams needed one place to manage product data, approved assets, localization, and partner syndication.',
    url: '/about',
  },
  twitter: {
    title: 'About - Stackcess',
    description:
      'We built Stackcess because sales and marketing teams needed one place to manage product data, approved assets, localization, and partner syndication.',
  },
}

export default function AboutPage() {
  const registerHref = buildAppAuthUrl('register', {
    planInterest: 'growth',
    postLoginRedirectPath: '/onboarding?create=1&origin=marketing_about',
  })

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-6 sm:py-28">
        <p className="mb-8 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-foreground-muted)]">
          Why we built this
        </p>

        <h1 className="mb-10 font-[var(--font-display-serif)] text-[2.3rem] font-normal leading-[1.1] tracking-[-0.025em] text-[var(--color-foreground)] sm:mb-12 sm:text-[3.65rem]">
          We built Stackcess because product content operations should not depend on spreadsheets, folders, and resend requests.
        </h1>

        <div className="mt-12 border-t border-[var(--color-border)]/70 pt-5 space-y-7 text-[1.04rem] leading-[1.9] text-[var(--color-foreground-muted)] sm:mt-14 sm:pt-6 sm:text-[1.14rem]">
          <p>
            Spend time inside sales and marketing teams and you find the same pattern. Product data lives in one tool.
            Assets live somewhere else. Localization happens in documents and chat threads. Partners still ask for
            files by email because there is no controlled place to get the current version.
          </p>
          <p>
            Teams try to patch it together with a PIM, a DAM, file sharing, and manual exports. That stack creates
            more handoffs, more duplicated work, and more uncertainty about what is approved for each market,
            language, and partner.
          </p>
          <p>
            The problem gets worse as brands expand. Every market needs tailored copy. Every channel wants a different
            format. Every retailer, distributor, and agency needs access to the right content without seeing
            everything else.
          </p>
          <p>
            We built Stackcess to replace that scramble with one system: a unified PIM + DAM with AI-assisted
            localization and partner-ready syndication. Product data, approved assets, market rules, and partner
            delivery live in the same operating model.
          </p>
        </div>

        <div className="my-14 h-px bg-[var(--color-border)]" />

        <h2 className="mb-8 font-[var(--font-display-serif)] text-[2rem] font-normal leading-[1.1] tracking-[-0.025em] text-[var(--color-foreground)] sm:text-[2.3rem]">
          What we believe
        </h2>
        <div className="space-y-8">
          <div>
            <p className="mb-3 text-lg font-semibold leading-[1.3] text-[var(--color-foreground)]">One source of truth should include both product data and assets.</p>
            <p className="text-[1rem] leading-[1.85] text-[var(--color-foreground-muted)] sm:text-[1.05rem]">
              A product record is not complete without the approved files, copy, and documents attached to it.
              We design for structured product content and governed asset workflows together.
            </p>
          </div>
          <div>
            <p className="mb-3 text-lg font-semibold leading-[1.3] text-[var(--color-foreground)]">Localization should be part of the workflow, not a side project.</p>
            <p className="text-[1rem] leading-[1.85] text-[var(--color-foreground-muted)] sm:text-[1.05rem]">
              Multi-market teams need faster adaptation with consistent terminology, brand tone, and market-aware
              guidance. That work belongs inside the product content system itself.
            </p>
          </div>
          <div>
            <p className="mb-3 text-lg font-semibold leading-[1.3] text-[var(--color-foreground)]">Partner delivery should be controlled, not improvised.</p>
            <p className="text-[1rem] leading-[1.85] text-[var(--color-foreground-muted)] sm:text-[1.05rem]">
              Retailers, distributors, and agencies need current content in a format they can use. Brands need
              scoped access, clean handoff, and less manual resend work.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-[var(--color-border)] pt-10">
          <p className="mb-6 text-[1rem] leading-[1.8] text-[var(--color-foreground-muted)] sm:text-[1.05rem]">
            If your team is juggling product data, assets, localization, and partner requests across separate tools,
            the free plan is the fastest way to see the model in practice.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href={registerHref}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-foreground)]"
            >
              Start Free
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
