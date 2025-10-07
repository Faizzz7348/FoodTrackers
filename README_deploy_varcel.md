# Deploying FoodTrackers to Vercel and Render

This guide provides step-by-step instructions for deploying the FoodTrackers application. The frontend will be deployed to Vercel, and the backend to Render.

---

## Architecture Overview

- **Frontend**: Vite/React application served as static files on Vercel
- **Backend**: Express.js API server deployed on Render
- **Database**: Neon PostgreSQL (already cloud-hosted)

---

## Part 1: Deploy Backend to Render

### Step 1: Prepare Backend Configuration

1. Ensure your `.env` file contains the `DATABASE_URL` (Neon connection string)
2. Push your latest code to GitHub

### Step 2: Deploy to Render

1. Go to [render.com](https://render.com) and sign in with your GitHub account
2. Click **New Web Service**
3. Connect your GitHub repo and select your FoodTrackers repository
4. Configure the service:
   - **Name**: `foodtrackers-backend` (or your choice)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Environment Variables**: Add `DATABASE_URL` with your Neon connection string
5. Click **Create Web Service**
6. Wait for deployment to complete and note your backend URL (e.g., `https://foodtrackers-backend.onrender.com`)

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Update API Configuration

Before deploying, you need to update your frontend to point to the Render backend:

1. Open `vercel.json` in the project root
2. Replace `https://your-backend-url.onrender.com` with your actual Render backend URL
3. Commit and push this change

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click **New Project** and import your FoodTrackers repository
3. Configure the project:
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`
4. Click **Deploy**
5. Wait for deployment to complete

### Step 3: Verify Deployment

1. Visit your Vercel deployment URL
2. Test adding/editing food items to ensure the API connection works
3. Check browser console for any errors

---

## Part 3: Environment Variables

### Backend (Render)
- `DATABASE_URL`: Your Neon PostgreSQL connection string
- `NODE_ENV`: Set to `production` (usually automatic on Render)
- `PORT`: Automatically set by Render (don't override)

### Frontend (Vercel)
- No environment variables needed if using the vercel.json rewrite configuration
- Alternatively, you can set `VITE_API_URL` to your backend URL and update the code to use it

---

## Troubleshooting

### Build Failures

**Error: Cannot resolve imports**
- Ensure all dependencies are in the root `package.json`
- Run `npm install` locally to verify dependencies
- Check that `package-lock.json` is committed

**Error: Build command failed**
- Verify build works locally: `npm run build`
- Check build logs for specific error messages
- Ensure all required files are committed

### API Connection Issues

**CORS Errors**
- Ensure your backend allows requests from your Vercel domain
- Add CORS middleware to Express if needed

**404 on API Calls**
- Verify the backend URL in `vercel.json` is correct
- Check that backend is running on Render
- Test backend endpoints directly using curl or Postman

### Database Connection

**Connection timeout**
- Verify `DATABASE_URL` environment variable is set correctly on Render
- Check Neon database is accessible and not paused
- Ensure your Neon database allows connections from Render IPs

---

## Useful Commands

### Local Development
```bash
npm install          # Install dependencies
npm run dev          # Run development server
npm run build        # Build for production
npm run start        # Start production server
```

### Deployment
```bash
git add .
git commit -m "Deploy updates"
git push             # Triggers automatic redeployment on Vercel and Render
```

---

## Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

## Quick Reference

### Vercel Configuration (vercel.json)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/public",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-backend-url.onrender.com/api/$1"
    }
  ]
}
```

### Render Configuration
- Build Command: `npm install && npm run build`
- Start Command: `npm run start`
- Environment Variable: `DATABASE_URL`

---

**Need Help?** Open an issue in the repository or consult the platform documentation.

