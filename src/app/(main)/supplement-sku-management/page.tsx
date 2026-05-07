import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('supplement-sku-management')

export default function SupplementSkuManagementPage() {
  return <SolutionPageTemplate content={solutionPages['supplement-sku-management']} />
}
