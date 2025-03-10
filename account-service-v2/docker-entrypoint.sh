#!/bin/sh

echo "[ENTRYPOINT] Starting application..."
npm run start:prod &  # Chạy ứng dụng ở chế độ background

# Giữ container chạy
wait -n