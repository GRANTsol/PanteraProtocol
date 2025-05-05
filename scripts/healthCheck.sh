#!/bin/bash

echo "🚑 Running health check on Pantera Protocol services..."

# Define services and ports
declare -A services
services=(
    ["Backend"]="http://localhost:8000/health"
    ["Frontend"]="http://localhost:3000"
    ["Database"]="5432"
)

# Check Backend and Frontend (HTTP)
for service in "Backend" "Frontend"
do
    url=${services[$service]}
    echo "Checking $service at $url ..."
    response=$(curl --silent --write-out "%{http_code}" --output /dev/null "$url")
    if [ "$response" -eq 200 ]; then
        echo "✅ $service is healthy."
    else
        echo "❌ $service is DOWN or UNREACHABLE!"
    fi
done

# Check Database (Postgres - Port)
DB_PORT=${services["Database"]}
echo "Checking Database at port $DB_PORT ..."
if nc -z localhost $DB_PORT; then
    echo "✅ Database port $DB_PORT is open."
else
    echo "❌ Database port $DB_PORT is closed or unreachable!"
fi

echo "🏁 Healthcheck completed."
