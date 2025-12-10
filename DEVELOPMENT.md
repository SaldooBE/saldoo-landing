# Development Setup Guide

This guide covers the setup required for local development, particularly for authentication flows.

## Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Supabase credentials:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
   - `NEXT_PUBLIC_SITE_URL`: Set to `http://localhost:3000` for local development

## Supabase Configuration

For authentication to work correctly on localhost, you need to configure redirect URLs in your Supabase dashboard.

### Required Redirect URLs

Go to **Supabase Dashboard** → **Authentication** → **URL Configuration** and add the following redirect URLs:

#### Site URL
- `http://localhost:3000`

#### Redirect URLs
Add these URLs to the "Redirect URLs" list:

- `http://localhost:3000/auth/callback`
- `http://localhost:3000/auth/callback?mode=login`
- `http://localhost:3000/auth/callback?mode=signup`

### OAuth Provider Configuration

If you're using OAuth providers (Google, etc.), make sure to add the localhost callback URL in your OAuth provider settings as well:

- **Google OAuth**: Add `http://localhost:3000/auth/callback` to authorized redirect URIs in Google Cloud Console

## Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

The app will be available at `http://localhost:3000`.

## Debugging Authentication Redirects

The application includes debug logging for authentication redirects when running in development mode. Check your browser console and server logs to see:

- OAuth redirect URLs being used
- Email redirect URLs being used
- Callback route origins

If you see redirects going to `app.saldoo.be` instead of `localhost:3000`, check:

1. **Supabase Dashboard**: Ensure localhost URLs are added to redirect URLs
2. **Environment Variables**: Verify `NEXT_PUBLIC_SITE_URL` is set to `http://localhost:3000`
3. **Browser Cache**: Clear your browser cache and try again
4. **Supabase Client**: Ensure you're using the correct Supabase project (not production)

## Common Issues

### Redirects to app.saldoo.be instead of localhost

**Cause**: Supabase dashboard doesn't have localhost URLs configured, or environment variables are incorrect.

**Solution**: 
1. Add localhost URLs to Supabase dashboard (see above)
2. Verify `.env.local` has `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
3. Restart your development server

### OAuth callback fails

**Cause**: OAuth provider doesn't recognize localhost as an authorized redirect URI.

**Solution**: Add `http://localhost:3000/auth/callback` to your OAuth provider's authorized redirect URIs.

### Email verification links don't work

**Cause**: Email redirect URL not configured correctly in Supabase.

**Solution**: Ensure `emailRedirectTo` uses `window.location.origin` (which it does by default) and that the callback URL is in Supabase's allowed redirect URLs.

