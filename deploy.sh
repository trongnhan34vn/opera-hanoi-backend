#!/bin/bash

KEYCLOAK_SERVICE_COMPOSE_FILE_PATH="keycloak-service/docker-compose.yml"
AUTH_SERVICE_COMPOSE_FILE_PATH="auth-service/docker-compose.yml"
AUTH_SERVICE_CONTAINER="auth-service"
ACCOUNT_SERVICE_COMPOSE_FILE_PATH="account-service-v2/docker-compose.yml"
ACCOUNT_SERVICE_CONTAINER="account-service-app"
BUSINESS_SERVICE_COMPOSE_FILE_PATH="business-service/docker-compose.yml"
BUSINESS_SERVICE_CONTAINER="business-service-app"
KONG_COMPOSE_FILE_PATH="docker-kong/compose/docker-compose.yml"

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

echo "Apply env..."
cp env/.env.local business-service/.env.local
cp env/.env.local auth-service/.env.local
cp env/.env.local account-service-v2/.env.local

sleep 10

echo "Start deploy... "

echo "Remove existing service... "
docker-compose -f $KONG_COMPOSE_FILE_PATH down -v
docker-compose -f $KEYCLOAK_SERVICE_COMPOSE_FILE_PATH down -v
docker-compose -f $AUTH_SERVICE_COMPOSE_FILE_PATH down -v
docker-compose -f $BUSINESS_SERVICE_COMPOSE_FILE_PATH down -v
docker-compose -f $ACCOUNT_SERVICE_COMPOSE_FILE_PATH down -v

sleep 10

echo "Building kong-service... "
KONG_DATABASE=postgres docker-compose -f $KONG_COMPOSE_FILE_PATH --profile database up -d
sleep 5

echo "Building keycloak-service... "
docker-compose -f $KEYCLOAK_SERVICE_COMPOSE_FILE_PATH up -d
sleep 10

echo "Building auth-service... "
docker-compose -f $AUTH_SERVICE_COMPOSE_FILE_PATH up -d
sleep 5

echo "Building business-service... "
docker-compose -f $BUSINESS_SERVICE_COMPOSE_FILE_PATH up -d
sleep 5

echo "Building account-service... "
docker-compose -f $ACCOUNT_SERVICE_COMPOSE_FILE_PATH up -d
sleep 5

echo "Waiting for services to be healthy..."
check_service $AUTH_SERVICE_CONTAINER
check_service $BUSINESS_SERVICE_CONTAINER
check_service $ACCOUNT_SERVICE_CONTAINER

echo "Deployment completed successfully!"
exit 0