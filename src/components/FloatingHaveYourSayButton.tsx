'use client'

import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export function FloatingHaveYourSayButton() {
  return (
    <Link
      href="/roadmap"
      className="group fixed bottom-6 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-lg transition-all duration-200 hover:bg-[var(--color-primary-hover)] hover:shadow-xl sm:right-6 sm:h-14 sm:w-14"
      aria-label="Have Your Say - Submit Feature Requests"
    >
      <MessageCircle size={20} className="group-hover:scale-110 transition-transform duration-200" />
      
      {/* Tooltip */}
      <div className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[var(--color-foreground)] px-3 py-2 text-sm font-medium text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        Have Your Say
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-[var(--color-foreground)]"></div>
      </div>
    </Link>
  )
}
