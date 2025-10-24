# ---------- Stage 1: Build the React app ----------
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire source code
COPY . .

# Build the React app for production
RUN npm run build

# ---------- Stage 2: Run with Nginx ----------
FROM nginx:1.25-alpine

# Copy the React build output to Nginx's html folder
COPY --from=build /app/build /usr/share/nginx/html

# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Add custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d

# Expose port 8080 (Cloud Run listens here)
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
