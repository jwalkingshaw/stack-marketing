import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('product-content-syndication-for-supplement-brands')

export default function ProductContentSyndicationForSupplementBrandsPage() {
  return <SolutionPageTemplate content={solutionPages['product-content-syndication-for-supplement-brands']} />
}
