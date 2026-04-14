'use client'

import { Button } from './ui/button'
import { buildAppAuthUrl } from '@/lib/app-links'

export default function SignUpButton() {
  const handleSignUp = () => {
    const signUpUrl = buildAppAuthUrl('register', {
      planInterest: 'growth',
      postLoginRedirectPath: '/onboarding?create=1&origin=marketing_signup_button',
    })
    window.location.assign(signUpUrl)
  }

  return (
    <Button
      onClick={handleSignUp}
      size="sm"
      className="marketing-primary-button border border-[var(--color-primary)] bg-[var(--color-primary)] transition-all duration-200 hover:bg-[var(--color-primary-hover)]"
    >
      Start Free
    </Button>
  )
}
