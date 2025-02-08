#!/bin/bash

echo "🚀 Starting Frontend Deployment for Pantera Protocol..."

# Step 1: Check for Required Commands
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ NPM is not installed. Please install Node.js first."
    exit 1
fi

# Step 2: Pull Latest Code
echo "📦 Fetching latest frontend updates..."
git pull origin main || { echo "❌ Git pull failed."; exit 1; }

# Step 3: Install Dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install || { echo "❌ Failed to install dependencies."; exit 1; }

# Step 4: Build the Frontend
echo "⚙️ Building frontend..."
npm run build || { echo "❌ Frontend build failed."; exit 1; }

# Step 5: Deploy (Choose Your Deployment Method)
echo "🌍 Deploying frontend..."

DEPLOY_METHOD=$1

if [ "$DEPLOY_METHOD" == "vercel" ]; then
    # Deploy to Vercel
    if ! command -v vercel &> /dev/null; then
        echo "❌ Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    vercel --prod || { echo "❌ Vercel deployment failed."; exit 1; }
    echo "✅ Frontend deployed successfully to Vercel! 🚀"

elif [ "$DEPLOY_METHOD" == "netlify" ]; then
    # Deploy to Netlify
    if ! command -v netlify &> /dev/null; then
        echo "❌ Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    fi
    netlify deploy --prod || { echo "❌ Netlify deployment failed."; exit 1; }
    echo "✅ Frontend deployed successfully to Netlify! 🌍"

elif [ "$DEPLOY_METHOD" == "ghpages" ]; then
    # Deploy to GitHub Pages
    npm install --save-dev gh-pages
    npm run deploy || { echo "❌ GitHub Pages deployment failed."; exit 1; }
    echo "✅ Frontend deployed successfully to GitHub Pages! 📄"

else
    echo "⚠️ No deployment method specified. Use one of the following:"
    echo "   ./scripts/deploy_frontend.sh vercel"
    echo "   ./scripts/deploy_frontend.sh netlify"
    echo "   ./scripts/deploy_frontend.sh ghpages"
    exit 1
fi

echo "🎉 Deployment Complete!"
