#!/bin/bash

# Mảng lưu các giá trị title
titles=("Giao hưởng" "Ballet" "Kịch" "Ca nhạc" "Liveshow" "Xiếc" "Sự kiện")

# Lặp qua các giá trị trong mảng và gọi API
for title in "${titles[@]}"; do
  curl --location 'http://localhost:8092/api/v1/concert/categories' \
  --header 'x-api-key: SGFub2kgT3BlcmEgSG91c2U=' \
  --header 'Content-Type: application/json' \
  --data "{
      \"title\": \"$title\"
  }"
  echo "Sent request for title: $title"
  
  # Chờ 5 giây trước khi gửi request tiếp theo
  sleep 5
done
  