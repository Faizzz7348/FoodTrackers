# Quick Start Deployment Guide

This is a simplified, step-by-step guide to deploy FoodTrackers to Vercel and Render.

## Prerequisites
- GitHub account
- [Vercel account](https://vercel.com) (free)
- [Render account](https://render.com) (free)
- [Neon account](https://neon.tech) (free PostgreSQL database)

---

## Step 1: Set Up Database (5 minutes)

1. Go to [neon.tech](https://neon.tech) and sign up
2. Create a new project named "FoodTrackers"
3. Copy the connection string (looks like: `postgresql://user:password@ep-xxx.region.aws.neon.tech/database?sslmode=require`)
4. Save this connection string - you'll need it later

---

## Step 2: Deploy Backend to Render (10 minutes)

1. **Go to Render**
   - Visit [render.com](https://render.com)
   - Sign in with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub account (if not already)
   - Select the `FoodTrackers` repository

3. **Configure Service**
   - Name: `foodtrackers-backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`

4. **Add Environment Variable**
   - Click "Advanced" or "Environment"
   - Add variable: `DATABASE_URL` = your Neon connection string
   - Click "Add Environment Variable"

5. **Deploy**
   - Click "Create Web Service"
   - Wait 3-5 minutes for deployment
   - **Copy your backend URL** (e.g., `https://foodtrackers-backend.onrender.com`)

---

## Step 3: Update Frontend Configuration (2 minutes)

1. **Edit vercel.json**
   - Open `vercel.json` in your repository
   - Find the line: `"destination": "https://your-backend-url.onrender.com/api/$1"`
   - Replace `https://your-backend-url.onrender.com` with your actual Render URL
   - Example: `"destination": "https://foodtrackers-backend.onrender.com/api/$1"`

2. **Commit and Push**
   ```bash
   git add vercel.json
   git commit -m "Update backend URL for deployment"
   git push
   ```

---

## Step 4: Deploy Frontend to Vercel (5 minutes)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Find and select your `FoodTrackers` repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: Other
   - Build Command: `npm run build` (usually auto-detected)
   - Output Directory: `dist/public`
   - Install Command: `npm install` (usually auto-detected)

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment
   - Click "Visit" to see your deployed app!

---

## Step 5: Verify Deployment (5 minutes)

1. **Test Frontend**
   - Visit your Vercel URL
   - App should load without errors
   - Check browser console (F12) - should have no red errors

2. **Test Backend Connection**
   - Try adding a food item
   - If it works, deployment is successful! 🎉

3. **If Something's Wrong**
   - Check [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for troubleshooting

---

## You're Done! 🎊

Your FoodTrackers app is now live!

- **Frontend**: Your Vercel URL (e.g., `https://foodtrackers.vercel.app`)
- **Backend**: Your Render URL (e.g., `https://foodtrackers-backend.onrender.com`)

### Automatic Updates

When you push to GitHub:
- Vercel automatically redeploys your frontend
- Render automatically redeploys your backend

Just commit and push - your app updates automatically!

---

## Need Help?

- 📖 [Full Vercel Guide](./README_deploy_varcel.md)
- 📖 [Full Render Guide](./README_render_backend.md)
- ✅ [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md)
- 🐛 [Open an Issue](https://github.com/Faizzz7348/FoodTrackers/issues)

---

## Common First-Time Issues

### "Build failed on Vercel"
- Make sure you committed all changes
- Verify `npm run build` works locally
- Check Vercel build logs for specific error

### "API calls fail / CORS error"
- Verify you updated `vercel.json` with correct backend URL
- Check backend is running on Render
- Make sure you pushed the updated `vercel.json`

### "Database connection error"
- Verify `DATABASE_URL` is set in Render
- Check Neon database is active (not paused)
- Ensure connection string includes `?sslmode=require`

---

**Pro Tip**: Bookmark your deployment URLs and share them with friends!
