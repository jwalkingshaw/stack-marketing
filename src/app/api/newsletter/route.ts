import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// Simple in-memory rate limiter: max 5 submissions per IP per minute
const rateMap = new Map<string, number[]>()
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60_000
  const limit = 5
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < windowMs)
  if (hits.length >= limit) return true
  rateMap.set(ip, [...hits, now])
  return false
}

// Initialize clients only when environment variables are available
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase configuration missing')
    return null
  }
  
  return createClient(supabaseUrl, supabaseKey)
}

function getResendClient() {
  const resendKey = process.env.RESEND_API_KEY
  
  if (!resendKey) {
    console.warn('Resend API key missing')
    return null
  }
  
  return new Resend(resendKey)
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const { email, source = 'newsletter', metadata = {} } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Get clients
    const supabase = getSupabaseClient()
    const resend = getResendClient()

    if (!supabase) {
      return NextResponse.json(
        { error: 'Newsletter service temporarily unavailable' },
        { status: 503 }
      )
    }

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('email_subscribers')
      .select('id, email, signup_source')
      .eq('email', email)
      .single()

    if (existingSubscriber) {
      return NextResponse.json(
        { 
          message: 'Already subscribed',
          source: existingSubscriber.signup_source 
        },
        { status: 200 }
      )
    }

    // Insert new subscriber
    const { data, error } = await supabase
      .from('email_subscribers')
      .insert([
        {
          email,
          signup_source: source,
          metadata: {
            ...metadata,
            user_agent: request.headers.get('user-agent'),
            ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
            timestamp: new Date().toISOString()
          }
        }
      ])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    // Send welcome email based on source
    try {
      if (resend) {
        const emailTemplate = {
          to: email,
          from: 'hello@tradetool.com',
          subject: 'Welcome to TradeTools!',
          html: getWelcomeEmailHtml(source)
        }

        await resend.emails.send(emailTemplate)
      } else {
        console.warn('Email service not configured, skipping welcome email')
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Don't fail the whole request if email fails
    }

    return NextResponse.json(
      { 
        message: 'Successfully subscribed',
        id: data?.[0]?.id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function getWelcomeEmailHtml(source: string): string {
  const baseHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Welcome to Stackcess!</h1>
      <p>Thank you for joining our ${source === 'waitlist' ? 'waitlist' : 'community'}.</p>
  `

  switch (source) {
    case 'waitlist':
      return baseHtml + `
        <p>You're now on our exclusive waitlist! We'll notify you as soon as Stackcess is ready for early access.</p>
        <p>Stay tuned for exciting updates about the Sports Supplements Operating System that will revolutionize how brands, distributors, and retailers collaborate.</p>
        <p>Best regards,<br>The Stackcess Team</p>
      </div>`
    
    case 'beta':
      return baseHtml + `
        <p>You're now on our exclusive beta list! We'll notify you as soon as early access is available.</p>
        <p>Stay tuned for exciting updates about our trading platform.</p>
        <p>Best regards,<br>The TradeTools Team</p>
      </div>`
    
    case 'newsletter':
      return baseHtml + `
        <p>You'll receive the latest updates about our trading platform and industry insights.</p>
        <p>We promise to keep your inbox valuable and never spam you.</p>
        <p>Best regards,<br>The TradeTools Team</p>
      </div>`
    
    default:
      return baseHtml + `
        <p>We'll keep you updated with the latest news and developments.</p>
        <p>Best regards,<br>The Stackcess Team</p>
      </div>`
  }
}