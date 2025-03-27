# Subscription Management System

A full-stack application for managing user subscriptions, built with React, Node.js, Express, and Supabase.

## Features

- User authentication (register, login, logout)
- User management for administrators
- Subscription management
- User profiles
- Responsive UI

## Tech Stack

### Frontend
- React with TypeScript
- React Router for navigation
- Styled Components for styling
- Supabase JS client for database operations
- Hosted on Netlify

### Backend
- Node.js with Express
- TypeScript
- JWT for authentication
- Supabase for database
- Hosted on Railway

### Database
- Supabase (PostgreSQL)

## Project Structure

```
subscription-manager/
├── client/                # Frontend React application
│   ├── public/            # Static assets
│   └── src/
│       ├── components/    # Reusable UI components
│       ├── context/       # React context providers
│       ├── pages/         # Application pages
│       ├── services/      # API services
│       ├── types/         # TypeScript type definitions
│       └── utils/         # Utility functions
│
└── server/                # Backend Express application
    ├── src/
    │   ├── controllers/   # Request handlers
    │   ├── middlewares/   # Express middlewares
    │   ├── routes/        # API routes
    │   └── types/         # TypeScript type definitions
    └── dist/              # Compiled JavaScript files
```

## Setup

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Supabase account

### Database Setup
1. Create a new Supabase project
2. Create a `users` table with the following schema:
   ```sql
   create table users (
     id uuid default uuid_generate_v4() primary key,
     email text unique not null,
     password text not null,
     first_name text not null,
     last_name text not null,
     role text not null default 'user',
     subscription_status text default 'inactive',
     subscription_type text,
     subscription_end_date timestamp with time zone,
     created_at timestamp with time zone default now()
   );
   ```

### Backend Setup
1. Navigate to the server directory: `cd subscription-manager/server`
2. Install dependencies: `npm install`
3. Configure environment variables in `.env`:
   ```
   PORT=5000
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   JWT_SECRET=your_jwt_secret_key
   ```
4. Build the project: `npm run build`
5. Start the server: `npm start`

### Frontend Setup
1. Navigate to the client directory: `cd subscription-manager/client`
2. Install dependencies: `npm install`
3. Update the Supabase configuration in `src/context/AuthContext.tsx`
4. Start the development server: `npm start`

## Deployment

### Backend (Railway)
1. Create a new project on Railway
2. Connect your GitHub repository
3. Configure the environment variables
4. Deploy the application

### Frontend (Netlify)
1. Create a new site on Netlify
2. Connect your GitHub repository
3. Configure the build settings:
   - Build command: `cd client && npm run build`
   - Publish directory: `client/build`
4. Deploy the application

## License
MIT 