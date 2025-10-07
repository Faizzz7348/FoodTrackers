# Render Deployment Guide for FoodTrackers Backend

This guide will help you deploy your Express backend to Render.

---

## 1. Prerequisites
- Your backend code should be in the `server` folder
- Push your latest code to GitHub
- Ensure you have a Neon PostgreSQL database with the connection string ready

---

## 2. Deploy to Render

### Step 1: Create Web Service
1. Go to [render.com](https://render.com) and sign in with your GitHub account
2. Click **New Web Service**
3. Connect your GitHub repo and select your FoodTrackers repository

### Step 2: Configure Service
Configure the following settings:

- **Name**: `foodtrackers-backend` (or your choice)
- **Environment**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start`
- **Environment Variables**: 
  - Add `DATABASE_URL` with your Neon PostgreSQL connection string
  - Example: `postgresql://user:password@host/database?sslmode=require`

### Step 3: Deploy
1. Click **Create Web Service**
2. Wait for the build and deployment to complete (usually 2-5 minutes)
3. Once deployed, you'll see your backend URL (e.g., `https://foodtrackers-backend.onrender.com`)
4. **Important**: Copy this URL - you'll need it for the frontend deployment

---

## 3. Update Frontend Configuration

After your backend is deployed:

1. Update `vercel.json` in the project root
2. Replace the placeholder backend URL with your actual Render URL
3. Commit and push the changes
4. The frontend will use this URL for API requests

---

## 4. Testing Your Backend

Test your backend endpoints using curl or Postman:

```bash
# Test health check (if available)
curl https://your-backend-url.onrender.com/

# Test API endpoint
curl https://your-backend-url.onrender.com/api/food-items
```

---

## 5. Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string |
| `NODE_ENV` | Auto | Set to `production` automatically |
| `PORT` | Auto | Set by Render automatically |
| `ADMIN_PASSWORD` | Optional | Admin password if using authentication |

---

## 6. Automatic Deployments

Render automatically redeploys when you push to your main branch:

1. Make changes to your code
2. Commit and push to GitHub
3. Render detects the push and starts a new deployment
4. Your app updates automatically

---

## 7. Monitoring and Logs

- **Logs**: Available in the Render dashboard under your service
- **Metrics**: View CPU, memory, and bandwidth usage
- **Events**: Track deployment history and status

---

## Troubleshooting

### Build Failures

**Error: Module not found**
- Ensure all dependencies are listed in `package.json`
- Check that `package-lock.json` is committed
- Try rebuilding: Clear build cache and redeploy

**Error: Build command failed**
- Verify build works locally: `npm run build`
- Check Node version compatibility
- Review build logs in Render dashboard

### Startup Failures

**Error: Cannot find module**
- Ensure build step completed successfully
- Verify start command: `npm run start`
- Check that `dist/index.js` exists after build

**Error: Port already in use**
- Don't specify PORT in environment variables (Render sets it automatically)
- Use `process.env.PORT || 5000` in your code

### Database Connection Issues

**Error: Connection timeout**
- Verify `DATABASE_URL` is set correctly
- Check Neon database is active (not paused)
- Ensure SSL is enabled in connection string

**Error: Authentication failed**
- Check database credentials in `DATABASE_URL`
- Verify user has proper permissions
- Test connection string locally first

### Performance Issues

**Slow response times**
- Render free tier may have cold starts (first request is slow)
- Upgrade to paid tier for always-on service
- Optimize database queries and add indexes

---

## Useful Commands

### Build and Test Locally
```bash
npm install                 # Install dependencies
npm run build              # Build the project
npm run start              # Start production server
npm run dev                # Start development server
```

### Database Migration
```bash
npm run db:push            # Push schema changes to database
```

---

## Useful Links

- [Render Documentation](https://render.com/docs)
- [Render Node.js Guide](https://render.com/docs/deploy-node-express-app)
- [Neon Documentation](https://neon.tech/docs)
- [Express.js Documentation](https://expressjs.com/)

---

## Production Checklist

- [ ] Backend deployed successfully on Render
- [ ] `DATABASE_URL` environment variable set
- [ ] Backend URL copied for frontend configuration
- [ ] API endpoints tested and responding correctly
- [ ] Database connection verified
- [ ] Logs reviewed for any errors
- [ ] Frontend updated with backend URL

---

**Need Help?** Open an issue in the repository or consult the Render documentation.
