// Run: node --env-file=.env.local scripts/seed-author-jason.mjs
// Requires SANITY_API_WRITE_TOKEN in .env.local — create one at:
// https://www.sanity.io/manage → your project → API → Tokens → Add token (Editor role)
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

const author = {
  _type: 'author',
  _id: 'author-jason',
  name: 'Jason',
  slug: {
    _type: 'slug',
    current: 'jason',
  },
  bio: [
    {
      _type: 'block',
      _key: 'bio-p1',
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: 'bio-p1-s1',
          marks: [],
          text: 'Jason is the founder of Stackcess, a product content operations platform for sports nutrition and supplement brands. Stackcess combines structured product data, governed digital assets, AI-assisted localization, and partner portal syndication in one system — built to replace the disconnected tools and manual workflows that hold brands back as they scale across channels and distribution partners.',
        },
      ],
    },
  ],
}

const result = await client.createOrReplace(author)
console.log('Author created:', result._id)
