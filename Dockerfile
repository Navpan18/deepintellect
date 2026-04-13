# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Production stage - using Node.js with serve
FROM node:18-alpine

WORKDIR /app

# Install serve to run the built React app
RUN npm install -g serve

# Copy built app from builder
COPY --from=builder /app/build ./build

# Expose port 7860 for Hugging Face Spaces
EXPOSE 7860

# Set environment variables
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:7860', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Run the app on port 7860
CMD ["serve", "-s", "build", "-l", "7860"]
