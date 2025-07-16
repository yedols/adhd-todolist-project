# 1단계: 빌드
FROM node:20 AS builder

WORKDIR /app
COPY . .
RUN npm install && npm run build && ls -l /app

# 2단계: 정적 웹 서버로 배포 (nginx 사용)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
