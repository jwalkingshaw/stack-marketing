// Run: node --env-file=.env.local scripts/patch-priority-post-publish-dates.mjs
import { createClient } from '@sanity/client'

const token = process.env.SANITY_API_WRITE_TOKEN
if (!token) {
  console.error('Missing SANITY_API_WRITE_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const updates = [
  {
    id: 'blog-post-why-spreadsheets-fail-for-supplement-product-content-operations',
    publishedAt: '2026-05-10T09:00:00.000Z',
  },
  {
    id: 'blog-post-what-essna-signals-about-multi-market-product-content-in-europe',
    publishedAt: '2026-05-10T09:15:00.000Z',
  },
]

for (const update of updates) {
  await client.patch(update.id).set({ publishedAt: update.publishedAt }).commit()
  console.log(`Patched publishedAt for ${update.id} -> ${update.publishedAt}`)
}
