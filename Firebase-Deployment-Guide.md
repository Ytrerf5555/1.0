# Firebase Deployment Guide - Hotel Management System

## 🚀 Quick Deployment Steps

### Prerequisites
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login
```

### 1. Firebase Project Setup
```bash
# Initialize Firebase project
firebase init

# Select the following features:
# ✅ Firestore: Configure security rules and indexes files
# ✅ Hosting: Configure files for Firebase Hosting
# ✅ Storage: Configure a security rules file for Firebase Storage
```

### 2. Project Configuration
Create `.firebaserc` file:
```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### 3. Environment Variables
Update `client/src/lib/firebase.ts` with your Firebase config:
```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 4. Deploy
```bash
# Build and deploy
./deploy.sh

# Or deploy manually:
npm run build
firebase deploy
```

## 📋 System Requirements

### Add New Item Feature Requirements:
- ✅ **Name**: Text input (required, min 2 characters)
- ✅ **Description**: Textarea (required, min 10 characters)  
- ✅ **Price**: Number input (required, > 0)
- ✅ **Category**: Dropdown (Starters, Main Course, Desserts, Beverages, Snacks, Salads)
- ✅ **Image Upload**: File input (PNG, JPG, GIF up to 5MB)
- ✅ **Vegetarian**: Checkbox
- ✅ **Spicy**: Checkbox
- ✅ **Preparation Time**: Number input (minutes)
- ✅ **Validation**: Form validation with error messages
- ✅ **Preview**: Image preview before upload
- ✅ **Storage**: Firebase Storage integration for images

### Table Management Requirements:
- ✅ **Add Tables**: Dynamic table creation with seat count
- ✅ **Table Status**: Available, Occupied, Reserved, Maintenance
- ✅ **Reservations**: Customer name and time tracking
- ✅ **Status Changes**: One-click status updates
- ✅ **Remove Tables**: Delete tables (with safety checks)
- ✅ **Statistics**: Real-time table occupancy overview
- ✅ **Visual Cards**: Table cards with status indicators

### Reports & Analytics Requirements:
- ✅ **Time Periods**: Today, Week, Month, Quarter, Year
- ✅ **Key Metrics**: Revenue, Orders, Customers, Average Order Value
- ✅ **Popular Items**: Top-selling items with revenue breakdown
- ✅ **Hourly Stats**: Today's performance by hour
- ✅ **Export Feature**: CSV/PDF report generation
- ✅ **Growth Tracking**: Period-over-period comparisons
- ✅ **Visual Dashboard**: Cards and charts for easy reading

### Settings Requirements:
- ✅ **Restaurant Info**: Name, address, phone, email, description
- ✅ **Operating Hours**: Opening and closing times
- ✅ **Business Settings**: Max tables, tax percentage
- ✅ **Notifications**: Configurable alert preferences
- ✅ **Integrations**: WiFi, printer, payment, delivery status
- ✅ **System Info**: Version, database status, storage usage
- ✅ **Multi-tab Interface**: Organized settings sections

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for development and building
- **Tailwind CSS** + **Shadcn/ui** for styling
- **Firebase SDK** for real-time data
- **React Hook Form** + **Zod** for form validation

### Backend
- **Express.js** server (for development)
- **Firebase Functions** (for production)
- **Firebase Firestore** for real-time database
- **Firebase Storage** for image uploads

### Database Structure
```
/events (orders and service requests)
/menuItems (food items with images)
/tables (table management)
/settings (restaurant configuration)
/bills (billing records)
```

### Storage Structure
```
/menu-images/{itemId}.jpg (food images)
/restaurant-images/{imageId}.jpg (restaurant photos)
```

## 🔐 Security Rules

- **Firestore**: Open read/write for development (customize for production)
- **Storage**: Image uploads with size limits (5MB menu items, 10MB restaurant)
- **Hosting**: CORS headers for API access

## 📱 Mobile Responsive

All panels are fully responsive:
- **Mobile**: Touch-friendly interfaces, compact layouts
- **Tablet**: Optimized for medium screens
- **Desktop**: Full feature access with sidebar navigation

## 🌐 Live URLs Structure

After deployment, your system will be available at:
- **Landing**: `https://your-project.web.app/`
- **Customer Panel**: `https://your-project.web.app/customer`
- **Staff Panel**: `https://your-project.web.app/staff`
- **Admin Panel**: `https://your-project.web.app/admin`

## ✅ Deployment Checklist

- [ ] Firebase project created
- [ ] Firebase CLI installed and logged in
- [ ] Environment variables configured
- [ ] Build process successful
- [ ] Firestore rules deployed
- [ ] Storage rules deployed  
- [ ] Hosting deployed
- [ ] Domain configured (optional)
- [ ] SSL certificate active
- [ ] All panels tested on mobile and desktop

The system is **production-ready** with real-time synchronization, complete CRUD operations, and mobile-responsive design across all three panels.