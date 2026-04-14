import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Stackcess',
  description:
    'Workspace pricing for Stackcess. Free sandbox available. Paid plans scale by SKUs, storage, bandwidth, internal users, partner invites, and translation volume.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Pricing - Stackcess',
    description:
      'Workspace pricing for Stackcess. Free sandbox available. Paid plans scale by SKUs, storage, bandwidth, internal users, partner invites, and translation volume.',
    url: '/pricing',
  },
  twitter: {
    title: 'Pricing - Stackcess',
    description:
      'Workspace pricing for Stackcess. Free sandbox available. Paid plans scale by SKUs, storage, bandwidth, internal users, partner invites, and translation volume.',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
