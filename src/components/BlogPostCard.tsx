import Image from 'next/image'
import Link from 'next/link'
import { BlogPost, urlFor } from '@/lib/sanity'

interface BlogPostCardProps {
  post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  const getImageUrl = () => {
    if (!post.coverImage) return null
    
    // Use direct URL from Sanity asset
    if (post.coverImage.asset.url) {
      return post.coverImage.asset.url
    }
    
    // Fallback to urlFor if needed
    try {
      return urlFor(post.coverImage).width(600).height(400).url()
    } catch (error) {
      console.error('Error generating image URL:', error)
      return null
    }
  }
  
  const imageUrl = getImageUrl()


  return (
    <article className="group bg-white border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-200">
      {imageUrl && (
        <div className="relative h-48 sm:h-64 overflow-hidden">
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
        {/* Enhanced tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center space-x-2 mb-4">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg border border-blue-100"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link href={`/post/${post.slug.current}`} className="block">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 line-clamp-2 leading-tight">
            {post.title}
          </h2>
        </Link>
        
        {/* Enhanced excerpt if available */}
        {post.excerpt && (
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              {post.author && (
                <span className="font-medium">{post.author.name}</span>
              )}
              <span>•</span>
              <time>{new Date(post.publishedAt).toLocaleDateString()}</time>
              {post.estimatedReadingTime && (
                <>
                  <span>•</span>
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
