#!/bin/bash

echo "🚀 Starting Database Deployment for Pantera Protocol..."

# Step 1: Check for Required Commands
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

if ! command -v pg_dump &> /dev/null; then
    echo "❌ pg_dump is not installed. Please install PostgreSQL utilities."
    exit 1
fi

# Step 2: Set Environment Variables
export DB_HOST="your-database-host"
export DB_PORT="5432"
export DB_USER="your-database-user"
export DB_NAME="your-database-name"
export DB_PASSWORD="your-database-password"

echo "🔐 Database environment variables set."

# Step 3: Backup Current Database (Optional but Recommended)
BACKUP_FILE="backup_$(date +%F_%H-%M-%S).sql"
echo "📦 Creating a backup of the current database..."
pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -F c -b -v -f $BACKUP_FILE || { echo "❌ Backup failed."; exit 1; }
echo "✅ Backup created successfully: $BACKUP_FILE"

# Step 4: Apply Database Migrations
echo "🛠️ Applying database migrations..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f migrations.sql || { echo "❌ Database migration failed."; exit 1; }

# Step 5: Restart Database Service (if applicable)
echo "🔄 Restarting PostgreSQL service..."
sudo systemctl restart postgresql || { echo "⚠️ PostgreSQL service restart failed. Check logs."; exit 1; }

echo "✅ Database Deployment Successful! 🎉"
