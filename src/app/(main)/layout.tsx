'use client'

import { usePathname } from 'next/navigation'
import SidebarBanner from '@/components/SidebarBanner'
import TopArticles from '@/components/TopArticles'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const coreMarketingPaths = new Set([
    '/marketing',
    '/',
    '/pricing',
    '/roadmap',
    '/about',
    '/ai-localization-for-supplement-brands',
    '/pim-for-supplement-brands',
    '/dam-for-supplement-brands',
    '/coa-management-for-supplement-brands',
    '/partner-portal-for-supplement-brands',
    '/product-content-syndication-for-supplement-brands',
    '/supplement-product-catalog-management',
    '/supplement-variant-management-software',
    '/supplement-compliance-document-management',
    '/supplement-launch-readiness-software',
    '/retailer-content-portal-for-brands',
    '/distributor-content-portal-for-supplement-brands',
    '/supplement-translation-workflow',
    '/multilingual-product-content-management',
    '/supplement-sku-management',
    '/approved-asset-management-for-supplement-brands',
    '/terms',
    '/privacy',
  ])
  const isHelpPage = pathname === '/help' || pathname.startsWith('/help/')
  const isMarketingPage = coreMarketingPaths.has(pathname) || isHelpPage
  const showTopArticles = !isMarketingPage
  return (
    <div className="w-full min-h-screen">
      {/* Mobile layout */}
      <div className="md:hidden px-4 py-4">
        <main className="w-full">
          {children}
        </main>
        
        {/* Mobile sidebar - shown below content */}
        <aside className="w-full mt-6">
          <div className="mb-4 flex justify-center">
            <SidebarBanner />
          </div>
          {showTopArticles && <TopArticles />}
        </aside>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:block w-full min-h-screen">
        {isMarketingPage ? (
          /* Marketing page - full width */
          <main className="w-full">
            {children}
          </main>
        ) : (
          /* Other pages - with sidebar */
          <div className="px-4 md:px-6 lg:px-8 py-8 flex justify-center">
            {/* Container with max width for large screens */}
            <div className="w-full max-w-[1300px] flex gap-4 md:gap-6 lg:gap-8 justify-center">
              {/* Main content */}
              <main className="w-full max-w-[700px] md:w-[600px] lg:w-[700px] flex-shrink-0">
                {children}
              </main>
              
              {/* Right sidebar - minimum width to fit banners */}
              <aside className="w-[300px] md:w-[320px] h-fit sticky top-[7rem] flex-shrink-0">
                <div className="mb-6">
                  <SidebarBanner />
                </div>
                {showTopArticles && <TopArticles />}
              </aside>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
