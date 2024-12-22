# Use an official Node.js image (version 18) as a base
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Run Prisma generate to ensure the query engine is built for the correct binary target
RUN npx prisma generate

# Expose the backend port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
