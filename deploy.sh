#!/bin/bash

KEYCLOAK_SERVICE_COMPOSE_FILE_PATH="keycloak-service/docker-compose.yml"
AUTH_SERVICE_COMPOSE_FILE_PATH="auth-service/docker-compose.yml"
AUTH_SERVICE_CONTAINER="auth-service"
ACCOUNT_SERVICE_COMPOSE_FILE_PATH="account-service/docker-compose.yml"
ACCOUNT_SERVICE_CONTAINER="account-service-app"
BUSINESS_SERVICE_COMPOSE_FILE_PATH="business-service/docker-compose.yml"
BUSINESS_SERVICE_CONTAINER="business-service-app"
KONG_COMPOSE_FILE_PATH="docker-kong/compose/docker-compose.yml"

# Check health container
check_service() {
  SERVICE_NAME=$1  # Nhận tham số là tên service
  MAX_RETRIES=3
  RETRY_COUNT=0

  echo "🔍 Checking if $SERVICE_NAME is running..."

  # Chờ cho đến khi container chạy hoặc retry tối đa 3 lần
  while [ "$(docker inspect --format='{{.State.Running}}' $SERVICE_NAME 2>/dev/null)" != "true" ]; do
    if [ $RETRY_COUNT -ge $MAX_RETRIES ]; then
      echo "❌ $SERVICE_NAME did not start after $MAX_RETRIES attempts. Exiting..."
      exit 1  # Ném lỗi và thoát
    fi

    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "⏳ Waiting for $SERVICE_NAME to start... Retry #$RETRY_COUNT"
    sleep 2
  done

  echo "✅ $SERVICE_NAME is running!"
}

echo "[1] Start copy env"
cp env/.env.local business-service/.env.local
cp env/.env.local auth-service/.env.local
cp env/.env.local account-service/.env.local
echo "[1] End copy env. [Success]"
echo "Wait start [2]..."
sleep 5

echo "[2] Start apply common"
cd common
npm run build && npm pack
cd ..
cp common/common-0.0.1.tgz business-service/common-0.0.1.tgz
cp common/common-0.0.1.tgz auth-service/common-0.0.1.tgz
cp common/common-0.0.1.tgz account-service/common-0.0.1.tgz
echo "[2] End apply common. [Success]"
echo "Wait start [3]..."
sleep 10

echo "[3] Start deploy"

# echo "[3-1] Remove existing service"
# # docker-compose -f $KONG_COMPOSE_FILE_PATH down -v
# # docker-compose -f $KEYCLOAK_SERVICE_COMPOSE_FILE_PATH down -v
# # docker-compose -f $AUTH_SERVICE_COMPOSE_FILE_PATH down -v
# # docker-compose -f $BUSINESS_SERVICE_COMPOSE_FILE_PATH down -v
# # docker-compose -f $ACCOUNT_SERVICE_COMPOSE_FILE_PATH down -v
# echo "[3-1] Remove existing service successfully"

sleep 10

echo "[3-2] Start build services"
# echo "[3-2-1] Building kong-service... "
# KONG_DATABASE=postgres docker-compose -f $KONG_COMPOSE_FILE_PATH --profile database up -d
# sleep 5

# echo "Building keycloak-service... "
# docker-compose -f $KEYCLOAK_SERVICE_COMPOSE_FILE_PATH up -d
# sleep 10

echo "[3-2-1] Building auth-service... "
docker-compose -f $AUTH_SERVICE_COMPOSE_FILE_PATH up -d
sleep 5

echo "[3-2-2] Building business-service... "
docker-compose -f $BUSINESS_SERVICE_COMPOSE_FILE_PATH up -d
sleep 5

echo "[3-2-3] Building account-service... "
docker-compose -f $ACCOUNT_SERVICE_COMPOSE_FILE_PATH up -d
sleep 5

echo "[3-2] End build services. [Success]"

echo "[3] End deploy. [Success]"

echo "[4] Start check health services"
echo "Waiting for services to be healthy..."
check_service $AUTH_SERVICE_CONTAINER
check_service $BUSINESS_SERVICE_CONTAINER
check_service $ACCOUNT_SERVICE_CONTAINER

echo "[4] End check health services"

echo "Deploy completed!"
exit 0