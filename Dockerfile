# Stage 1: Build React app
FROM node:18 AS build

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build files
COPY --from=build /app/build /usr/share/nginx/html

# Replace default nginx.conf with custom one
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Cloud Run expects container to listen on $PORT
ENV PORT=8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
