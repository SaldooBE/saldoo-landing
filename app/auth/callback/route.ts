import { type EmailOtpType } from '@supabase/supabase-js'
import { type NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const origin = requestUrl.origin
    
    // Debug logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Auth Callback] Request origin:', origin)
      console.log('[Auth Callback] Full URL:', request.url)
    }
    
    const token_hash = requestUrl.searchParams.get('token_hash')
    const type = requestUrl.searchParams.get('type') as EmailOtpType | null
    const code = requestUrl.searchParams.get('code')
    const mode = requestUrl.searchParams.get('mode') // 'signup' or 'login'

    const supabase = await createClient()

    // Handle OAuth callback (Google, Apple, Meta)
    if (code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (!error && data?.user) {
        try {
          // Update profile with name from OAuth metadata if missing
          const rawMetadata = data.user.user_metadata || {}
          const fullName = rawMetadata.full_name || rawMetadata.name
          
          if (fullName) {
            // Check if profile exists and if names are missing
            const { data: profile } = await supabase
              .from('profiles')
              .select('first_name, last_name')
              .eq('id', data.user.id)
              .single()

            // If profile exists but names are missing, update it
            if (profile && (!profile.first_name || !profile.last_name)) {
              // Split full_name on first space
              const nameParts = fullName.trim().split(/\s+/)
              const firstName = nameParts[0] || null
              const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : null

              await supabase
                .from('profiles')
                .update({
                  first_name: firstName,
                  last_name: lastName,
                  updated_at: new Date().toISOString(),
                })
                .eq('id', data.user.id)
            }
          }

          // Check if this is a new user (created within the last 10 seconds)
          const userCreatedAt = new Date(data.user.created_at)
          const now = new Date()
          const secondsSinceCreation = (now.getTime() - userCreatedAt.getTime()) / 1000
          const isNewUser = secondsSinceCreation < 10

          // Determine redirect destination:
          // - If mode is 'signup' AND user is new → redirect to /accountant/login (new registration)
          // - If mode is 'signup' BUT user is existing → redirect to /start (they're logging in)
          // - If mode is 'login' or no mode → redirect to /start (login)
          if (mode === 'signup' && isNewUser) {
            // New user registration via OAuth
            const redirectUrl = new URL('/accountant/login', origin)
            redirectUrl.searchParams.set('oauth_success', 'true')
            redirectUrl.searchParams.set('message', 'Registratie succesvol! Je kunt nu inloggen.')
            return NextResponse.redirect(redirectUrl)
          } else {
            // Existing user login (or signup form used but user already exists)
            return NextResponse.redirect(new URL('/start', origin))
          }
        } catch (dateError) {
          console.error('Error processing user date:', dateError)
          // Fallback: redirect to start if date parsing fails
          return NextResponse.redirect(new URL('/start', origin))
        }
      } else {
        // OAuth error - redirect to login with error message
        const redirectUrl = new URL('/accountant/login', origin)
        const errorMessage = error?.message || 'Er is een fout opgetreden bij het inloggen met OAuth'
        redirectUrl.searchParams.set('error', errorMessage)
        return NextResponse.redirect(redirectUrl)
      }
    }

    // Handle email verification (OTP)
    if (token_hash && type) {
      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash,
      })

      if (!error) {
        return NextResponse.redirect(new URL('/start', origin))
      }
    }

    // If there's an error or missing params, redirect to login with error message
    const redirectUrl = new URL('/accountant/login', origin)
    redirectUrl.searchParams.set('error', 'Er is een fout opgetreden bij het bevestigen van je e-mail')
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('Callback route error:', error)
    // Fallback redirect to login on any unexpected error
    try {
      const requestUrl = new URL(request.url)
      const redirectUrl = new URL('/accountant/login', requestUrl.origin)
      redirectUrl.searchParams.set('error', 'Er is een onverwachte fout opgetreden')
      return NextResponse.redirect(redirectUrl)
    } catch (fallbackError) {
      console.error('Fallback redirect error:', fallbackError)
      // If even the fallback fails, return a simple redirect
      // Use environment variable if set, otherwise default to localhost for development
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                     (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://app.saldoo.be')
      
      if (process.env.NODE_ENV === 'development') {
        console.log('[Auth Callback] Using fallback URL:', baseUrl)
      }
      
      return NextResponse.redirect(new URL('/accountant/login', baseUrl))
    }
  }
}

