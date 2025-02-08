#!/bin/bash

echo "🚀 Initializing Pantera Protocol Setup..."

# Step 1: Check for Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install it before proceeding."
    exit 1
fi

# Step 2: Check for NPM
if ! command -v npm &> /dev/null
then
    echo "❌ NPM is not installed. Please install it before proceeding."
    exit 1
fi

# Step 3: Install Backend Dependencies
echo "📦 Installing Backend Dependencies..."
cd backend
npm install || { echo "❌ Failed to install backend dependencies."; exit 1; }
cd ..

# Step 4: Install Frontend Dependencies
echo "📦 Installing Frontend Dependencies..."
cd frontend
npm install || { echo "❌ Failed to install frontend dependencies."; exit 1; }
cd ..

# Step 5: Set Up Environment Variables
echo "🛠️ Setting up environment variables..."
cp .env.example .env || echo "⚠️ No .env.example file found. Please create a .env file manually."

# Step 6: Start Backend Server
echo "🚀 Starting Backend Server..."
cd backend
npm start &
cd ..

# Step 7: Start Frontend Server
echo "🚀 Starting Frontend Server..."
cd frontend
npm start &
cd ..

echo "✅ Pantera Protocol Setup Complete! 🎉"
echo "🌐 Backend is running on http://localhost:5000"
echo "🌍 Frontend is running on http://localhost:3000"
