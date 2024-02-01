# Use a smaller base image
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install 

# Bundle app source
COPY . .

RUN npm run build
# Expose the port
EXPOSE 3000

# Install nodemon globally
RUN npm install -g nodemon

# Start the application with nodemon
CMD ["nodemon", "dist/main.js"]
