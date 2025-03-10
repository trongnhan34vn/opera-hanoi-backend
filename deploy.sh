#!/bin/bash

AUTH_SERVICE_COMPOSE_FILE_PATH="auth-service/docker-compose.yml"
AUTH_SERVICE_CONTAINER="auth-service"
ACCOUNT_SERVICE_COMPOSE_FILE_PATH="account-service-v2/docker-compose.yml"
ACCOUNT_SERVICE_CONTAINER="account-service-app"
BUSINESS_SERVICE_COMPOSE_FILE_PATH="business-service/docker-compose.yml"
BUSINESS_SERVICE_CONTAINER="business-service-app"

# Check health container
check_service() {
  SERVICE_NAME=$1  # Nhận tham số là tên service
  echo "🔍 Checking if $SERVICE_NAME is running..."

  # Chờ cho đến khi container chạy
  while [ "$(docker inspect --format='{{.State.Running}}' $SERVICE_NAME 2>/dev/null)" != "true" ]; do
    echo "⏳ Waiting for $SERVICE_NAME to start..."
    sleep 2
  done

  echo "✅ $SERVICE_NAME is running!"
}

echo "Start deploy... "

echo "Remove existing service... "
docker-compose -f $AUTH_SERVICE_COMPOSE_FILE_PATH down -v
docker-compose -f $BUSINESS_SERVICE_COMPOSE_FILE_PATH down -v
docker-compose -f $ACCOUNT_SERVICE_COMPOSE_FILE_PATH down -v

echo "Building auth-services... "
docker-compose -f $AUTH_SERVICE_COMPOSE_FILE_PATH up -d

echo "Building business-services... "
docker-compose -f $BUSINESS_SERVICE_COMPOSE_FILE_PATH up -d

echo "Building account-services... "
docker-compose -f $ACCOUNT_SERVICE_COMPOSE_FILE_PATH up -d

echo "Waiting for services to be healthy..."
check_service $AUTH_SERVICE_CONTAINER
check_service $BUSINESS_SERVICE_CONTAINER
check_service $ACCOUNT_SERVICE_CONTAINER

echo "Deployment completed successfully!"
