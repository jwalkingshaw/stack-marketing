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
    { label: 'Partner portal', href: '/partner-portal-for-supplement-brands' },
    { label: 'Content syndication', href: '/product-content-syndication-for-supplement-brands' },
    { label: 'Product catalog management', href: '/supplement-product-catalog-management' },
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
      setIsScrolled(window.scrollY > 60)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerClasses = `fixed left-0 right-0 top-[3rem] z-[60] h-[72px] transition-all duration-200 ${
    isScrolled
      ? 'border-b border-[var(--border-subtle)] bg-[rgba(250,249,245,0.92)] shadow-[0_12px_30px_rgba(26,24,20,0.05)] backdrop-blur-[12px]'
      : 'border-b border-transparent bg-transparent'
  }`

  return (
    <header className={headerClasses}>
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="mx-auto w-full max-w-none xl:max-w-[1480px]">
          <div className="relative flex h-[72px] w-full items-center justify-between gap-5">
          <div className="flex items-center">
            <Link href={logoHref} className="flex items-center space-x-2.5">
              <span className="block sm:hidden">
                <Image
                  src="/stackcess-icon-b-logo.svg"
                  alt="Stackcess"
                  width={24}
                  height={24}
                  className="h-6 w-6 flex-shrink-0"
                />
              </span>
              <span className="hidden sm:block">
                <Image
                  src="/stackcess-full-logo.svg"
                  alt="Stackcess"
                  width={164}
                  height={32}
                  className="h-8 w-auto flex-shrink-0"
                />
              </span>
            </Link>
          </div>

          <div className="absolute left-1/2 hidden -translate-x-1/2 transform items-center justify-center md:flex">
            <nav className="flex items-center gap-5">
              <div
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setSolutionsOpen((open) => !open)}
                  className={`inline-flex items-center gap-1 border-b px-0 py-1 text-[15px] font-medium transition-colors ${
                    isSolutionsActive
                      ? 'border-[var(--color-accent)] text-[var(--color-foreground)]'
                      : 'border-transparent text-[var(--text-secondary)] hover:border-[var(--border-default)] hover:text-[var(--color-foreground)]'
                  }`}
                  aria-expanded={solutionsOpen}
                  aria-haspopup="menu"
                >
                  Solutions
                  <ChevronDown className={`h-4 w-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
                </button>

                {solutionsOpen ? (
                  <div className="absolute left-1/2 top-full z-20 w-[21rem] -translate-x-1/2 pt-3">
                    <div className="grid gap-1 rounded-2xl border border-[var(--border-subtle)] bg-[rgba(250,249,245,0.98)] p-2 shadow-[var(--shadow-card)] backdrop-blur">
                      {solutionItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setSolutionsOpen(false)}
                            className={`rounded-xl px-3 py-2.5 text-[15px] transition-colors ${
                              isActive
                                ? 'bg-[var(--bg-secondary)] text-[var(--color-foreground)]'
                                : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--color-foreground)]'
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
                    className={`border-b px-0 py-1 text-[15px] font-medium transition-colors ${
                      isActive
                        ? 'border-[var(--color-accent)] text-[var(--color-foreground)]'
                        : 'border-transparent text-[var(--text-secondary)] hover:border-[var(--border-default)] hover:text-[var(--color-foreground)]'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="hidden items-center gap-2.5 md:flex xl:pr-4 2xl:pr-0">
            {onLogin ? (
              <button
                type="button"
                onClick={onLogin}
                className="h-10 px-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--color-foreground)]"
              >
                Log in
              </button>
            ) : null}
            {onRegister ? (
              <button
                type="button"
                onClick={onRegister}
                className="marketing-primary-button group inline-flex h-10 min-w-[8.9rem] items-center justify-center gap-1.5 border border-[var(--color-primary)] bg-[var(--color-primary)] px-5.5 text-sm font-semibold transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                Start Free
                <span className="marketing-button-arrow" aria-hidden="true">-&gt;</span>
              </button>
            ) : null}
            {children}
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {onRegister ? (
              <button
                type="button"
                onClick={onRegister}
                className="marketing-primary-button h-10 min-w-[7.8rem] border border-[var(--color-primary)] bg-[var(--color-primary)] px-4.5 text-xs font-semibold transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                Start Free
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[rgba(250,249,245,0.86)] text-[var(--text-secondary)] transition-colors hover:text-[var(--color-foreground)]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-[var(--border-subtle)] bg-[rgba(250,249,245,0.96)] px-4 py-4 backdrop-blur md:hidden">
          <nav className="grid gap-2">
            <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--color-surface)] px-3 py-3">
              <div className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Solutions
              </div>
              <div className="grid gap-1">
                {solutionItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-2 py-2 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--color-foreground)]"
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
                className="rounded-xl px-3 py-2.5 text-sm text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--color-foreground)]"
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
              className="mt-3 w-full rounded-xl border border-[var(--border-subtle)] px-3 py-2.5 text-sm font-medium text-[var(--color-foreground)] transition-colors hover:bg-[var(--bg-secondary)]"
            >
              Log in
            </button>
          ) : null}
        </div>
      ) : null}
    </header>
  )
}
