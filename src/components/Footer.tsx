'use client'

import Link from 'next/link'
import { buildAppAuthUrl, buildAppUrl } from '@/lib/app-links'

export default function Footer() {
  const loginHref = buildAppAuthUrl('login', { postLoginRedirectPath: '/' })
  const registerHref = buildAppAuthUrl('register', {
    planInterest: 'free',
    postLoginRedirectPath: '/onboarding?create=1&origin=marketing_footer',
  })
  const appHref = buildAppUrl('/')

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-background-elevated)] px-4 py-14 text-[var(--color-foreground)] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 border-b border-[var(--color-border)] pb-8">
          <p className="font-[var(--font-ibm-plex-mono)] text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
            Unified PIM + DAM
          </p>
          <p className="mt-4 max-w-2xl text-base font-semibold leading-[1.55] text-[var(--color-foreground)]">
            Stackcess helps sales and marketing teams manage product content, approved assets, and partner delivery from one system.
          </p>
          <p className="mt-2 text-sm leading-[1.75] text-[var(--color-foreground-muted)] sm:text-[0.98rem]">
            Structured product data, governed assets, AI localization, and partner portal syndication in a single workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          <div>
            <div className="mb-4 text-[15px] font-bold leading-none">App</div>
            <ul className="space-y-3 text-sm">
              <li><Link href={appHref} className="text-[var(--color-foreground-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">Open App</Link></li>
              <li><Link href={loginHref} className="text-[var(--color-foreground-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">Log In</Link></li>
              <li><Link href={registerHref} className="text-[var(--color-foreground-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">Start Free</Link></li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[15px] font-bold leading-none">Solutions</div>
            <ul className="space-y-3 text-sm">
              <li><Link href="/ai-localization-for-supplement-brands" className="text-[var(--color-foreground-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">AI market adaptation</Link></li>
              <li><Link href="/pim-for-supplement-brands" className="text-[var(--color-foreground-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">PIM for supplement brands</Link></li>
              <li><Link href="/dam-for-supplement-brands" className="text-[var(--color-foreground-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">DAM for supplement brands</Link></li>
              <li><Link href="/coa-management-for-supplement-brands" className="text-[var(--color-foreground-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">COA management for supplement brands</Link></li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[15px] font-bold leading-none">Company</div>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-[var(--color-foreground-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">About</Link></li>
              <li><Link href="/help" className="text-[var(--color-foreground-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">Help Center</Link></li>
              <li><Link href="/roadmap" className="text-[var(--color-foreground-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[15px] font-bold leading-none">Legal</div>
            <ul className="space-y-3 text-sm">
              <li><Link href="/terms" className="text-[var(--color-foreground-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">Terms and Conditions</Link></li>
              <li><Link href="/privacy" className="text-[var(--color-foreground-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[15px] font-bold leading-none">Connect</div>
            <ul className="space-y-3 text-sm">
              <li><a href="mailto:hello@stackcess.com" className="text-[var(--color-foreground-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">hello@stackcess.com</a></li>
              <li><a href="https://x.com/stackcessapp" target="_blank" rel="noopener noreferrer" className="text-[var(--color-foreground-muted)] transition-colors duration-200 hover:text-[var(--color-foreground)]">X (Twitter)</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--color-border)] pt-8 text-center">
          <p className="text-base font-medium leading-relaxed text-[var(--color-foreground-muted)]">
            Copyright {new Date().getFullYear()} Stackcess. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
