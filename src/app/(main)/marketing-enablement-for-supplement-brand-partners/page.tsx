import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('marketing-enablement-for-supplement-brand-partners')

export default function MarketingEnablementForSupplementBrandPartnersPage() {
  return <SolutionPageTemplate content={solutionPages['marketing-enablement-for-supplement-brand-partners']} />
}
