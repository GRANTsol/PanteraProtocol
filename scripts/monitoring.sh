#!/bin/bash

echo "🔍 Starting Monitoring for Pantera Protocol..."

# Define Services & Endpoints
BACKEND_URL="http://localhost:5000/api/health"
FRONTEND_URL="http://localhost:3000"
SOLANA_RPC="https://api.mainnet-beta.solana.com"

# Function to Check Service Status
check_service() {
    RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$1")
    if [ "$RESPONSE" -eq 200 ]; then
        echo "✅ $2 is UP"
    else
        echo "❌ $2 is DOWN (HTTP Code: $RESPONSE)"
    fi
}

# Function to Monitor System Stats
monitor_system() {
    echo "📊 System Resource Usage:"
    echo "-------------------------"
    echo "🖥️  CPU Usage:"
    top -bn1 | grep "Cpu(s)" | awk '{print "   " $2 "% CPU usage"}'

    echo "🛠️  Memory Usage:"
    free -h | awk '/Mem:/ {print "   Used: " $3 ", Available: " $7}'

    echo "💾 Disk Usage:"
    df -h | awk '$NF=="/"{printf "   Disk Usage: %s/%s (%s)\n", $3, $2, $5}'

    echo "📡 Network Connections:"
    netstat -tulnp | grep LISTEN | head -5
}

# Continuous Monitoring Loop
while true; do
    echo "🔄 Running System Health Checks..."
    
    # Check Backend API Health
    check_service "$BACKEND_URL" "Backend API"

    # Check Frontend Health
    check_service "$FRONTEND_URL" "Frontend App"

    # Check Solana RPC Connection
    check_service "$SOLANA_RPC" "Solana RPC Node"

    # Monitor System Resource Usage
    monitor_system

    echo "⏳ Next check in 30 seconds..."
    sleep 30
done
