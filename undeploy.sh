#!/bin/bash
AUTH_SERVICE_COMPOSE_FILE_PATH="auth-service/docker-compose.yml"
AUTH_SERVICE_CONTAINER="auth-service"
ACCOUNT_SERVICE_COMPOSE_FILE_PATH="account-service/docker-compose.yml"
ACCOUNT_SERVICE_CONTAINER="account-service-app"
BUSINESS_SERVICE_COMPOSE_FILE_PATH="business-service/docker-compose.yml"
BUSINESS_SERVICE_CONTAINER="business-service-app"

echo "Remove existing service... "
docker-compose -f $AUTH_SERVICE_COMPOSE_FILE_PATH down -v
docker-compose -f $BUSINESS_SERVICE_COMPOSE_FILE_PATH down -v
docker-compose -f $ACCOUNT_SERVICE_COMPOSE_FILE_PATH down -v