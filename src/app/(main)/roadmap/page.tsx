import type { Metadata } from 'next'
import RoadMapClient from "./RoadMapClient";

export const metadata: Metadata = {
  title: 'Stackcess Roadmap | Feature Requests and Product Direction',
  description:
    'View the Stackcess roadmap, vote on feature requests, and help shape product direction for supplement operations workflows.',
  alternates: {
    canonical: '/roadmap',
  },
  openGraph: {
    title: 'Stackcess Roadmap | Feature Requests and Product Direction',
    description:
      'View the Stackcess roadmap, vote on feature requests, and help shape product direction for supplement operations workflows.',
    url: '/roadmap',
  },
  twitter: {
    title: 'Stackcess Roadmap | Feature Requests and Product Direction',
    description:
      'View the Stackcess roadmap, vote on feature requests, and help shape product direction for supplement operations workflows.',
  },
}

export default function RoadMapPage() {
  return <RoadMapClient />
}
