# Deploying FoodTrackers Frontend to Vercel

This guide will help you deploy the frontend (Vite/React) of FoodTrackers to Vercel.

---

## 1. Prerequisites
- Make sure your frontend code is in the `client` folder.
- Push your latest code to GitHub.

---

## 2. Deploy to Vercel
1. Go to [Vercel](https://vercel.com) and sign in with your GitHub account.
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

## 4. Backend API
- Vercel is for frontend only. Deploy your backend (Express server) to Render, Railway, or Fly.io.
- Update your frontend API URLs to point to your backend deployment.

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
