# Stage 1: Build React app
FROM node:18 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run with Express server
FROM node:18
WORKDIR /app
COPY --from=build /app/build ./build
COPY server.js .
COPY package.json package-lock.json ./
RUN npm install --only=production
EXPOSE 8080
CMD ["node", "server.js"]
