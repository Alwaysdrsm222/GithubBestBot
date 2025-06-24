# RBC Gaming Community Platform

## Overview

This is a full-stack web application for the RBC (Royal Bengal Cat) Gaming Community, featuring a modern React frontend with a Node.js/Express backend. The platform provides giveaway management, custom page creation, and community features for a Discord-based gaming community with a tiger-themed design.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom tiger-themed color palette
- **Animation**: Framer Motion for smooth animations and transitions
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: In-memory storage with fallback to PostgreSQL sessions
- **Development**: tsx for TypeScript execution in development

### Database Architecture
- **ORM**: Drizzle ORM with TypeScript-first approach
- **Schema Location**: Shared schema in `/shared/schema.ts`
- **Migration Management**: Drizzle Kit for schema migrations
- **Validation**: Zod schemas derived from Drizzle schemas

## Key Components

### Data Models
1. **Users Table**: Basic user authentication with username/password
2. **Giveaways Table**: Contest management with prizes, duration, and entry tracking
3. **Custom Pages Table**: Dynamic content management for landing pages, rules, tournaments

### API Endpoints
- `GET/POST /api/giveaways` - Giveaway CRUD operations
- `GET /api/giveaways/active` - Active giveaways only
- `GET /api/giveaways/:id` - Individual giveaway details
- `GET/POST /api/pages` - Custom page management
- `GET /api/stats` - Community statistics

### UI Components
- **Navigation**: Fixed header with smooth scrolling and mobile menu
- **Hero Section**: Animated landing with tiger-themed branding
- **Giveaway Cards**: Interactive contest displays with entry tracking
- **Admin Dashboard**: Management interface for content and giveaways
- **Animated Background**: Dynamic particle effects and floating elements

## Data Flow

1. **Client Requests**: React components use TanStack Query hooks
2. **API Layer**: Express routes handle HTTP requests
3. **Data Access**: Storage layer abstracts database operations
4. **Database**: PostgreSQL with Drizzle ORM for type-safe queries
5. **Response**: JSON data flows back through the same path
6. **State Management**: TanStack Query caches and manages server state
7. **UI Updates**: React components re-render based on state changes

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library
- **wouter**: Lightweight React router
- **zod**: Runtime type validation

### UI Dependencies
- **@radix-ui/***: Headless UI components (30+ components)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Modern icon library

### Development Dependencies
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev`
- **Server**: tsx runs TypeScript directly
- **Client**: Vite dev server with HMR
- **Database**: Connects to Neon Database via DATABASE_URL

### Production Build
- **Client Build**: `vite build` outputs to `dist/public`
- **Server Build**: `esbuild` bundles server code to `dist/index.js`
- **Static Assets**: Served from `dist/public` directory
- **Database**: Same PostgreSQL connection in production

### Replit Configuration
- **Modules**: nodejs-20, web, postgresql-16
- **Deployment**: Autoscale with build and run commands
- **Port**: 5000 (mapped to external port 80)
- **Environment**: DATABASE_URL required for database connection

## Changelog

Changelog:
- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.