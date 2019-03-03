Speed up your builds with Docker Cache

## Overview
在开发应用中，往往在构建项目的依赖时最耗时间。

在使用 Dockerfile 时，如果 RUN 顺序没有掌握好，每次构建镜像都需要重新开始，需要等待，这使得整个构建过程比直接在开发机器上运行都要慢，这肯定不是我们想要的结果。

我们应该将最不频繁改动的放在 Dockerfile 的顶部，可以利用 Docker cache layer 的功能。

平时开发人员频繁的修改代码，频繁的构建新镜像，这个小技巧能够大大缩短构建时间。

## Usage

### Node.js

> 优先复制 package.json 和 package-lock.json 两个文件，安装所需要的依赖
> 只有当 package.json 文件重新更新之后，cache 才会失效，然后重新安装依赖

```dockerfile
# Base build image
ARG BUILD_IMAGE=node:latest
FROM ${BUILD_IMAGE}

# Create app directory
WORKDIR /project

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production && npm cache clean --force

# Bundle app source
COPY ./ ./

# Set the default command to launch App
CMD ["npm","start"]
```
### Python

> 优先复制 requirements.txt 文件，安装所需要的依赖
> 只有当 requirements.txt 文件重新更新之后，cache 才会失效，然后重新安装依赖

```dockerfile
# Base build image
ARG BUILD_IMAGE=python:3.6
FROM ${BUILD_IMAGE}

# Create app directory
WORKDIR /project

# Install app dependencies
COPY requirements.txt ./
RUN pip install -r requirements.txt
 
# Bundle app source
COPY ./ ./
 
# Set the default command to launch App
CMD [ "python", "server.py" ]
```
### Golang

> 优先复制 go.mod 和 go.sum 两个文件，将所需要的依赖下载下来
> 只有当 mod 文件重新更新之后，cache 才会失效，然后重新 download

```dockerfile
# Base build image
ARG BUILD_IMAGE=golang:1.11-alpine
FROM ${BUILD_IMAGE}

# Install some dependencies needed to build the project
RUN apk add --no-cache git

# Force the go compiler to use modules
ENV GO111MODULE on

# Create app directory
WORKDIR /project

# Install app dependencies
COPY go.mod go.sum ./
RUN go mod download

# Bundle app source
COPY ./ ./

#  Build the binary
RUN CGO_ENABLED=0 GOOS=linux go install -v ./...

# Set the default command to launch App
CMD ["./$GOBIN/server"]
```

