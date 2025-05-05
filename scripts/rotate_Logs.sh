#!/bin/bash

echo "📦 Starting log rotation..."

LOG_DIR="/var/log/pantera"

if [ ! -d "$LOG_DIR" ]; then
    echo "❗ Log directory $LOG_DIR does not exist. Exiting."
    exit 1
fi

# Find all logs older than 3 days and compress them
find "$LOG_DIR" -type f -name "*.log" -mtime +3 -exec gzip -f {} \;

# Remove compressed logs older than 30 days
find "$LOG_DIR" -type f -name "*.log.gz" -mtime +30 -exec rm -f {} \;

echo "✅ Log rotation completed successfully."
