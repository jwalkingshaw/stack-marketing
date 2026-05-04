import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('dam-for-supplement-brands')

export default function DamForSupplementBrandsPage() {
  return <SolutionPageTemplate content={solutionPages['dam-for-supplement-brands']} />
}
