'use client'

import { useEffect, useRef } from 'react'
import { trackMarketingEvent } from '@/lib/marketing-analytics'

type MarketingFunnelTrackerProps = {
  page: string
  trackScroll?: boolean
}

export default function MarketingFunnelTracker({
  page,
  trackScroll = false,
}: MarketingFunnelTrackerProps) {
  const pageTrackedRef = useRef(false)
  const milestoneRef = useRef(new Set<number>())

  useEffect(() => {
    if (pageTrackedRef.current) return
    pageTrackedRef.current = true
    trackMarketingEvent('page_view', { page })
  }, [page])

  useEffect(() => {
    if (!trackScroll) return

    const milestones = [50, 75, 90]

    const onScroll = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      if (scrollable <= 0) return

      const progress = Math.round((window.scrollY / scrollable) * 100)

      for (const milestone of milestones) {
        if (progress < milestone || milestoneRef.current.has(milestone)) continue
        milestoneRef.current.add(milestone)
        trackMarketingEvent('scroll_depth', {
          page,
          section: 'page',
          scrollDepth: milestone,
        })
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [page, trackScroll])

  return null
}
