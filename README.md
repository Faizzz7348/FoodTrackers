# FoodTrackers - Food Expiration Manager

A full-stack web application to track food expiration dates and reduce food waste. Features a modern dark glass-themed UI with calendar views, countdown warnings, and smart notifications.

## 🚀 Features

- **Smart Tracking**: Monitor food items across multiple categories (dairy, meat, vegetables, fruits, bakery, pantry, frozen)
- **Expiration Warnings**: Visual countdown alerts for items approaching expiration
- **Calendar View**: See all your food items organized by expiration date
- **Trash & Restore**: Soft deletion system to restore accidentally deleted items
- **Browser Notifications**: Get timely alerts for expiring items
- **Dark Theme**: Modern glass morphism UI with dark mode
- **Mobile Responsive**: Works seamlessly on all devices

## 🛠️ Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for fast builds
- TailStack Query for state management
- Radix UI components
- Tailwind CSS with custom theming
- Wouter for routing

### Backend
- Node.js with Express
- TypeScript
- Drizzle ORM
- PostgreSQL (Neon)
- Zod for validation

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database (Neon recommended)

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Faizzz7348/FoodTrackers.git
cd FoodTrackers
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file in the root directory
DATABASE_URL='your_neon_postgresql_connection_string'
ADMIN_PASSWORD='your_admin_password' # Optional
```

4. Push database schema:
```bash
npm run db:push
```

5. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5000`

## 🚢 Deployment

This application is designed to be deployed with the frontend on Vercel and the backend on Render.

### Quick Deployment Guide

1. **Deploy Backend to Render** - See [Render Deployment Guide](./README_render_backend.md)
2. **Deploy Frontend to Vercel** - See [Vercel Deployment Guide](./README_deploy_varcel.md)

### Deployment Overview

- **Frontend**: Deployed to Vercel as static files
- **Backend**: Deployed to Render as a Node.js service
- **Database**: Neon PostgreSQL (cloud-hosted)

For detailed step-by-step instructions, see the deployment guides linked above.

## 📁 Project Structure

```
FoodTrackers/
├── client/              # Frontend React application
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── pages/       # Page components
│       ├── lib/         # Utility functions
│       └── context/     # React contexts
├── server/              # Backend Express API
│   ├── index.ts        # Server entry point
│   ├── routes.ts       # API routes
│   ├── db.ts           # Database connection
│   └── storage.ts      # Data access layer
├── shared/              # Shared types and schemas
├── dist/               # Production build output
├── migrations/         # Database migrations
└── package.json        # Dependencies and scripts
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Push database schema changes

## 🌐 Environment Variables

### Required
- `DATABASE_URL` - PostgreSQL connection string from Neon

### Optional
- `ADMIN_PASSWORD` - Admin password for protected features
- `NODE_ENV` - Set automatically (development/production)
- `PORT` - Server port (default: 5000)

## 📖 API Documentation

### Endpoints

- `GET /api/food-items` - Get all active food items
- `GET /api/food-items/trash` - Get deleted items
- `POST /api/food-items` - Create new food item
- `PUT /api/food-items/:id` - Update food item
- `DELETE /api/food-items/:id` - Soft delete food item
- `POST /api/food-items/:id/restore` - Restore deleted item
- `DELETE /api/food-items/:id/permanent` - Permanently delete item

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For deployment help and troubleshooting:
- [Vercel Deployment Guide](./README_deploy_varcel.md)
- [Render Deployment Guide](./README_render_backend.md)
- [Open an Issue](https://github.com/Faizzz7348/FoodTrackers/issues)

---

Made with ❤️ to help reduce food waste
