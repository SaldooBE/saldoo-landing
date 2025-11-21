# Vercel Deployment Setup Guide

This guide will help you deploy your application to Vercel with domain-based routing:
- `saldoo.be` → Landing page only
- `app.saldoo.be` → Platform application

## Prerequisites

- GitHub repository: `https://github.com/SaldooBE/saldoo-landing`
- Domain `saldoo.be` registered
- Vercel account (sign up at https://vercel.com if needed)

## Step 1: Create Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository:
   - Select **"Import Git Repository"**
   - Choose `SaldooBE/saldoo-landing`
   - Click **"Import"**

## Step 2: Configure Project Settings

### Basic Configuration

1. **Project Name**: `saldoo-landing` (or your preferred name)
2. **Framework Preset**: Next.js (should auto-detect)
3. **Root Directory**: `./` (leave as default)
4. **Build Command**: `npm run build` (default)
5. **Output Directory**: `.next` (default)
6. **Install Command**: `npm install` (default)

### Environment Variables (if needed)

If your application uses environment variables (Supabase, OpenAI, etc.), add them here:
- Click **"Environment Variables"**
- Add each variable:
  - Name: `NEXT_PUBLIC_SUPABASE_URL`
  - Value: (your Supabase URL)
  - Environment: Production, Preview, Development (select all)

## Step 3: Add Domain `saldoo.be`

1. In your project settings, go to **"Domains"**
2. Click **"Add Domain"**
3. Enter: `saldoo.be`
4. Click **"Add"**
5. Vercel will show DNS configuration instructions:
   - **Type**: `A` or `CNAME`
   - **Name**: `@` (or leave blank)
   - **Value**: Vercel's IP address or CNAME target
6. Update your domain's DNS settings at your domain registrar
7. Wait for DNS propagation (can take up to 48 hours, usually faster)

## Step 4: Add Subdomain `app.saldoo.be`

1. Still in **"Domains"** section
2. Click **"Add Domain"** again
3. Enter: `app.saldoo.be`
4. Click **"Add"**
5. Configure DNS:
   - **Type**: `CNAME`
   - **Name**: `app`
   - **Value**: Vercel's CNAME target (usually `cname.vercel-dns.com` or similar)
6. Update DNS at your domain registrar
7. Wait for DNS propagation

## Step 5: Deploy

1. Click **"Deploy"** button
2. Vercel will:
   - Install dependencies
   - Build your Next.js application
   - Deploy to production
3. Once deployed, both domains will be live:
   - `saldoo.be` → Landing page
   - `app.saldoo.be` → Platform (redirects to `/start`)

## Step 6: Verify Domain Routing

### Test Landing Page (`saldoo.be`)
- Visit `https://saldoo.be`
- Should show landing page with hero section
- Click "Start je analyse hier" → should go to `app.saldoo.be/login`
- Try accessing `saldoo.be/login` → should redirect to landing page

### Test Platform (`app.saldoo.be`)
- Visit `https://app.saldoo.be`
- Should redirect to `https://app.saldoo.be/start`
- All platform routes should work:
  - `/start`
  - `/upload`
  - `/analyse`
  - `/login`
  - `/signup`
  - `/faq`
  - `/dashboard`

## How Domain Routing Works

The `middleware.ts` file handles routing:

- **`saldoo.be`**: 
  - Serves landing page (`app/page.tsx`)
  - Blocks platform routes (redirects to `/`)
  - Allows static assets

- **`app.saldoo.be`**:
  - Redirects `/` to `/start`
  - Serves all platform routes
  - Blocks landing page routes

## Troubleshooting

### DNS Not Resolving
- Check DNS settings at your domain registrar
- Use `dig saldoo.be` or `nslookup saldoo.be` to verify
- Wait up to 48 hours for full propagation

### Wrong Domain Showing
- Clear browser cache
- Check Vercel deployment logs
- Verify middleware.ts is working correctly

### SSL Certificate Issues
- Vercel automatically provisions SSL certificates
- May take a few minutes after DNS is configured
- Check SSL status in Vercel dashboard

## Next Steps

- Set up environment variables for production
- Configure custom error pages if needed
- Set up monitoring and analytics
- Configure preview deployments for pull requests

## Support

- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

