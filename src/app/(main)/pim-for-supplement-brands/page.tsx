import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('pim-for-supplement-brands')

export default function PimForSupplementBrandsPage() {
  return <SolutionPageTemplate content={solutionPages['pim-for-supplement-brands']} />
}
