import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BlogPost, urlFor } from '@/lib/sanity'

interface BlogPostCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogPostCard({ post, featured = false }: BlogPostCardProps) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const getImageUrl = () => {
    if (!post.coverImage) return null

    if (post.coverImage.asset?.url) {
      return post.coverImage.asset.url
    }

    try {
      return urlFor(post.coverImage).width(featured ? 960 : 720).height(featured ? 720 : 500).url()
    } catch (error) {
      console.error('Error generating image URL:', error)
      return null
    }
  }

  const imageUrl = getImageUrl()

  return (
    <article
      className={`group overflow-hidden rounded-[1.5rem] border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)] ${
        featured ? 'h-full' : ''
      }`}
    >
      {imageUrl ? (
        <div className={`relative overflow-hidden ${featured ? 'h-[18rem] sm:h-[24rem]' : 'h-[13rem] sm:h-[15rem]'}`}>
          <Link href={`/post/${post.slug.current}`}>
            <Image
              src={imageUrl}
              alt={post.coverImage?.alt || post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </Link>
        </div>
      ) : null}

      <div className={`${featured ? 'p-7 sm:p-8' : 'p-6'}`}>
        <Link href={`/post/${post.slug.current}`} className="block">
          <h2
            className={`pb-4 font-semibold tracking-[-0.025em] text-[var(--color-foreground)] ${
              featured ? 'text-[2.5rem] !leading-[1.02] sm:text-[3.4rem]' : 'text-[1.85rem] !leading-[1.04] sm:text-[2.2rem]'
            }`}
          >
            {post.title}
          </h2>
        </Link>

        {post.excerpt ? (
          <p className={`text-[var(--text-secondary)] ${featured ? 'marketing-section-copy max-w-2xl' : 'text-sm leading-7'}`}>
            {post.excerpt}
          </p>
        ) : null}

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-4">
          <div className="marketing-mono flex flex-wrap items-center gap-2 text-[0.68rem] uppercase tracking-[0.12em] text-[var(--text-muted)]">
            {post.author ? <span>{post.author.name}</span> : null}
            <span>{publishedDate}</span>
            {post.estimatedReadingTime ? <span>{post.estimatedReadingTime} min read</span> : null}
          </div>

          <Link
            href={`/post/${post.slug.current}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-foreground)]"
          >
            Read article
            <ArrowRight className="h-4 w-4 marketing-button-arrow" />
          </Link>
        </div>
      </div>
    </article>
  )
}
