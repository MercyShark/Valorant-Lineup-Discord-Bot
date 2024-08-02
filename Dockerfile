# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Define the command to run your application
CMD ["node", "index.js"]
