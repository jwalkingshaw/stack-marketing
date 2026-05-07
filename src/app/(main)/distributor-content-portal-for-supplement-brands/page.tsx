import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('distributor-content-portal-for-supplement-brands')

export default function DistributorContentPortalForSupplementBrandsPage() {
  return <SolutionPageTemplate content={solutionPages['distributor-content-portal-for-supplement-brands']} />
}
