export type EditorialClusterConfig = {
  pillar: {
    href: string
    title: string
    description: string
  }
  solutions: Array<{
    href: string
    title: string
    description: string
  }>
}

export const editorialClusters: Record<string, EditorialClusterConfig> = {
  'product-content-operations': {
    pillar: {
      href: '/product-content-operations-for-supplement-brands',
      title: 'Product Content Operations for Supplement Brands',
      description:
        'A practical guide to keeping product data, approved assets, market-specific content, and partner-ready outputs aligned.',
    },
    solutions: [
      {
        href: '/pim-for-supplement-brands',
        title: 'PIM for Supplement Brands',
        description: 'For structured product data, variant logic, and catalog control.',
      },
      {
        href: '/dam-for-supplement-brands',
        title: 'DAM for Supplement Brands',
        description: 'For approved labels, packshots, support assets, and file governance.',
      },
      {
        href: '/ai-localization-for-supplement-brands',
        title: 'AI Market Adaptation',
        description: 'For multilingual copy, market review loops, and local-ready content.',
      },
      {
        href: '/product-content-syndication-for-supplement-brands',
        title: 'Product Content Syndication',
        description: 'For destination-ready partner outputs and cleaner downstream delivery.',
      },
    ],
  },
  'market-execution': {
    pillar: {
      href: '/market-execution-for-supplement-brands',
      title: 'Market Execution for Supplement Brands',
      description:
        'A guide to helping distributors, retailers, and partners activate faster with current product content, assets, and execution-ready materials.',
    },
    solutions: [
      {
        href: '/partner-portal-for-supplement-brands',
        title: 'Partner Portal for Supplement Brands',
        description: 'For controlled external access to current product content, assets, and supporting files.',
      },
      {
        href: '/marketing-enablement-for-supplement-brand-partners',
        title: 'Marketing Enablement for Brand Partners',
        description: 'For launch materials, campaign assets, and partner activation support.',
      },
      {
        href: '/distributor-content-portal-for-supplement-brands',
        title: 'Distributor Content Portal',
        description: 'For faster distributor onboarding, updates, and content retrieval.',
      },
      {
        href: '/retailer-content-portal-for-brands',
        title: 'Retailer Content Portal',
        description: 'For retailer-ready imagery, copy, and support files in one controlled view.',
      },
      {
        href: '/product-content-syndication-for-supplement-brands',
        title: 'Product Content Syndication',
        description: 'For repeatable delivery into portals, packs, and partner-specific outputs.',
      },
    ],
  },
}

export function getEditorialCluster(pillarKey?: string | null) {
  if (!pillarKey) return null
  return editorialClusters[pillarKey] ?? null
}
