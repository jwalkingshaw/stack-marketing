import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('supplement-variant-management-software')

export default function SupplementVariantManagementSoftwarePage() {
  return <SolutionPageTemplate content={solutionPages['supplement-variant-management-software']} />
}
