#!/bin/bash

echo "🔒 Starting security scan..."

# Check for open ports
echo "📡 Checking open ports..."
sudo netstat -tulpn | grep LISTEN

# Check for failed login attempts (basic intrusion detection)
echo "🚨 Checking for failed login attempts..."
grep "Failed password" /var/log/auth.log | tail -n 10

# Check UFW status (firewall)
echo "🛡️ Checking firewall status..."
sudo ufw status

# Docker image scan (requires docker scan installed)
if command -v docker scan &> /dev/null
then
    echo "🐳 Scanning Docker images..."
    images=$(docker images --format "{{.Repository}}:{{.Tag}}")
    for image in $images
    do
        echo "Scanning $image..."
        docker scan "$image"
    done
else
    echo "⚡ Docker scan not installed. Skipping Docker image scan."
fi

echo "✅ Security scan completed."
