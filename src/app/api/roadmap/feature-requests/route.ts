import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

// Simple in-memory rate limiter: max 3 submissions per IP per minute
const rateMap = new Map<string, number[]>()
function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60_000
  const limit = 3
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < windowMs)
  if (hits.length >= limit) return true
  rateMap.set(ip, [...hits, now])
  return false
}

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase configuration missing')
    return null
  }
  
  return createClient(supabaseUrl, supabaseKey)
}

export async function GET() {
  try {
    const supabase = getSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      )
    }

    // Fetch approved feature requests, sorted by vote count descending
    const { data: featureRequests, error } = await supabase
      .from('feature_requests')
      .select('*')
      .eq('status', 'approved')
      .order('vote_count', { ascending: false });

    if (error) {
      console.error('Failed to fetch feature requests:', error);
      return NextResponse.json(
        { message: 'Failed to fetch feature requests' },
        { status: 500 }
      );
    }

    return NextResponse.json(featureRequests || []);
  } catch (error) {
    console.error('Failed to fetch feature requests:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    const supabase = getSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      )
    }

    const body = await request.json();
    const { name, email, title, description, marketingOptIn } = body;

    // Validate required fields
    if (!name || !email || !title || !description) {
      return NextResponse.json(
        { message: 'Name, email, title, and description are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Insert the feature request
    const { data: featureRequest, error: featureError } = await supabase
      .from('feature_requests')
      .insert([
        {
          title: title.trim(),
          description: description.trim(),
          submitter_name: name.trim(),
          submitter_email: email.toLowerCase().trim(),
          status: 'pending', // Requires admin approval
        }
      ])
      .select()
      .single();

    if (featureError) {
      console.error('Failed to create feature request:', featureError);
      return NextResponse.json(
        { message: 'Failed to create feature request' },
        { status: 500 }
      );
    }

    // Handle email subscription if opted in
    if (marketingOptIn) {
      // Check if email already exists
      const { data: existingSubscriber } = await supabase
        .from('email_subscribers')
        .select('id')
        .eq('email', email.toLowerCase().trim())
        .single();

      if (!existingSubscriber) {
        // Insert new email subscriber
        const { error: emailError } = await supabase
          .from('email_subscribers')
          .insert([
            {
              email: email.toLowerCase().trim(),
              name: name.trim(),
              signup_source: 'roadmap'
            }
          ]);

        if (emailError) {
          console.warn('Failed to add email subscriber:', emailError);
          // Don't fail the entire request if email subscription fails
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Feature request submitted successfully. It will appear in the community voting once approved.',
      featureRequest
    });

  } catch (error) {
    console.error('Failed to submit feature request:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}