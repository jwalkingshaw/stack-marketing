'use client'

import { MarketingLayoutShell } from './ui/MarketingLayoutShell'
import { ReactNode } from 'react'
import AnnouncementBar from './AnnouncementBar'
import { buildAppAuthUrl } from '@/lib/app-links'

interface MarketingLayoutWrapperProps {
  children: ReactNode
}

export default function MarketingLayoutWrapper({ children }: MarketingLayoutWrapperProps) {
  const loginUrl = buildAppAuthUrl('login', {
    postLoginRedirectPath: '/',
  })
  const registerUrl = buildAppAuthUrl('register', {
    planInterest: 'growth',
    postLoginRedirectPath: '/onboarding?create=1&origin=marketing_header',
  })

  const handleLogin = () => {
    window.location.assign(loginUrl)
  }

  const handleRegister = () => {
    window.location.assign(registerUrl)
  }

  return (
    <MarketingLayoutShell
      authContext={{ isAuthenticated: false }}
      showSidebar={false}
      announcementBar={<AnnouncementBar />}
      headerProps={{
        logoHref: '/',
        onLogin: handleLogin,
        onRegister: handleRegister,
      }}
    >
      {children}
    </MarketingLayoutShell>
  )
}
