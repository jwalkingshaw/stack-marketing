import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('coa-management-for-supplement-brands')

export default function CoaManagementForSupplementBrandsPage() {
  return <SolutionPageTemplate content={solutionPages['coa-management-for-supplement-brands']} />
}
