// Run: node --env-file=.env.local scripts/backfill-blog-post-taxonomy.mjs
// Requires SANITY_API_WRITE_TOKEN in .env.local
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

const pillarRules = [
  {
    pillarKey: 'product-content-operations',
    matchers: ['pim', 'dam', 'catalog', 'sku', 'variant', 'product content', 'ecommerce'],
  },
  {
    pillarKey: 'partner-content-operations',
    matchers: ['partner portal', 'distributor', 'retail', 'retailer', 'syndication', 'assets'],
  },
  {
    pillarKey: 'multilingual-content-operations',
    matchers: ['translation', 'localization', 'multilingual', 'labels'],
  },
  {
    pillarKey: 'compliance-and-launch-operations',
    matchers: ['compliance', 'coa', 'launch', 'documents', 'quality'],
  },
  {
    pillarKey: 'european-regulatory-operations',
    matchers: ['essna', 'eu regulation', 'europe', 'claims', 'novel foods', 'fop', 'front-of-pack'],
  },
]

function normalize(value) {
  return String(value || '').trim().toLowerCase()
}

function inferPillarKey(post) {
  const title = normalize(post.title)
  const excerpt = normalize(post.excerpt)
  const haystack = [title, excerpt, ...(post.tags || []).map(normalize)].join(' | ')

  for (const rule of pillarRules) {
    if (rule.matchers.some((matcher) => haystack.includes(normalize(matcher)))) {
      return rule.pillarKey
    }
  }

  return null
}

function inferContentRole(post, inferredPillarKey) {
  if (post.contentRole) {
    return post.contentRole
  }

  const title = normalize(post.title)
  if (
    inferredPillarKey &&
    (title.startsWith('what ') || title.startsWith('why ') || title.startsWith('how ') || title.includes(' vs '))
  ) {
    return 'spoke'
  }

  return 'editorial'
}

const posts = await client.fetch(`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    excerpt,
    tags,
    contentRole,
    pillarKey
  }
`)

if (!posts.length) {
  console.log('No blog posts found.')
  process.exit(0)
}

let patched = 0

for (const post of posts) {
  const inferredPillarKey = post.pillarKey || inferPillarKey(post)
  const inferredContentRole = inferContentRole(post, inferredPillarKey)

  const patch = {}

  if (!post.pillarKey && inferredPillarKey) {
    patch.pillarKey = inferredPillarKey
  }

  if (!post.contentRole && inferredContentRole) {
    patch.contentRole = inferredContentRole
  }

  if (Object.keys(patch).length === 0) {
    continue
  }

  await client.patch(post._id).set(patch).commit()
  patched += 1
  console.log(`Patched ${post._id}:`, patch)
}

console.log(`Done. Updated ${patched} post(s).`)
