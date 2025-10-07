# Deployment Verification Checklist

Use this checklist to ensure your deployment is successful.

## ✅ Pre-Deployment Checklist

### Local Development
- [ ] All dependencies installed: `npm install`
- [ ] Build completes successfully: `npm run build`
- [ ] Development server runs: `npm run dev`
- [ ] No TypeScript errors: `npm run check`
- [ ] All changes committed and pushed to GitHub

### Environment Setup
- [ ] Neon PostgreSQL database created and accessible
- [ ] `DATABASE_URL` connection string obtained
- [ ] Database schema pushed: `npm run db:push`

## 🚀 Backend Deployment (Render)

- [ ] Render account created and linked to GitHub
- [ ] New Web Service created from FoodTrackers repository
- [ ] Build command set: `npm install && npm run build`
- [ ] Start command set: `npm run start`
- [ ] Environment variable `DATABASE_URL` added
- [ ] Deployment successful (check logs for errors)
- [ ] Backend URL noted (e.g., https://foodtrackers-backend.onrender.com)
- [ ] API endpoints tested and responding

### Test Backend Endpoints
```bash
# Replace with your actual backend URL
curl https://your-backend-url.onrender.com/api/food-items
```

## 🌐 Frontend Deployment (Vercel)

- [ ] `vercel.json` updated with actual backend URL
- [ ] Changes committed and pushed to GitHub
- [ ] Vercel account created and linked to GitHub
- [ ] New project created from FoodTrackers repository
- [ ] Build command verified: `npm run build`
- [ ] Output directory verified: `dist/public`
- [ ] Deployment successful
- [ ] Frontend URL accessible
- [ ] Frontend can communicate with backend

### Test Frontend
- [ ] Visit Vercel deployment URL
- [ ] Check browser console for errors
- [ ] Test adding a food item
- [ ] Test editing a food item
- [ ] Test deleting and restoring an item
- [ ] Verify calendar view works
- [ ] Check notifications work (if enabled)

## 🔧 Post-Deployment

### Configuration
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enabled (automatic on Vercel/Render)
- [ ] Environment variables verified

### Monitoring
- [ ] Check Render logs for any backend errors
- [ ] Check Vercel logs for any frontend errors
- [ ] Set up monitoring/alerts if needed

### Documentation
- [ ] Update README with deployment URLs
- [ ] Document any deployment-specific configurations
- [ ] Share deployment URLs with team/users

## 🐛 Common Issues and Solutions

### Issue: Build fails on Vercel
**Solution**: 
- Verify `package.json` has all dependencies
- Check build logs for specific errors
- Ensure `npm run build` works locally

### Issue: Backend deployment fails on Render
**Solution**:
- Check Render logs for specific error messages
- Verify `DATABASE_URL` is set correctly
- Ensure build and start commands are correct

### Issue: API requests fail (CORS errors)
**Solution**:
- Verify backend URL in `vercel.json` is correct
- Check that backend is running and accessible
- Add CORS middleware to Express if needed

### Issue: Database connection fails
**Solution**:
- Verify `DATABASE_URL` format is correct
- Check Neon database is not paused
- Ensure SSL is enabled in connection string

### Issue: 404 errors on frontend routes
**Solution**:
- Verify `vercel.json` rewrites configuration
- Check that all routes are properly configured
- Ensure Vercel serves index.html for all routes

## 📊 Success Criteria

Your deployment is successful when:
- ✅ Backend is running on Render without errors
- ✅ Frontend is accessible on Vercel
- ✅ API requests from frontend to backend work
- ✅ Database operations (CRUD) work correctly
- ✅ No console errors in browser
- ✅ All features work as expected

## 🎉 You're Done!

Once all items are checked off, your FoodTrackers app is successfully deployed!

### Share Your Deployment
- Frontend URL: `https://your-app.vercel.app`
- Backend URL: `https://your-backend.onrender.com`

### Next Steps
- Set up automatic deployments (already configured with GitHub integration)
- Monitor performance and errors
- Gather user feedback
- Plan future features

---

Need help? See [README_deploy_varcel.md](./README_deploy_varcel.md) and [README_render_backend.md](./README_render_backend.md)
