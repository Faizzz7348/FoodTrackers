# Vercel Deployment Guide for FoodTrackers Frontend

This guide will help you deploy your Vite/React frontend to Vercel.

---

## 1. Prerequisites
- Your frontend code should be in the `client` folder.
- Push your latest code to GitHub.

---

## 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account.
2. Click **New Project** and import your FoodTrackers repository.
3. In project settings:
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.

---

## 3. Set Environment Variables
- In Vercel dashboard, go to your project > Settings > Environment Variables.
- Add any required variables (e.g., API URLs for your backend).

---

## 4. Update API URLs
- Make sure your frontend points to your backend’s deployed URL (e.g., on Render or Railway).

---

## 5. Custom Domain & HTTPS
- Configure a custom domain and enable HTTPS in Vercel settings if needed.

---

## 6. Useful Links
- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [Neon Documentation](https://neon.tech/docs)

---

## Troubleshooting
- If you see build errors, check your build command and output directory.
- For API errors, ensure your backend is deployed and accessible from your frontend.

---

**Contact:** For help, open an issue in the repository or ask in the Vercel/Render community forums.
