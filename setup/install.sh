#!/bin/bash

echo "🚀 Starting Pantera Protocol Installation..."

# Step 1: Check System Requirements
echo "🔍 Checking System Requirements..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install it first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ NPM is not installed. Please install it first."
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install it first."
    exit 1
fi

# Step 2: Clone Repository (If Not Already Cloned)
if [ ! -d "PanteraProtocol" ]; then
    echo "📦 Cloning Pantera Protocol Repository..."
    git clone https://github.com/yourusername/PanteraProtocol.git
    cd PanteraProtocol || exit 1
else
    echo "✅ Repository already exists, skipping clone."
    cd PanteraProtocol || exit 1
fi

# Step 3: Install Backend Dependencies
echo "📦 Installing Backend Dependencies..."
cd backend
npm install || { echo "❌ Backend dependency installation failed."; exit 1; }
cd ..

# Step 4: Install Frontend Dependencies
echo "📦 Installing Frontend Dependencies..."
cd frontend
npm install || { echo "❌ Frontend dependency installation failed."; exit 1; }
cd ..

# Step 5: Setup Environment Variables
echo "🛠️ Setting up Environment Variables..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "✅ .env file created from .env.example."
else
    echo "✅ .env file already exists, skipping setup."
fi

# Step 6: Database Migration
echo "🛠️ Running Database Migration..."
node scripts/migrateDB.js || { echo "❌ Database migration failed."; exit 1; }

# Step 7: Start Services
echo "🚀 Starting Backend & Frontend..."
cd backend
npm start &
cd ../frontend
npm start &

echo "🎉 Installation Complete!"
echo "🌐 Backend running at http://localhost:5000"
echo "🌍 Frontend running at http://localhost:3000"
