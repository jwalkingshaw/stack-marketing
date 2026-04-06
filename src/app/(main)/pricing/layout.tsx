import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — Stackcess',
  description:
    'Flat monthly pricing per workspace. No per-seat billing. Free plan available — includes PIM, DAM, partner sharing, regulatory document storage, and translation workflows.',
  alternates: {
    canonical: '/pricing',
  },
  openGraph: {
    title: 'Pricing — Stackcess',
    description:
      'Flat monthly pricing per workspace. No per-seat billing. Free plan available — includes PIM, DAM, partner sharing, regulatory document storage, and translation workflows.',
    url: '/pricing',
  },
  twitter: {
    title: 'Pricing — Stackcess',
    description:
      'Flat monthly pricing per workspace. No per-seat billing. Free plan available — includes PIM, DAM, partner sharing, regulatory document storage, and translation workflows.',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
