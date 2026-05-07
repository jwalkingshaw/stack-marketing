import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('partner-portal-for-supplement-brands')

export default function PartnerPortalForSupplementBrandsPage() {
  return <SolutionPageTemplate content={solutionPages['partner-portal-for-supplement-brands']} />
}
