#!/bin/bash

echo "🚀 Starting Docker Deployment for Pantera Protocol..."

# Step 1: Check for Required Commands
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose."
    exit 1
fi

# Step 2: Pull the Latest Code
echo "📦 Fetching the latest code updates..."
git pull origin main || { echo "❌ Git pull failed."; exit 1; }

# Step 3: Build and Start Docker Containers
echo "⚙️ Building and starting Docker containers..."
docker-compose down || { echo "⚠️ Failed to stop running containers."; }
docker-compose build || { echo "❌ Docker build failed."; exit 1; }
docker-compose up -d || { echo "❌ Failed to start Docker containers."; exit 1; }

# Step 4: Check Running Containers
echo "🔍 Checking running containers..."
docker ps --format "table {{.Names}}\t{{.Status}}" || { echo "⚠️ Could not retrieve container status."; }

echo "✅ Docker Deployment Successful! 🎉"
