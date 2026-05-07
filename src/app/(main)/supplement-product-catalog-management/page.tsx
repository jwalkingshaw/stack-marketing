import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('supplement-product-catalog-management')

export default function SupplementProductCatalogManagementPage() {
  return <SolutionPageTemplate content={solutionPages['supplement-product-catalog-management']} />
}
