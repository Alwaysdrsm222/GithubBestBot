# Free Deployment Guide with Custom Domain

## Option 1: Vercel (Best Choice)

### Why Vercel?
- 100% free for personal projects
- Perfect for React + Node.js apps
- Free custom domain support
- Automatic SSL certificates
- Global CDN

### Steps:
1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/rbc-community.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Deploy automatically

3. **Add Custom Domain**
   - Go to project dashboard
   - Click "Domains"
   - Add your domain (e.g., rbccommunity.com)
   - Update DNS records as shown
   - SSL certificate applied automatically

### Build Settings (Auto-detected):
- Build Command: `npm run build`
- Output Directory: `dist/public`
- Install Command: `npm install`

## Option 2: Netlify

### Steps:
1. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Drag & drop the `dist/public` folder
   - Or connect GitHub repository

2. **Custom Domain**
   - Go to Site settings > Domain management
   - Add custom domain
   - Update DNS records

## Option 3: Railway

### Steps:
1. **Deploy**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repository
   - Deploy automatically

2. **Custom Domain**
   - Go to project settings
   - Add custom domain (requires paid plan)

## Option 4: Static Hosting (Frontend Only)

For GitHub Pages, Firebase Hosting, or other static hosts:

1. **Build static version**
   ```bash
   npm run build
   ```

2. **Upload files**
   - Upload contents of `dist/public` folder
   - Configure to serve `index.html` for all routes

**Note**: Backend features won't work with static hosting.

## Custom Domain Setup

### DNS Configuration:
For most domains, add these records:

**A Record:**
- Name: @
- Value: [Your hosting provider's IP]

**CNAME Record:**
- Name: www
- Value: [Your hosting provider's domain]

### Popular Domain Registrars:
- **Namecheap**: $8-12/year
- **Google Domains**: $12/year
- **Cloudflare**: $8-10/year
- **GoDaddy**: $12-15/year

## Environment Variables

For production deployment, set:
```
NODE_ENV=production
PORT=5000
```

## Database Considerations

Current setup uses in-memory storage. For persistence:
- Add PostgreSQL database
- Use Vercel Postgres, Supabase, or PlanetScale
- All offer free tiers

Would you like help with any specific deployment option?