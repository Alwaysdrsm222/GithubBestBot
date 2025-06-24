# RBC Community Website - Free Deployment Guide

## Project Export & Deployment Options

### 1. **Vercel** (Recommended - Best for React/Node.js)
- **Cost**: 100% Free for personal projects
- **Custom Domain**: Free custom domain support
- **Features**: Automatic deployments, global CDN, serverless functions

**Steps:**
1. Create account at vercel.com
2. Connect your GitHub repository
3. Deploy with one click
4. Add custom domain in project settings

### 2. **Netlify**
- **Cost**: Free tier with generous limits
- **Custom Domain**: Free custom domain support
- **Features**: Form handling, edge functions, continuous deployment

**Steps:**
1. Create account at netlify.com
2. Drag & drop build folder or connect Git
3. Configure build settings
4. Add custom domain

### 3. **Railway**
- **Cost**: Free tier available
- **Custom Domain**: Free subdomains, paid custom domains
- **Features**: Full-stack deployment, database hosting

### 4. **GitHub Pages** (Static sites only)
- **Cost**: 100% Free
- **Custom Domain**: Free with GitHub Pro or paid plans
- **Limitation**: Static sites only (no backend)

## Recommended Deployment: Vercel

### Why Vercel is Best for Your Project:
- Perfect for React + Node.js applications
- Automatic serverless function deployment
- Built-in CDN and optimization
- Easy custom domain setup
- Excellent performance

### Export Instructions:

1. **Push to GitHub** (if not already done)
2. **Connect to Vercel**
3. **Configure Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist/public`
   - Install Command: `npm install`

### Custom Domain Setup:
1. Go to your Vercel project dashboard
2. Click "Domains" tab
3. Add your custom domain
4. Update DNS records as instructed
5. Free SSL certificate automatically applied

## Alternative: Export Static Files

If you want to host elsewhere, you can export the built files:
- Frontend: `/dist/public` folder
- Backend: Requires Node.js hosting

## Database Considerations

Your current setup uses in-memory storage. For production:
- **Option 1**: Keep in-memory (data resets on restart)
- **Option 2**: Add PostgreSQL database (Vercel PostgreSQL, Supabase, or PlanetScale)
- **Option 3**: Use JSON file storage for persistence

Would you like me to help you set up any of these deployment options?