import {defineField, defineType} from 'sanity'

const contentRoleOptions = [
  {title: 'News', value: 'news'},
  {title: 'Spoke', value: 'spoke'},
  {title: 'Editorial', value: 'editorial'},
]

const pillarKeyOptions = [
  {title: 'Product Content Operations', value: 'product-content-operations'},
  {title: 'Multilingual Content Operations', value: 'multilingual-content-operations'},
  {title: 'Partner Content Operations', value: 'partner-content-operations'},
  {title: 'Market Execution', value: 'market-execution'},
  {title: 'Compliance And Launch Operations', value: 'compliance-and-launch-operations'},
  {title: 'European Regulatory Operations', value: 'european-regulatory-operations'},
]

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'aiSummaryBlock',
      title: 'AI Summary Block',
      type: 'object',
      description: 'Optional key takeaways rendered at the top of the article. Improves AI search discoverability.',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'keyTakeaways',
          title: 'Key Takeaways',
          type: 'array',
          of: [{type: 'string'}],
          description: '3–5 bullet points. Lead each with the core fact.',
          validation: (Rule) => Rule.max(5),
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'SEO Title',
          type: 'string',
          description: 'Optional override for the browser title and social title. Defaults to the post title.',
          validation: (Rule) => Rule.max(70),
        }),
        defineField({
          name: 'description',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'Optional override for search and social descriptions. Defaults to the excerpt.',
          validation: (Rule) => Rule.max(160),
        }),
        defineField({
          name: 'canonicalUrl',
          title: 'Canonical URL',
          type: 'url',
          description: 'Optional canonical URL override. Leave blank to use the live post URL.',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }),
        }),
        defineField({
          name: 'noIndex',
          title: 'No index',
          type: 'boolean',
          description: 'Prevent search engines from indexing this post.',
          initialValue: false,
        }),
        defineField({
          name: 'aiSummary',
          title: 'AI Summary',
          type: 'text',
          rows: 4,
          description: 'Optional plain-language summary for AI retrieval, internal reuse, and future metadata use.',
          validation: (Rule) => Rule.max(420),
        }),
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Optional. Leave blank for text-led editorial posts that do not need a hero image.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({
                    name: 'href',
                    title: 'URL',
                    type: 'url',
                    validation: (Rule) =>
                      Rule.required().uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                        allowRelative: true,
                      }),
                  }),
                  defineField({
                    name: 'openInNewTab',
                    title: 'Open in new tab',
                    type: 'boolean',
                    initialValue: false,
                  }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }
          ]
        },
      ],
    }),
    defineField({
      name: 'faqItems',
      title: 'FAQ',
      type: 'array',
      description: 'Optional Q&A pairs rendered at the end of the article. High-value for AI answer extraction and featured snippets.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {title: 'question'},
          },
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'contentRole',
      title: 'Content Role',
      type: 'string',
      description: 'Use this to distinguish standard news from spoke content and broader editorial posts.',
      initialValue: 'editorial',
      options: {
        list: contentRoleOptions,
        layout: 'radio',
      },
    }),
    defineField({
      name: 'pillarKey',
      title: 'Pillar / Cluster',
      type: 'string',
      description: 'Structured grouping for editorial clusters. Use this for spoke-to-pillar management instead of relying only on freeform tags.',
      options: {
        list: pillarKeyOptions,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'estimatedReadingTime',
      title: 'Estimated Reading Time (minutes)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
