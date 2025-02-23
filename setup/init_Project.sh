#!/bin/bash

echo "🚀 Starting Pantera Protocol setup..."

# Install dependencies
echo "🔄 Installing dependencies..."
npm install
pip install -r requirements.txt

# Configure environment variables
echo "🔧 Configuring environment..."
cat <<EOT > .env
REACT_APP_API_URL=https://yourbackend.com
MONGO_URI=mongodb+srv://your_database_uri
SOLANA_RPC_URL=https://jito.rpcpool.com
EOT

# Run migrations
echo "📦 Running database migrations..."
npm run migrate

echo "✅ Setup complete!"
