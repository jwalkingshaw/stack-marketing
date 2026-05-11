import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stackcess Pricing | Plans for Supplement Brands',
  description:
    'Compare Stackcess pricing plans for supplement brands, including SKU limits, storage, team access, partner invites, and translation usage.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Stackcess Pricing | Plans for Supplement Brands',
    description:
      'Compare Stackcess pricing plans for supplement brands, including SKU limits, storage, team access, partner invites, and translation usage.',
    url: '/pricing',
  },
  twitter: {
    title: 'Stackcess Pricing | Plans for Supplement Brands',
    description:
      'Compare Stackcess pricing plans for supplement brands, including SKU limits, storage, team access, partner invites, and translation usage.',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
