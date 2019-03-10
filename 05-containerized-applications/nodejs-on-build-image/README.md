## Overview
Nodejs 整合 Docker Image

## Usage
### Development (Hot Reloading with Nodemon)
> 使用卷将主机上的源代码映射到容器， 并使用 Nodemon 实现热加载
#### Dockerfile
```dockerfile
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
```
#### Deploy
```bash
make build-dev-image
make run-dev-container
```

### Production

#### Dockerfile

```dockerfile
ARG BUILD_IMAGE=node:alpine
FROM ${BUILD_IMAGE}

# Create app directory
WORKDIR /app

# Install app dependencies
COPY ./src/package*.json ./
RUN npm install --only=production && npm cache clean --force

# Bundle app source
COPY src ./

EXPOSE 3000

# Set the default command to launch App
CMD ["node", "server.js"]
```
### Production  (binary)
将 Node.js 项目打包成可执行文件

#### Dockerfile

```dockerfile
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
```
#### Deploy
```bash
make build-pro-image
make run-pro-container
```

## References

- [An Exhaustive Guide to Writing Dockerfiles for Node.js Web Apps](https://blog.hasura.io/an-exhaustive-guide-to-writing-dockerfiles-for-node-js-web-apps-bbee6bd2f3c4)