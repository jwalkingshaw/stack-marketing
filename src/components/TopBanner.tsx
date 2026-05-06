'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getBannerByPlacement, trackBannerClick, urlFor, type Banner } from '@/lib/sanity'

export default function TopBanner() {
  const [banner, setBanner] = useState<Banner | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBanner() {
      try {
        const bannerData = await getBannerByPlacement('top')
        setBanner(bannerData)
      } catch (error) {
        console.error('Error fetching top banner:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBanner()
  }, [])

  const handleBannerClick = () => {
    if (banner && banner.clickTracking) {
      trackBannerClick(banner._id)
    }
  }

  if (loading || !banner) {
    return null
  }

  return (
    <div className="w-full px-4 pb-6 pt-4 sm:px-6 sm:pb-8">
      <div className="mx-auto max-w-[1280px]">
        <a
          href={banner.clickThroughUrl}
          target={banner.targetBlank ? '_blank' : '_self'}
          rel={banner.targetBlank ? 'noopener noreferrer' : undefined}
          onClick={handleBannerClick}
          className="block overflow-hidden rounded-[1.25rem] border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
        >
          <div className="hidden md:block">
            <Image
              src={urlFor(banner.desktopImage).width(1280).height(160).url()}
              alt={banner.altText}
              width={1280}
              height={160}
              className="h-[140px] w-full object-cover"
            />
          </div>

          <div className="block md:hidden">
            <Image
              src={urlFor(banner.mobileImage || banner.desktopImage).width(768).height(120).url()}
              alt={banner.altText}
              width={768}
              height={120}
              className="h-[92px] w-full object-cover"
            />
          </div>
        </a>
      </div>
    </div>
  )
}
