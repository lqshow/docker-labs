ARG BUILD_IMAGE=node:alpine
FROM ${BUILD_IMAGE} as builder

# Install pkg
RUN npm install -g pkg

# Create app directory
WORKDIR /app

# Install app dependencies
COPY ./src/package*.json ./
RUN npm install --only=production && npm cache clean --force

# Bundle app source
COPY src ./

RUN pkg -c pkg.conf server.js --target node10-linux-x64

FROM node:alpine
WORKDIR /app

# Copy our static executable binary
COPY --from=builder /app/server .

# Set the default command to launch App
CMD ["./server"]