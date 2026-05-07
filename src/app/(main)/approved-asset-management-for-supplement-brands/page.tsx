import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('approved-asset-management-for-supplement-brands')

export default function ApprovedAssetManagementForSupplementBrandsPage() {
  return <SolutionPageTemplate content={solutionPages['approved-asset-management-for-supplement-brands']} />
}
