# Sử dụng Node.js base image
FROM node:18-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép file package.json và package-lock.json
COPY package.json package-lock.json ./

# Sao chép file `.tgz` của thư viện common
COPY common-lib-0.0.1.tgz ./

# Cài đặt thư viện common từ file `.tgz`
RUN npm install ./common-lib-0.0.1.tgz

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng (nếu cần)
RUN npm run build

# Expose port và chạy ứng dụng
EXPOSE 8090
CMD ["npm", "run", "start:prod"]
