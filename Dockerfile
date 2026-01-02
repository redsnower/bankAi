# Simple Dockerfile for the server
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm install --production
COPY server ./
# Copy frontend static files so the server can serve index.html at '/'
COPY web ./web
EXPOSE 3000
CMD ["node", "src/server.js"]
