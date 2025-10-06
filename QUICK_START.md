# Quick Start Guide

This guide will help you get FoodTrackers up and running in less than 2 minutes.

## Step 1: Install Dependencies

```bash
npm install
```

**Important**: Only run `npm install` in the root directory. Do NOT run it in the `client` folder.

## Step 2: Run the Application

```bash
npm run dev
```

This single command starts both:
- The backend API server
- The frontend development server with hot reload

## Step 3: Access the Application

Open your browser and go to:
```
http://localhost:5000
```

That's it! The application is now running with in-memory storage.

## Optional: Add Environment Variables

Create a `.env` file in the root directory (you can copy `.env.example`):

```bash
# Optional - PostgreSQL database
DATABASE_URL='postgresql://user:password@host:port/database'

# Optional - Admin password for protected features
ADMIN_PASSWORD='your-secure-password'

# Optional - Custom port (defaults to 5000)
PORT=5000
```

**Note**: The app works perfectly fine without any environment variables. It will use in-memory storage by default.

## Troubleshooting

### Issue: Port 5000 is already in use
**Solution**: Change the port in `.env` file:
```
PORT=3000
```

### Issue: Cannot find module errors
**Solution**: Make sure you ran `npm install` in the root directory (not in the client folder)

### Issue: Database connection error
**Solution**: The app will automatically fall back to in-memory storage. This is normal if you don't have a PostgreSQL database configured.

## What's Next?

- Check out the full [README.md](README.md) for detailed documentation
- Learn about the [architecture](replit.md)
- Start adding food items to track their expiration dates!

## Architecture Overview

```
┌─────────────────────────────────────┐
│     Single Server (Port 5000)       │
├─────────────────────────────────────┤
│                                     │
│  Frontend (Vite Dev)  ←→  Backend   │
│      React App            Express   │
│                              API    │
│                                     │
└─────────────────────────────────────┘
```

In development, everything runs on a single server at `localhost:5000`. The Express server integrates Vite middleware to serve both the frontend and backend.
