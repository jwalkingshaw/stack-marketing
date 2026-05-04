'use client'

import React, { useState, useEffect } from 'react'
import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'

interface UnifiedHeaderProps {
  variant: 'marketing'
  isAuthenticated?: boolean
  user?: unknown
  logoHref?: string
  onLogin?: () => void
  onRegister?: () => void
  children?: ReactNode
}

export function UnifiedHeader({
  logoHref = '/',
  onLogin,
  onRegister,
  children,
}: UnifiedHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)
  const pathname = usePathname()

  const solutionItems = [
    { label: 'AI market adaptation', href: '/ai-localization-for-supplement-brands' },
    { label: 'PIM for supplement brands', href: '/pim-for-supplement-brands' },
    { label: 'DAM for supplement brands', href: '/dam-for-supplement-brands' },
    { label: 'COA management', href: '/coa-management-for-supplement-brands' },
  ]

  const navItems = [
    { label: 'Pricing', href: '/pricing' },
    { label: 'News', href: '/news' },
    { label: 'Help', href: '/help' },
    { label: 'About', href: '/about' },
  ]

  const isSolutionsActive = solutionItems.some((item) => pathname === item.href)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 6)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClasses = `fixed left-0 right-0 top-[3rem] z-[60] h-[64px] sm:h-[67px] transition-all duration-300 ${
    isScrolled
      ? 'border-b border-[var(--color-border)] bg-[rgba(251,248,243,0.92)] backdrop-blur'
      : 'border-b border-[var(--color-border)]/70 bg-[rgba(245,241,232,0.82)] backdrop-blur'
  }`

  return (
    <header className={headerClasses}>
      <div className="mx-auto w-full max-w-7xl px-4">
        <div className="relative flex h-[64px] w-full items-center justify-between sm:h-[67px]">
          <div className="flex items-center">
            <Link href={logoHref} className="flex items-center space-x-2">
              <Image
                src="/stackcess-icon-b-logo.svg"
                alt="Stackcess"
                width={24}
                height={24}
                className="h-6 w-6 flex-shrink-0 sm:hidden"
              />
              <Image
                src="/stackcess-full-logo.svg"
                alt="Stackcess"
                width={120}
                height={24}
                className="hidden h-6 w-auto flex-shrink-0 sm:block"
              />
            </Link>
          </div>

          <div className="absolute left-1/2 hidden -translate-x-1/2 transform items-center justify-center md:flex">
            <nav className="flex items-center gap-2">
              <div
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setSolutionsOpen((open) => !open)}
                  className={`inline-flex items-center gap-1 border-b px-1 py-1.5 text-[15px] transition-colors ${
                    isSolutionsActive
                      ? 'border-[var(--color-accent)] text-[var(--color-foreground)]'
                      : 'border-transparent text-[var(--color-foreground-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-foreground)]'
                  }`}
                  aria-expanded={solutionsOpen}
                  aria-haspopup="menu"
                >
                  Solutions
                  <ChevronDown className={`h-4 w-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                </button>

                {solutionsOpen ? (
                  <div className="absolute left-1/2 top-full z-20 w-[21rem] -translate-x-1/2 pt-2">
                    <div className="grid gap-1 border border-[var(--color-border)] bg-[rgba(251,248,243,0.98)] p-2 shadow-[var(--shadow-card)] backdrop-blur">
                      {solutionItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setSolutionsOpen(false)}
                            className={`rounded-[var(--radius)] px-3 py-2.5 text-[15px] transition-colors ${
                              isActive
                                ? 'bg-[var(--color-surface-muted)] text-[var(--color-foreground)]'
                                : 'text-[var(--color-foreground-muted)] hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-foreground)]'
                            }`}
                          >
                            {item.label}
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                ) : null}
              </div>

              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`border-b px-1 py-1.5 text-[15px] transition-colors ${
                      isActive
                        ? 'border-[var(--color-accent)] text-[var(--color-foreground)]'
                        : 'border-transparent text-[var(--color-foreground-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-foreground)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {onLogin ? (
              <button
                type="button"
                onClick={onLogin}
                className="h-9 px-3 text-sm font-medium text-[var(--color-foreground-muted)] transition-colors hover:text-[var(--color-foreground)]"
              >
                Log in
              </button>
            ) : null}
            {onRegister ? (
              <button
                type="button"
                onClick={onRegister}
                className="marketing-primary-button h-9 min-w-[8.75rem] border border-[var(--color-primary)] bg-[var(--color-primary)] px-5 text-sm font-semibold transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                Start Free
              </button>
            ) : null}
            {children}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {onRegister ? (
              <button
                type="button"
                onClick={onRegister}
                className="marketing-primary-button h-9 min-w-[7.5rem] border border-[var(--color-primary)] bg-[var(--color-primary)] px-4 text-xs font-semibold transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                Start Free
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-9 w-9 items-center justify-center text-[var(--color-foreground-muted)] transition-colors hover:text-[var(--color-foreground)]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-[var(--color-border)] bg-[rgba(251,248,243,0.96)] px-4 py-4 backdrop-blur md:hidden">
          <nav className="grid gap-2">
            <div className="rounded-[var(--radius)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-3">
              <div className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Solutions
              </div>
              <div className="grid gap-1">
                {solutionItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-[var(--radius)] px-2 py-2 text-sm text-[var(--color-foreground-muted)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-foreground)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-[var(--radius)] px-3 py-2.5 text-sm text-[var(--color-foreground-muted)] transition-colors hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          {onLogin ? (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false)
                onLogin()
              }}
              className="mt-3 w-full rounded-[var(--radius)] border border-[var(--color-border)] px-3 py-2.5 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-surface-muted)]"
            >
              Log in
            </button>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
