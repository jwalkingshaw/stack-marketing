'use client'

import { useState, useEffect } from 'react'
import { FeatureSubmissionModal } from './components/FeatureSubmissionModal'
import { FeatureRequestList } from './components/FeatureRequestList'
import { FeatureRequest } from './types'

export default function RoadMapClient() {
  const [featureRequests, setFeatureRequests] = useState<FeatureRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    void fetchFeatureRequests()
  }, [])

  const fetchFeatureRequests = async () => {
    try {
      const response = await fetch('/api/roadmap/feature-requests')
      if (response.ok) {
        const data = await response.json()
        setFeatureRequests(data)
      }
    } catch (error) {
      console.error('Failed to fetch feature requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFeatureSubmitted = () => {
    void fetchFeatureRequests()
  }

  const handleVoteUpdate = (featureId: string, newVoteCount: number) => {
    setFeatureRequests((prev) =>
      prev.map((feature) =>
        feature.id === featureId ? { ...feature, vote_count: newVoteCount } : feature
      )
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-3xl font-semibold leading-[1.05] tracking-[-0.02em] text-[var(--color-foreground)] sm:text-5xl lg:text-6xl">
            Help shape the roadmap for supplement operations
          </h1>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 w-full rounded-lg bg-[var(--color-primary)] px-6 py-3 text-base font-medium text-[var(--color-primary-foreground)] transition-colors hover:bg-[var(--color-primary-hover)] sm:w-auto"
          >
            Submit a Feature Request
          </button>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-7xl rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)] sm:text-3xl">
              Community Feature Requests
            </h2>
            <p className="mt-3 text-base leading-[1.5] text-[var(--color-foreground-muted)] sm:text-lg">
              Vote for the features that matter most. Highest-signal requests are prioritized.
            </p>
          </div>

          <FeatureRequestList
            featureRequests={featureRequests}
            loading={loading}
            onVoteUpdate={handleVoteUpdate}
          />
        </div>
      </section>

      <FeatureSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onFeatureSubmitted={handleFeatureSubmitted}
      />
    </div>
  )
}
