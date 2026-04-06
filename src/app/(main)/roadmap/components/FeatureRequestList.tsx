'use client'

import { useState } from 'react'
import { FeatureRequest } from '../types'
import { VotingButton } from './VotingButton'

interface FeatureRequestListProps {
  featureRequests: FeatureRequest[]
  loading: boolean
  onVoteUpdate: (featureId: string, newVoteCount: number) => void
}

const statusColors = {
  pending: 'bg-amber-100 text-amber-900 border-amber-300',
  approved: 'bg-blue-100 text-blue-900 border-blue-300',
  rejected: 'bg-slate-100 text-slate-700 border-slate-300',
  in_development: 'bg-violet-100 text-violet-900 border-violet-300',
  completed: 'bg-emerald-100 text-emerald-900 border-emerald-300',
}

const statusLabels = {
  pending: 'Pending Review',
  approved: 'Open for Voting',
  rejected: 'Not Planned',
  in_development: 'In Development',
  completed: 'Completed',
}

export function FeatureRequestList({
  featureRequests,
  loading,
  onVoteUpdate,
}: FeatureRequestListProps) {
  const [sortBy, setSortBy] = useState<'votes' | 'date'>('votes')

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-lg bg-[var(--color-surface-muted)] p-6">
            <div className="mb-3 h-4 w-3/4 rounded bg-slate-300" />
            <div className="mb-2 h-3 w-full rounded bg-slate-200" />
            <div className="h-3 w-1/2 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    )
  }

  if (featureRequests.length === 0) {
    return (
      <div className="py-12 text-center text-[var(--color-foreground-muted)]">
        <svg className="mx-auto mb-4 h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
        <p>No feature requests yet. Be the first to submit one.</p>
      </div>
    )
  }

  const sortedRequests = [...featureRequests].sort((a, b) => {
    if (sortBy === 'votes') {
      return b.vote_count - a.vote_count
    }
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--color-foreground-muted)]">
          {featureRequests.length} feature request{featureRequests.length !== 1 ? 's' : ''}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy('votes')}
            className={`h-8 rounded-lg px-3 text-xs font-medium transition-colors ${
              sortBy === 'votes'
                ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                : 'bg-[var(--color-surface-muted)] text-[var(--color-foreground)]'
            }`}
          >
            Most Voted
          </button>
          <button
            onClick={() => setSortBy('date')}
            className={`h-8 rounded-lg px-3 text-xs font-medium transition-colors ${
              sortBy === 'date'
                ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]'
                : 'bg-[var(--color-surface-muted)] text-[var(--color-foreground)]'
            }`}
          >
            Newest
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {sortedRequests.map((request) => (
          <div key={request.id} className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex-1">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <h3 className="text-lg font-semibold text-[var(--color-foreground)]">{request.title}</h3>
                  <span
                    className={`inline-flex self-start rounded-full border px-2 py-1 text-xs font-medium ${
                      statusColors[request.status]
                    }`}
                  >
                    {statusLabels[request.status]}
                  </span>
                </div>
                <p className="mb-4 leading-relaxed text-[var(--color-foreground-muted)]">{request.description}</p>
                <div className="mt-4 text-sm text-[var(--color-foreground-subtle)]">
                  Submitted by <span className="font-medium">{request.submitter_name}</span> on {formatDate(request.created_at)}
                </div>
              </div>

              {request.status === 'approved' ? (
                <div className="flex-shrink-0 self-start">
                  <VotingButton
                    featureId={request.id}
                    voteCount={request.vote_count}
                    onVoteUpdate={onVoteUpdate}
                  />
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
