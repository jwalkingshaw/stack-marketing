import Image from 'next/image'
import Link from 'next/link'
import { BlogPost, urlFor } from '@/lib/sanity'

interface BlogPostCardProps {
  post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  const getImageUrl = () => {
    if (!post.coverImage) return null

    if (post.coverImage.asset.url) {
      return post.coverImage.asset.url
    }

    try {
      return urlFor(post.coverImage).width(600).height(400).url()
    } catch (error) {
      console.error('Error generating image URL:', error)
      return null
    }
  }

  const imageUrl = getImageUrl()

  return (
    <article className="group overflow-hidden border border-gray-100 bg-white transition-all duration-300 hover:border-gray-200 hover:shadow-lg hover:shadow-gray-200/50">
      {imageUrl && (
        <div className="relative h-48 overflow-hidden sm:h-64">
          <Link href={`/post/${post.slug.current}`}>
            <Image
              src={imageUrl}
              alt={post.coverImage.alt || post.title}
              fill
              className="object-cover"
            />
          </Link>
        </div>
      )}

      <div className="p-6">
        {post.tags && post.tags.length > 0 && (
          <div className="mb-4 flex items-center space-x-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/post/${post.slug.current}`}
          className="block"
          style={{ marginBottom: '1rem' }}
        >
          <h2 className="line-clamp-2 pb-1 text-xl font-semibold leading-[1.2] text-gray-900 sm:text-2xl">
            {post.title}
          </h2>
        </Link>

        {post.excerpt && (
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-gray-600">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between border-t border-gray-50 pt-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              {post.author && <span className="font-medium">{post.author.name}</span>}
              <span>&bull;</span>
              <time dateTime={post.publishedAt}>{publishedDate}</time>
              {post.estimatedReadingTime && (
                <>
                  <span>&bull;</span>
                  <span>{post.estimatedReadingTime} min read</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
