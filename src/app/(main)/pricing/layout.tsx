import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing - Stackcess',
  description:
    'Workspace pricing for Stackcess. Free plan available. Paid plans scale by SKUs, storage, internal users, partner invites, and included translation usage.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Pricing - Stackcess',
    description:
      'Workspace pricing for Stackcess. Free plan available. Paid plans scale by SKUs, storage, internal users, partner invites, and included translation usage.',
    url: '/pricing',
  },
  twitter: {
    title: 'Pricing - Stackcess',
    description:
      'Workspace pricing for Stackcess. Free plan available. Paid plans scale by SKUs, storage, internal users, partner invites, and included translation usage.',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
