import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('ai-localization-for-supplement-brands')

export default function AiLocalizationForSupplementBrandsPage() {
  return <SolutionPageTemplate content={solutionPages['ai-localization-for-supplement-brands']} />
}
