import SolutionPageTemplate from '@/components/SolutionPageTemplate'
import { buildSolutionMetadata, solutionPages } from '@/lib/solution-pages'

export const metadata = buildSolutionMetadata('multilingual-product-content-management')

export default function MultilingualProductContentManagementPage() {
  return <SolutionPageTemplate content={solutionPages['multilingual-product-content-management']} />
}
