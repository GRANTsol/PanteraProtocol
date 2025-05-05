#!/bin/bash

echo "🚀 Starting cleanup process..."

# Clean up Docker unused images, containers, volumes
echo "🧹 Cleaning Docker system..."
docker system prune -af
docker volume prune -f

# Clean up old log files (older than 7 days)
LOG_DIR="/var/log/pantera"
if [ -d "$LOG_DIR" ]; then
    echo "🧹 Cleaning up old log files in $LOG_DIR ..."
    find "$LOG_DIR" -type f -name "*.log" -mtime +7 -exec rm -f {} \;
else
    echo "ℹ️ No log directory found at $LOG_DIR, skipping log cleanup."
fi

echo "✅ Cleanup completed!"
