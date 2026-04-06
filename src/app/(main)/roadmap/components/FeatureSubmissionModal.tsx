'use client'

import { FeatureSubmissionForm } from './FeatureSubmissionForm'

interface FeatureSubmissionModalProps {
  isOpen: boolean
  onClose: () => void
  onFeatureSubmitted: () => void
}

export function FeatureSubmissionModal({ isOpen, onClose, onFeatureSubmitted }: FeatureSubmissionModalProps) {
  if (!isOpen) return null

  const handleFeatureSubmitted = () => {
    onFeatureSubmitted()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center">
      <div className="absolute inset-0 bg-slate-900/40 transition-opacity" onClick={onClose} />

      <div className="relative mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="sticky top-0 rounded-t-2xl border-b border-[var(--color-border)] bg-[var(--color-surface)] px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--color-foreground)]">Submit a Feature Request</h2>
              <p className="mt-1 text-[var(--color-foreground-muted)]">
                Tell us what feature would make the biggest impact for your team.
              </p>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer text-[var(--color-foreground-subtle)] transition-colors hover:text-[var(--color-foreground)]"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="px-8 py-6">
          <FeatureSubmissionForm onFeatureSubmitted={handleFeatureSubmitted} />
        </div>
      </div>
    </div>
  )
}
