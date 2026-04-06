'use client'

import { useState, useEffect, useCallback } from 'react'

interface VotingButtonProps {
  featureId: string
  voteCount: number
  onVoteUpdate: (featureId: string, newVoteCount: number) => void
}

export function VotingButton({ featureId, voteCount, onVoteUpdate }: VotingButtonProps) {
  const [hasVoted, setHasVoted] = useState(false)
  const [isVoting, setIsVoting] = useState(false)
  const [currentVoteCount, setCurrentVoteCount] = useState(voteCount)

  const checkVoteStatus = useCallback(async () => {
    try {
      const response = await fetch(`/api/roadmap/votes/${featureId}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          voterIdentifier: getVoterIdentifier(),
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setHasVoted(data.hasVoted)
      }
    } catch (error) {
      console.error('Failed to check vote status:', error)
    }
  }, [featureId])

  useEffect(() => {
    void checkVoteStatus()
  }, [featureId, checkVoteStatus])

  useEffect(() => {
    setCurrentVoteCount(voteCount)
  }, [voteCount])

  const getVoterIdentifier = () => {
    let identifier = localStorage.getItem('voter_id')
    if (!identifier) {
      identifier = `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('voter_id', identifier)
    }
    return identifier
  }

  const handleVote = async () => {
    setIsVoting(true)

    try {
      const response = await fetch('/api/roadmap/votes', {
        method: hasVoted ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          featureRequestId: featureId,
          voterIdentifier: getVoterIdentifier(),
        }),
      })

      if (response.ok) {
        await response.json()
        const newVoteCount = hasVoted ? currentVoteCount - 1 : currentVoteCount + 1

        setHasVoted(!hasVoted)
        setCurrentVoteCount(newVoteCount)
        onVoteUpdate(featureId, newVoteCount)
      } else {
        const errorData = await response.json()
        console.error('Vote failed:', errorData.message)
      }
    } catch (error) {
      console.error('Failed to vote:', error)
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <div className="text-center">
      <button
        onClick={handleVote}
        disabled={isVoting}
        className={`flex h-16 w-16 flex-col items-center justify-center rounded-lg ${
          hasVoted
            ? 'bg-blue-600 text-white'
            : 'border border-[var(--color-border)] bg-[var(--color-surface-muted)] text-[var(--color-foreground-muted)]'
        } ${isVoting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      >
        <svg
          className="mb-1 h-5 w-5"
          fill={hasVoted ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
        <span className="text-sm font-semibold">{currentVoteCount}</span>
      </button>
    </div>
  )
}
