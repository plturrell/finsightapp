#!/bin/bash
set -e

echo "Starting FinSight app in development mode with Docker Compose"
docker-compose up -d

echo "App is running at http://localhost:3000"
echo "Use 'docker-compose logs -f' to view logs"
echo "Use 'docker-compose down' to stop the app"