# Render Deployment Guide for FoodTrackers Backend

This guide will help you deploy your Express backend to Render.

---

## 1. Prerequisites
- Your backend code should be in the `server` folder.
- Push your latest code to GitHub.
- Ensure your `.env` file contains the correct `DATABASE_URL` for Neon/Postgres.

---

## 2. Deploy to Render
1. Go to [render.com](https://render.com) and sign in with your GitHub account.
2. Click **New Web Service**.
3. Connect your GitHub repo and select your FoodTrackers repository.
4. In Render setup:
   - **Environment**: Node
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm run start` or `node index.js` (if using JS)
   - **Environment Variables**: Add `DATABASE_URL` with your Neon connection string.
5. Click **Create Web Service**.

---

## 3. Update Frontend API URLs
- After deployment, update your frontend to use the new Render backend URL for API requests.

---

## 4. Useful Links
- [Render Documentation](https://render.com/docs)
- [Neon Documentation](https://neon.tech/docs)

---

## Troubleshooting
- If you see build/start errors, check your build and start commands.
- For database errors, ensure your `DATABASE_URL` is correct and accessible.

---

**Contact:** For help, open an issue in the repository or ask in the Render/Neon community forums.
