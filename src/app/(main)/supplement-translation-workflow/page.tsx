import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('supplement-translation-workflow')

export default function SupplementTranslationWorkflowPage() {
  return <SolutionPageTemplate content={solutionPages['supplement-translation-workflow']} />
}
