.PHONY: all copy-env build-common deploy-services check-health

# Variables
ENV_FILE=env/.env.local
COMMON_PKG=common/common-0.0.1.tgz
COMMON_DIR=common

AUTH_SERVICE=auth-service
ACCOUNT_SERVICE=account-service
BUSINESS_SERVICE=business-service

AUTH_SERVICE_CONTAINER=auth-service
ACCOUNT_SERVICE_CONTAINER=account-service-app
BUSINESS_SERVICE_CONTAINER=business-service-app

all: copy-env build-common deploy-services check-health

copy-env:
	@echo "[1] 🛠  Copying .env files..."
	cp $(ENV_FILE) $(AUTH_SERVICE)/.env.local
	cp $(ENV_FILE) $(ACCOUNT_SERVICE)/.env.local
	cp $(ENV_FILE) $(BUSINESS_SERVICE)/.env.local
	@echo "[1] ✅ .env files copied!"
	@echo "⏳ Waiting for next step..."
	sleep 5

build-common:
	@echo "[2] 🧱 Building common package..."
	cd $(COMMON_DIR) && npm run build && npm pack
	cp $(COMMON_PKG) $(BUSINESS_SERVICE)/
	cp $(COMMON_PKG) $(AUTH_SERVICE)/
	cp $(COMMON_PKG) $(ACCOUNT_SERVICE)/
	@echo "[2] ✅ Common package applied."
	@echo "⏳ Waiting for next step..."
	sleep 10

deploy-services:
	@echo "[3] 🚀 Starting deployment..."

	@echo "[3-1] ⌛ Building auth-service... Waiting..."
	docker-compose -f $(AUTH_SERVICE)/docker-compose.yml up -d
	sleep 5

	@echo "[3-2] ⌛ Building business-service... Waiting for auth-service..."
	docker-compose -f $(BUSINESS_SERVICE)/docker-compose.yml up -d
	sleep 5

	@echo "[3-3] ⌛ Building account-service... Waiting for business-service..."
	docker-compose -f $(ACCOUNT_SERVICE)/docker-compose.yml up -d
	sleep 5

	@echo "[3] ✅ Services deployed."

check-health:
	@echo "[4] 🔍 Checking health of services..."
	@$(MAKE) check-service SERVICE_NAME=$(AUTH_SERVICE_CONTAINER)
	@$(MAKE) check-service SERVICE_NAME=$(BUSINESS_SERVICE_CONTAINER)
	@$(MAKE) check-service SERVICE_NAME=$(ACCOUNT_SERVICE_CONTAINER)
	@echo "[4] ✅ Health check complete."

check-service:
	@echo "🔄 Checking if $(SERVICE_NAME) is running..."
	@RETRY=0; MAX=3; \
	while [ "$$(docker inspect --format='{{.State.Running}}' $(SERVICE_NAME) 2>/dev/null)" != "true" ]; do \
		if [ $$RETRY -ge $$MAX ]; then \
			echo "❌ $(SERVICE_NAME) failed to start after $$MAX attempts."; \
			exit 1; \
		fi; \
		echo "⏳ Waiting for $(SERVICE_NAME)... Retry #$$RETRY"; \
		RETRY=$$((RETRY+1)); \
		sleep 2; \
	done; \
	echo "✅ $(SERVICE_NAME) is running!"
