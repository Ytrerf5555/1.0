# Hotel Management System - Replit Configuration

## Overview

This is a full-stack hotel management system built with React (Vite), Express, and Firebase Firestore. The application provides three distinct interfaces: Customer Panel (for ordering food and requesting services), Staff Panel (for managing orders and service requests), and Admin Panel (for comprehensive system oversight). The system uses real-time Firebase integration for live updates across all panels.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite for development and build tooling
- **Routing**: Wouter (lightweight routing library) for client-side navigation
- **UI Library**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS
- **State Management**: TanStack React Query for server state management and caching
- **Real-time Updates**: Firebase Firestore real-time listeners for live data synchronization

### Backend Architecture
- **Server**: Express.js with TypeScript for API endpoints
- **Database**: PostgreSQL with Drizzle ORM (configured but not actively used in current implementation)
- **Storage Interface**: In-memory storage implementation with plans for database integration
- **Build System**: ESBuild for production builds, TSX for development server

### Data Storage Solutions
- **Primary Database**: Firebase Firestore for real-time data storage and synchronization
- **Schema Management**: Zod for runtime type validation and schema definitions
- **Backup Database**: PostgreSQL with Drizzle ORM (configured for future migration)
- **Session Storage**: Connect-pg-simple for PostgreSQL session storage

## Key Components

### Customer Panel (`/customer`)
- **Food Menu**: Category-based menu with dynamic filtering and item selection
- **Shopping Cart**: Real-time cart management with quantity controls and packaging options
- **Service Requests**: One-click service requests (staff call, water, cleaning, hot water)
- **Bill Requests**: Direct billing request functionality
- **Order Placement**: Firebase integration for order submission with payment mode selection

### Staff Panel (`/staff`)
- **Order Management**: Real-time order queue with automatic status updates
- **Service Alerts**: Priority-based service request handling with countdown timers
- **Order Tracking**: Visual order cards with item details and timestamps
- **Task Completion**: One-click order and service request completion

### Admin Panel (`/admin`)
- **Dashboard**: System overview with key metrics and status indicators
- **Orders Management**: Comprehensive order tracking and status management
- **Billing System**: Bill generation and payment processing
- **Service Requests**: Centralized service request monitoring and assignment
- **Navigation**: Multi-page admin interface with sidebar navigation

### Shared Components
- **Firebase Configuration**: Centralized Firebase setup with environment variable support
- **Schema Definitions**: Type-safe data models using Zod validation
- **UI Components**: Comprehensive component library with consistent theming
- **Real-time Hooks**: Custom hooks for Firebase data synchronization

## Data Flow

### Order Process
1. Customer selects items from menu and adds to cart
2. Customer configures order details (packaging, payment mode)
3. Order submitted to Firebase Firestore with timestamp
4. Real-time listeners update Staff and Admin panels instantly
5. Staff processes order and marks as complete
6. Order status updates propagate to all connected clients

### Service Request Flow
1. Customer submits service request via dedicated buttons
2. Request stored in Firestore with table number and timestamp
3. Staff panel displays priority alerts with countdown timers
4. Staff completes service and removes request from system
5. Admin panel maintains oversight of all service activities

### Real-time Synchronization
- All data changes trigger immediate updates across connected clients
- Firebase Firestore provides automatic conflict resolution and offline support
- React Query manages client-side caching and background updates
- Optimistic updates provide responsive user experience

## External Dependencies

### Firebase Services
- **Firestore**: Real-time NoSQL database for all application data
- **Authentication**: Ready for future user authentication implementation
- **Hosting**: Configured for deployment to Firebase Hosting

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Radix UI**: Accessible component primitives for complex UI elements
- **Lucide React**: Consistent icon library throughout the application
- **Class Variance Authority**: Type-safe variant management for components

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **Vite**: Fast development server with hot module replacement
- **ESBuild**: High-performance bundler for production builds
- **Drizzle Kit**: Database migration and schema management tools

## Deployment Strategy

### Firebase Integration
- **Database**: Firebase Firestore with project ID `gastroflow-dvlg0`
- **Configuration**: Direct Firebase config integration for production deployment
- **Real-time Features**: Firebase real-time listeners for live order and service updates
- **Security Rules**: Open access rules configured for all collections (events, menuItems, tables, settings, bills)

### Production Build
- **Frontend**: Static build output to `dist/public` directory optimized for Firebase Hosting
- **Build Process**: Vite production build with asset optimization and chunking
- **Firebase CLI**: Integrated with firebase-tools for seamless deployment
- **Hosting**: Firebase Hosting serves static React application

### Environment Configuration
- **Firebase Config**: Embedded configuration for gastroflow-dvlg0 project
- **API Keys**: Direct integration without environment variables for Firebase deployment
- **Build Command**: `npm run build` creates production-ready assets
- **Deployment**: `firebase deploy` for one-command deployment to Firebase Hosting

### Deployment URLs
- **Customer Panel**: `https://gastroflow-dvlg0.web.app/customer` (Mobile-optimized)
- **Staff Panel**: `https://gastroflow-dvlg0.web.app/staff` (Tablet-optimized)  
- **Admin Panel**: `https://gastroflow-dvlg0.web.app/admin` (Desktop-optimized)

The system is fully configured for Firebase deployment with real-time database connectivity and mobile-first customer experience.