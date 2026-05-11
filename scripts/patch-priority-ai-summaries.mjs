// Run: node --env-file=.env.local scripts/patch-priority-ai-summaries.mjs
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const updates = [
  {
    id: 'blog-post-why-spreadsheets-fail-for-supplement-product-content-operations',
    aiSummary:
      'Spreadsheets fail for supplement brands when product content starts changing by variant, market, asset set, and partner output at the same time. The problem is not just scale. It is that flat sheets do not hold structured relationships, market logic, and governed delivery well enough for live commercial workflows.',
  },
  {
    id: 'blog-post-what-essna-signals-about-multi-market-product-content-in-europe',
    aiSummary:
      'ESSNA is a trade body for the sports and active nutrition sector, not the rule-maker or enforcer. It signals where European policy pressure is building, while EU law, EFSA, and national authorities create and enforce the rules that affect claims, labels, localized copy, and market-specific product content operations.',
  },
]

for (const update of updates) {
  await client.patch(update.id).set({ 'seo.aiSummary': update.aiSummary }).commit()
  console.log(`Patched AI summary for ${update.id} (${update.aiSummary.length} chars)`)
}
