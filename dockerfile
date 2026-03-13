# Use Node LTS Alpine
FROM node:20-alpine

# Log base image
RUN echo "🚀 Starting Next.js Docker build using Node 20 Alpine..."

# Set working directory
WORKDIR /app
RUN echo "📂 Working directory set to /app"

# Copy package files
COPY package*.json ./
RUN echo "📦 package.json copied"

# Install dependencies
RUN echo "⬇️ Installing dependencies..." && npm install && echo "✅ Dependencies installed"

# Copy project files
COPY . .
RUN echo "📁 Project files copied"

# Build Next.js app
RUN echo "🏗️ Building Next.js application..." && npm run build && echo "✅ Build completed"

# Expose Next.js port
EXPOSE 3000
RUN echo "🌐 Port 3000 exposed"

# Start the app
CMD echo "🔥 Starting Next.js server..." && npm start