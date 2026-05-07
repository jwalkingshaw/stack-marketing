import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('supplement-compliance-document-management')

export default function SupplementComplianceDocumentManagementPage() {
  return <SolutionPageTemplate content={solutionPages['supplement-compliance-document-management']} />
}
