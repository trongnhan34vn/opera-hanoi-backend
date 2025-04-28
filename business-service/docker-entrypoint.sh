#!/bin/sh

echo "[ENTRYPOINT] Starting application..."
npm run start:prod &  # Chạy ứng dụng ở chế độ background

echo "[ENTRYPOINT] Waiting for application to be ready..."
sleep 10  # Chờ ứng dụng ổn định (có thể điều chỉnh thời gian này)

DB_HOST=${DB_HOST:-business-service-db}
DB_PORT=${DB_PORT:-5432}
DB_USER=${DB_USER:-postgres}
DB_PASS=${DB_PASS:-Nhantic1998@}
DB_NAME=${DB_NAME:-business_service_db}

DATABASE_URL="postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
echo "[ENTRYPOINT] Nest application successfully started"

# echo "[ENTRYPOINT] Running database migrations..."
# npx sequelize-cli db:migrate --url "$DATABASE_URL"
# if [ $? -ne 0 ]; then
#   echo "[ENTRYPOINT] Warning: Database migration failed, but continuing..."
# fi
# echo "[ENTRYPOINT] Database migrations completed (or skipped due to failure)"

echo "[ENTRYPOINT] Running database seeders..."
npx sequelize-cli db:seed:all --url "$DATABASE_URL"
if [ $? -ne 0 ]; then
  echo "[ENTRYPOINT] Warning: Database seeding failed, but continuing..."
fi
echo "[ENTRYPOINT] Database seeders completed (or skipped due to failure)"

# Giữ container chạy
wait -n
