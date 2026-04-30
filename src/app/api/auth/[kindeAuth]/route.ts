import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server'
import type { AuthEndpoints } from '@kinde-oss/kinde-auth-nextjs/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest, context: unknown) {
  try {
    if (!process.env.KINDE_ISSUER_URL || !process.env.KINDE_CLIENT_ID) {
      console.warn('Kinde configuration missing')
      return NextResponse.json(
        { error: 'Authentication service temporarily unavailable' },
        { status: 503 }
      )
    }

    const { params } = context as { params: { kindeAuth: string } }
    return handleAuth(request, params.kindeAuth as AuthEndpoints)
  } catch (error) {
    console.warn('Kinde auth initialization failed:', error)
    return NextResponse.json(
      { error: 'Authentication service temporarily unavailable' },
      { status: 503 }
    )
  }
}
