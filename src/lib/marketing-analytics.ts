export type MarketingEventName =
  | 'page_view'
  | 'hero_cta_click'
  | 'pricing_cta_click'
  | 'plan_cta_click'
  | 'redirect_to_register'
  | 'scroll_depth'

export type MarketingEventPayload = {
  page: string
  section?: string
  ctaLabel?: string
  planInterest?: string
  scrollDepth?: number
  context?: Record<string, string | number | boolean | null | undefined>
}

type UTMContext = {
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
}

function readUtmContext(): UTMContext {
  if (typeof window === 'undefined') {
    return {
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
    }
  }

  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
  }
}

export function trackMarketingEvent(event: MarketingEventName, payload: MarketingEventPayload): void {
  if (typeof window === 'undefined') return

  const body = {
    event,
    ...payload,
    path: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...readUtmContext(),
  }

  const serialized = JSON.stringify(body)

  if (navigator.sendBeacon) {
    const sent = navigator.sendBeacon('/api/track-event', new Blob([serialized], { type: 'application/json' }))
    if (sent) return
  }

  void fetch('/api/track-event', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: serialized,
    keepalive: true,
  }).catch(() => {
    // Non-blocking analytics
  })
}
