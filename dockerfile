# Use the official Node.js image with Yarn as the package manager
FROM node:latest

# Set the working directory to /app
WORKDIR /

# Copy package.json and yarn.lock to the working directory
COPY package*.json  ./

# Install dependencies using Yarn
RUN yarn install

# Copy the entire application to the working directory
COPY . .

# Build the application
RUN yarn build

# Expose the port on which your application will run
EXPOSE 3003

# Command to run your application
CMD ["yarn", "start:prod"]
