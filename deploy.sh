#!/bin/bash

# Hotel Management System - Firebase Deployment Script

echo "🚀 Starting Firebase deployment for Hotel Management System..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if logged into Firebase
if ! firebase projects:list &> /dev/null; then
    echo "🔑 Please login to Firebase first:"
    firebase login
fi

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Deploy to Firebase
echo "🌐 Deploying to Firebase..."

# Deploy Firestore rules and indexes
echo "📋 Deploying Firestore rules and indexes..."
firebase deploy --only firestore

# Deploy Storage rules
echo "💾 Deploying Storage rules..."
firebase deploy --only storage

# Deploy hosting
echo "🏠 Deploying hosting..."
firebase deploy --only hosting

echo "✅ Deployment completed successfully!"
echo ""
echo "🎉 Your Hotel Management System is now live!"
echo "📱 Customer Panel: https://your-project.web.app/customer"
echo "👨‍🍳 Staff Panel: https://your-project.web.app/staff"  
echo "👨‍💼 Admin Panel: https://your-project.web.app/admin"
echo ""
echo "🔧 To set up your project:"
echo "1. Update Firebase configuration in client/src/lib/firebase.ts"
echo "2. Set up your Firebase project ID in .firebaserc"
echo "3. Configure your domain in Firebase Console > Hosting"