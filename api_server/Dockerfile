# Use a smaller base image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install 

# Bundle app source
COPY . .

# Run the build command (if needed)
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]

