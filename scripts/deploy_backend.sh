#!/bin/bash

echo "🚀 Starting Backend Deployment for Pantera Protocol..."

# Step 1: Check for Required Commands
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ NPM is not installed. Please install Node.js first."
    exit 1
fi

# Step 2: Set Environment Variables
export NODE_ENV=production
export MONGO_URI="your-mongodb-connection-string"
export SOLANA_RPC="https://api.mainnet-beta.solana.com"

# Step 3: Pull Latest Code
echo "📦 Fetching latest backend updates..."
git pull origin main || { echo "❌ Git pull failed."; exit 1; }

# Step 4: Install Dependencies
echo "📦 Installing dependencies..."
npm install || { echo "❌ Failed to install dependencies."; exit 1; }

# Step 5: Run Database Migrations
echo "🛠️ Running Database Migrations..."
node scripts/migrateDB.js || { echo "❌ Database Migration Failed."; exit 1; }

# Step 6: Build Production Files (if needed)
echo "⚙️ Building Backend..."
npm run build || { echo "❌ Backend build failed."; exit 1; }

# Step 7: Restart Backend Server
echo "🔄 Restarting Backend Server..."
pm2 restart backend || { echo "⚠️ PM2 not installed, running backend manually."; npm start & }

echo "✅ Backend Deployment Successful! 🎉"
