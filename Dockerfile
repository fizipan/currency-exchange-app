# Dockerfile for React (Vite)
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the Vite dev server port
EXPOSE 9000

# Command to run the Vite development server
CMD ["npm", "run", "dev"]
