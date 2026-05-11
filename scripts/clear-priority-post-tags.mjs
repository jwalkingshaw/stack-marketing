// Run: node --env-file=.env.local scripts/clear-priority-post-tags.mjs
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

const postIds = [
  'blog-post-why-spreadsheets-fail-for-supplement-product-content-operations',
  'blog-post-what-essna-signals-about-multi-market-product-content-in-europe',
]

async function main() {
  for (const id of postIds) {
    await client.patch(id).set({ tags: [] }).commit()
    console.log(`Cleared tags for ${id}`)
  }
}

await main()
