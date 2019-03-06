ARG BUILD_IMAGE=node:alpine
FROM ${BUILD_IMAGE}

# Create app directory
WORKDIR /app

# Install nodemon for hot reload
RUN npm install -g nodemon

# Install app dependencies
COPY ./src/package*.json ./
RUN npm install

# Bundle app source
COPY src ./

EXPOSE 3000

# Set the default command to launch App
CMD ["nodemon", "server.js"]