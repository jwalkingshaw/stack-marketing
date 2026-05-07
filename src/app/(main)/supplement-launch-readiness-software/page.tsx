import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('supplement-launch-readiness-software')

export default function SupplementLaunchReadinessSoftwarePage() {
  return <SolutionPageTemplate content={solutionPages['supplement-launch-readiness-software']} />
}
