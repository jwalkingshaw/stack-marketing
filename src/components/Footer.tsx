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
    <footer className="bg-[var(--bg-dark)] px-4 py-14 text-[var(--bg-primary)] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-10 border-t border-[rgba(160,152,144,0.2)] pt-10 md:grid-cols-4">
          <div>
            <div className="mb-4 text-[15px] font-bold leading-none">Product</div>
            <ul className="space-y-3 text-sm">
              <li><Link href={appHref} className="text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--bg-primary)]">Open App</Link></li>
              <li><Link href={registerHref} className="text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--bg-primary)]">Start Free</Link></li>
              <li><Link href="/pricing" className="text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--bg-primary)]">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[15px] font-bold leading-none">Company</div>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--bg-primary)]">About</Link></li>
              <li><Link href={loginHref} className="text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--bg-primary)]">Log In</Link></li>
              <li><Link href="/roadmap" className="text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--bg-primary)]">Roadmap</Link></li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[15px] font-bold leading-none">Resources</div>
            <ul className="space-y-3 text-sm">
              <li><Link href="/help" className="text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--bg-primary)]">Help Center</Link></li>
              <li><Link href="/news" className="text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--bg-primary)]">News</Link></li>
              <li><a href="mailto:hello@stackcess.com" className="text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--bg-primary)]">hello@stackcess.com</a></li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[15px] font-bold leading-none">Legal</div>
            <ul className="space-y-3 text-sm">
              <li><Link href="/terms" className="text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--bg-primary)]">Terms and Conditions</Link></li>
              <li><Link href="/privacy" className="text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--bg-primary)]">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[rgba(160,152,144,0.2)] pt-8 text-left md:flex-row md:items-center md:justify-between">
          <p className="text-base font-medium leading-relaxed text-[var(--text-muted)]">
            Copyright {new Date().getFullYear()} Stackcess. All rights reserved.
          </p>
          <p className="text-sm text-[var(--text-muted)]">Product content operations for supplement brands.</p>
        </div>
      </div>
    </footer>
  )
}
