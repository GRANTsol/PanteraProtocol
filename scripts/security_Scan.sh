#!/bin/bash

set -e

echo "🔒 Starting security scan..."

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   echo "⚠️  This script must be run as root (sudo) for full functionality."
fi

# Check for open ports
echo "📡 Checking open ports..."
if command -v ss &> /dev/null; then
    ss -tulpn | grep LISTEN
elif command -v netstat &> /dev/null; then
    netstat -tulpn | grep LISTEN
else
    echo "❌ Neither ss nor netstat found."
fi

# Check for failed login attempts (basic intrusion detection)
echo "🚨 Checking for failed login attempts..."
if [ -f /var/log/auth.log ]; then
    grep "Failed password" /var/log/auth.log | tail -n 10
elif [ -f /var/log/secure ]; then
    grep "Failed password" /var/log/secure | tail -n 10
else
    echo "❌ No auth log found."
fi

# Check UFW status (firewall)
echo "🛡️ Checking firewall status..."
if command -v ufw &> /dev/null; then
    ufw status
else
    echo "❌ UFW not installed."
fi

# Docker image scan (requires docker scan installed)
if command -v docker &> /dev/null && command -v docker scan &> /dev/null; then
    echo "🐳 Scanning Docker images..."
    images=$(docker images --format "{{.Repository}}:{{.Tag}}")
    if [ -z "$images" ]; then
        echo "No Docker images found."
    else
        for image in $images; do
            echo "Scanning $image..."
            docker scan "$image"
        done
    fi
else
    echo "⚡ Docker or docker scan not installed. Skipping Docker image scan."
fi

echo "✅ Security scan completed."
