'use client'

import { Button } from './ui/button'
import { buildAppAuthUrl } from '@/lib/app-links'

export default function LoginButton() {
  const handleLogin = () => {
    const loginUrl = buildAppAuthUrl('login', {
      postLoginRedirectPath: '/',
    })
    window.location.assign(loginUrl)
  }

  return (
    <Button
      onClick={handleLogin}
      variant="outline"
      size="sm"
      className="border-[var(--color-border)] text-[var(--color-foreground)] transition-all duration-200"
    >
      Log In
    </Button>
  )
}
