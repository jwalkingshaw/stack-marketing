// Run: node --env-file=.env.local scripts/seed-priority-editorial-posts.mjs
// Seeds the current spoke drafts into Sanity blog posts.
import fs from 'node:fs'
import path from 'node:path'
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

const root = process.cwd()
function key(prefix, index) {
  return `${prefix}-${String(index).padStart(4, '0')}`
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function extractField(markdown, label) {
  const regex = new RegExp(`\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?:\\n\\*\\*|\\n---|$)`)
  const match = markdown.match(regex)
  return match ? match[1].trim() : ''
}

function extractBulletSection(markdown, label) {
  const regex = new RegExp(`\\*\\*${label}:\\*\\*\\s*\\n([\\s\\S]*?)(?:\\n---|\\n##\\s|$)`)
  const match = markdown.match(regex)
  if (!match) return []

  return match[1]
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim())
}

function parseFaq(lines, startIndex) {
  const faqItems = []
  let i = startIndex + 1
  let faqIndex = 0

  while (i < lines.length) {
    const line = lines[i].trim()
    if (!line) {
      i += 1
      continue
    }
    if (line.startsWith('## ') && line !== '## FAQ') {
      break
    }
    if (line.startsWith('### ')) {
      const question = line.replace(/^###\s+/, '').trim()
      i += 1
      const answerLines = []
      while (i < lines.length) {
        const next = lines[i].trim()
        if (next.startsWith('### ') || (next.startsWith('## ') && next !== '## FAQ')) {
          break
        }
        if (next) {
          answerLines.push(next)
        }
        i += 1
      }
      faqItems.push({
        _key: key('faq', ++faqIndex),
        question,
        answer: answerLines.join(' '),
      })
      continue
    }
    i += 1
  }

  return { faqItems, nextIndex: i }
}

function parseBodyToPortableText(markdown) {
  const body = markdown.split('\n---\n').slice(1).join('\n---\n').trim()
  const lines = body.split(/\r?\n/)
  const blocks = []
  let paragraphBuffer = []
  let listBuffer = []
  let listMode = null
  let blockIndex = 0
  let faqItems = []

  function flushParagraph() {
    if (!paragraphBuffer.length) return
    const text = paragraphBuffer.join(' ').trim()
    if (!text) {
      paragraphBuffer = []
      return
    }
    blocks.push({
      _type: 'block',
      _key: key('block', ++blockIndex),
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: key('span', blockIndex),
          marks: [],
          text,
        },
      ],
    })
    paragraphBuffer = []
  }

  function flushList() {
    if (!listBuffer.length || !listMode) return
    blocks.push({
      _type: 'block',
      _key: key('list', ++blockIndex),
      style: 'normal',
      listItem: listMode,
      level: 1,
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: key('span', blockIndex),
          marks: [],
          text: listBuffer.shift(),
        },
      ],
    })
    while (listBuffer.length) {
      blocks.push({
        _type: 'block',
        _key: key('list', ++blockIndex),
        style: 'normal',
        listItem: listMode,
        level: 1,
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: key('span', blockIndex),
            marks: [],
            text: listBuffer.shift(),
          },
        ],
      })
    }
    listMode = null
  }

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i]
    const line = raw.trim()

    if (!line) {
      flushParagraph()
      flushList()
      continue
    }

    if (line === '## FAQ') {
      flushParagraph()
      flushList()
      const parsed = parseFaq(lines, i)
      faqItems = parsed.faqItems
      i = parsed.nextIndex - 1
      continue
    }

    if (line.startsWith('## ') || line.startsWith('### ')) {
      flushParagraph()
      flushList()
      const style = line.startsWith('### ') ? 'h3' : 'h2'
      const text = line.replace(/^###?\s+/, '').trim()
      blocks.push({
        _type: 'block',
        _key: key('block', ++blockIndex),
        style,
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: key('span', blockIndex),
            marks: [],
            text,
          },
        ],
      })
      continue
    }

    if (line.startsWith('- ')) {
      flushParagraph()
      listMode = 'bullet'
      listBuffer.push(line.slice(2).trim())
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      flushParagraph()
      listMode = 'number'
      listBuffer.push(line.replace(/^\d+\.\s+/, '').trim())
      continue
    }

    flushList()
    paragraphBuffer.push(line)
  }

  flushParagraph()
  flushList()

  return { content: blocks, faqItems }
}

function inferReadingTime(text) {
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

async function ensureAuthor() {
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
            text: 'Jason is the founder of Stackcess, a product content operations platform for sports nutrition and supplement brands. Stackcess combines structured product data, governed digital assets, AI-assisted localization, and partner portal syndication in one system.',
          },
        ],
      },
    ],
  }

  await client.createOrReplace(author)
}

function buildPostDocument({ filePath, contentRole, pillarKey, publishedAt }) {
  const markdown = fs.readFileSync(filePath, 'utf8')
  const titleMatch = markdown.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1].trim() : path.basename(filePath, '.md')
  const seoTitle = extractField(markdown, 'Meta title')
  const seoDescription = extractField(markdown, 'Meta description')
  const excerpt = extractField(markdown, 'Excerpt')
  const aiSummary = extractField(markdown, 'AI summary')
  const keyTakeaways = extractBulletSection(markdown, 'Key facts for AI retrieval').slice(0, 5)
  const { content, faqItems } = parseBodyToPortableText(markdown)
  const slug = slugify(title)

  return {
    _id: `blog-post-${slug}`,
    _type: 'blogPost',
    title,
    slug: {
      _type: 'slug',
      current: slug,
    },
    excerpt,
    seo: {
      title: seoTitle,
      description: seoDescription,
      aiSummary,
      noIndex: false,
    },
    aiSummaryBlock: keyTakeaways.length
      ? {
          _type: 'object',
          keyTakeaways,
        }
      : undefined,
    content,
    faqItems,
    author: {
      _type: 'reference',
      _ref: 'author-jason',
    },
    tags: [],
    contentRole,
    pillarKey,
    publishedAt,
    estimatedReadingTime: inferReadingTime(markdown),
  }
}

async function main() {
  await ensureAuthor()

  const posts = [
    buildPostDocument({
      filePath: path.join(root, 'docs', 'drafts', 'spoke-why-spreadsheets-fail.md'),
      contentRole: 'spoke',
      pillarKey: 'product-content-operations',
      publishedAt: '2026-05-10T09:00:00.000Z',
    }),
    buildPostDocument({
      filePath: path.join(root, 'docs', 'drafts', 'spoke-what-distributor-ready-product-content-actually-includes.md'),
      contentRole: 'spoke',
      pillarKey: 'product-content-operations',
      publishedAt: '2026-05-10T09:15:00.000Z',
    }),
    buildPostDocument({
      filePath: path.join(root, 'docs', 'drafts', 'spoke-how-to-prepare-product-content-for-retailers-distributors-and-ecommerce.md'),
      contentRole: 'spoke',
      pillarKey: 'product-content-operations',
      publishedAt: '2026-05-10T09:30:00.000Z',
    }),
    buildPostDocument({
      filePath: path.join(root, 'docs', 'drafts', 'spoke-why-joint-business-plans-fail-in-execution-not-alignment.md'),
      contentRole: 'spoke',
      pillarKey: 'market-execution',
      publishedAt: '2026-05-11T08:45:00.000Z',
    }),
    buildPostDocument({
      filePath: path.join(root, 'docs', 'drafts', 'spoke-what-distributors-actually-need-from-supplement-brands-to-activate-faster.md'),
      contentRole: 'spoke',
      pillarKey: 'market-execution',
      publishedAt: '2026-05-11T09:00:00.000Z',
    }),
    buildPostDocument({
      filePath: path.join(root, 'docs', 'drafts', 'spoke-how-to-share-approved-campaign-assets-without-email-chains.md'),
      contentRole: 'spoke',
      pillarKey: 'market-execution',
      publishedAt: '2026-05-11T09:15:00.000Z',
    }),
  ]

  for (const post of posts) {
    const result = await client.createOrReplace(post)
    console.log(`Seeded ${result._id}`)
  }
}

await main()
