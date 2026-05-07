import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('retailer-content-portal-for-brands')

export default function RetailerContentPortalForBrandsPage() {
  return <SolutionPageTemplate content={solutionPages['retailer-content-portal-for-brands']} />
}
