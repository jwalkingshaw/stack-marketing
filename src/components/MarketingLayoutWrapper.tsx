'use client'

import { MarketingLayoutShell } from "./ui/MarketingLayoutShell"
import { ReactNode } from "react"
import AnnouncementBar from "./AnnouncementBar"

interface MarketingLayoutWrapperProps {
  children: ReactNode
}

export default function MarketingLayoutWrapper({ children }: MarketingLayoutWrapperProps) {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001").replace(/\/$/, "");

  const handleLogin = () => {
    window.location.href = `${appUrl}/login`
  }
  
  const handleRegister = () => {
    window.location.href = `${appUrl}/api/auth/register`
  }
  
  return (
    <MarketingLayoutShell
      authContext={{ isAuthenticated: false }}
      showSidebar={false}
      announcementBar={<AnnouncementBar />}
      headerProps={{
        logoHref: "/",
        onLogin: handleLogin,
        onRegister: handleRegister
      }}
    >
      {children}
    </MarketingLayoutShell>
  )
}
