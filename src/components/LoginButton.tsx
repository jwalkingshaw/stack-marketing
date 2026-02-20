'use client'

import { Button } from './ui/button'

export default function LoginButton() {
  const handleLogin = () => {
    // Redirect to our custom login page for better UX
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001').replace(/\/$/, '')
    window.location.href = `${appUrl}/login`
  }

  return (
    <Button 
      onClick={handleLogin}
      variant="outline"
      size="sm" 
      className="transition-all duration-200 font-medium"
    >
      Login
    </Button>
  )
}
