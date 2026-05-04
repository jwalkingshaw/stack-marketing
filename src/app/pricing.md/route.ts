import { BILLING_PLAN_CATALOG } from '@/lib/billing-catalog'
import { formatBillingGigabytes, formatBillingLimit, formatDeepLUsage } from '@/lib/billing-display'

function formatPlanMarkdown() {
  const lines = [
    '# Pricing - Stackcess',
    '',
    'Machine-readable pricing reference for Stackcess.',
    '',
    'Website: https://stackcess.com/pricing',
    '',
  ]

  for (const plan of BILLING_PLAN_CATALOG) {
    lines.push(`## ${plan.name}`)
    lines.push(`- Price: $${plan.price}/month`)
    lines.push(`- Description: ${plan.description}`)
    lines.push(`- Active SKUs: ${formatBillingLimit(plan.activeSkuLimit)}`)
    lines.push(`- Storage: ${formatBillingGigabytes(plan.storageLimitGb)}`)
    lines.push(`- Internal users: ${formatBillingLimit(plan.internalUserLimit)}`)
    lines.push(`- Partner invites: ${formatBillingLimit(plan.partnerInviteLimit)}`)
    lines.push(
      `- Translation allowance: ${
        plan.deeplTotalCharLimit > 0 ? `${formatDeepLUsage(plan.deeplTotalCharLimit)} per month` : 'Not included'
      }`
    )
    lines.push(`- Public share links: ${plan.publicShareLinksEnabled ? 'Included' : 'Not included'}`)
    lines.push('- Features:')
    for (const feature of plan.features) {
      lines.push(`  - ${feature}`)
    }
    lines.push('')
  }

  return `${lines.join('\n').trim()}\n`
}

export async function GET() {
  return new Response(formatPlanMarkdown(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
