'use client'

import { useState } from 'react'
import { FeatureSubmissionData } from '../types'

interface FeatureSubmissionFormProps {
  onFeatureSubmitted: () => void
}

export function FeatureSubmissionForm({ onFeatureSubmitted }: FeatureSubmissionFormProps) {
  const [formData, setFormData] = useState<FeatureSubmissionData>({
    name: '',
    email: '',
    title: '',
    description: '',
    marketingOptIn: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange =
    (field: keyof FeatureSubmissionData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        event.target.type === 'checkbox'
          ? (event.target as HTMLInputElement).checked
          : event.target.value

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/roadmap/feature-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({
          name: '',
          email: '',
          title: '',
          description: '',
          marketingOptIn: false,
        })
        onFeatureSubmitted()

        setTimeout(() => setSuccess(false), 5000)
      } else {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to submit feature request')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="py-8 text-center">
        <div className="mb-4 text-green-600">
          <svg className="mx-auto h-12 w-12" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-medium text-[var(--color-foreground)]">Feature request submitted</h3>
        <p className="text-[var(--color-foreground-muted)]">
          Thanks. We will review it and add it to community voting once approved.
        </p>
      </div>
    )
  }

  const inputClasses =
    'w-full rounded-lg border border-[var(--color-border)] px-4 py-3 text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-subtle)] transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
  const labelClasses = 'mb-2 block text-sm font-medium text-[var(--color-foreground)]'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name *
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange('name')}
            placeholder="Your full name"
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email *
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            placeholder="your.email@example.com"
            required
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="title" className={labelClasses}>
          Feature Title *
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={handleInputChange('title')}
          placeholder="Brief title for your feature request"
          required
          maxLength={200}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClasses}>
          Feature Description *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={handleInputChange('description')}
          placeholder="Describe the feature, the problem it solves, and why it matters in supplement operations."
          required
          rows={6}
          maxLength={2000}
          className={inputClasses}
        />
        <div className="mt-1 text-sm text-[var(--color-foreground-subtle)]">
          {formData.description.length}/2000 characters
        </div>
      </div>

      <div className="flex items-start space-x-3">
        <input
          id="marketing"
          type="checkbox"
          checked={formData.marketingOptIn}
          onChange={handleInputChange('marketingOptIn')}
          className="mt-1 h-4 w-4 rounded border-[var(--color-border)] text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor="marketing" className="text-sm text-[var(--color-foreground-muted)]">
          Keep me updated on platform developments and new features (optional)
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-10 w-full rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Feature Request'}
      </button>
    </form>
  )
}
