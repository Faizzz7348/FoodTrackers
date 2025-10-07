# FoodTrackers - Food Expiration Manager

A full-stack web application to track food expiration dates and reduce food waste. Built with React, TypeScript, Express, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL database (optional - uses in-memory storage by default)

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FoodTrackers
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   
   **Note**: You only need to run `npm install` once in the root directory. Do NOT run it separately in the `client` folder.

3. **Set up environment variables (optional)**
   
   Copy the `.env` file and update it with your settings:
   ```bash
   # For PostgreSQL (optional - app works without it)
   DATABASE_URL='your-postgresql-connection-string'
   
   # For admin features (optional)
   ADMIN_PASSWORD='your-admin-password'
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   This single command starts both the backend API server and the frontend Vite dev server.

5. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## 📦 Project Structure

This is a monorepo structure where:
- `/server` - Express backend with TypeScript
- `/client` - React frontend with Vite
- `/shared` - Shared types and schemas
- All dependencies are managed in the root `package.json`

## 🔧 Available Scripts

### Development
- `npm run dev` - Start the development server (runs both frontend and backend)
- `npm run check` - Type check with TypeScript

### Production
- `npm run build` - Build both client and server for production
- `npm start` - Run the production build

### Database
- `npm run db:push` - Push database schema changes (requires DATABASE_URL)

## 🏗️ How It Works

The application uses a unified development setup:

1. **In Development Mode** (`npm run dev`):
   - The Express server starts on port 5000
   - Vite middleware is integrated into Express
   - Both API routes and frontend are served from the same server
   - Hot Module Replacement (HMR) works seamlessly

2. **In Production Mode** (`npm start`):
   - The client is built into static files
   - Express serves the built static files
   - All routes go through the same server on port 5000

## 🗄️ Database Setup

The app supports two storage modes:

### In-Memory Storage (Default)
- No database configuration needed
- Data is stored in memory (lost on restart)
- Perfect for development and testing

### PostgreSQL (Production)
1. Set up a PostgreSQL database (e.g., [Neon](https://neon.tech/), [Supabase](https://supabase.com/))
2. Add your connection string to `.env`:
   ```
   DATABASE_URL='postgresql://user:password@host:port/database'
   ```
3. Push the schema:
   ```bash
   npm run db:push
   ```

## 🔐 Admin Features

Some features require admin authentication:
- Editing items more than 15 days before expiration
- Certain administrative actions

Set the admin password in `.env`:
```
ADMIN_PASSWORD='your-secure-password'
```

## ❌ Common Issues

### "Error: Cannot find module..."
- **Solution**: Run `npm install` in the root directory

### "Port already in use"
- **Solution**: The app uses port 5000. Make sure it's not being used by another application
- Or change the port in `.env`: `PORT=3000`

### "Database connection error"
- **Solution**: If you're not using PostgreSQL, the app will fall back to in-memory storage
- Check your `DATABASE_URL` if you want to use PostgreSQL

### "ADMIN_PASSWORD not configured"
- **Solution**: Add `ADMIN_PASSWORD` to your `.env` file if you need admin features

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TanStack Query for state management
- Tailwind CSS for styling
- Shadcn/ui components

### Backend
- Node.js with Express
- TypeScript
- Drizzle ORM for database
- Zod for validation

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.