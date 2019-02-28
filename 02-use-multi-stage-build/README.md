Builds a lightweight image
## Overview
Docker 官方提供了简便的多阶段构建，可以使生产的镜像更小。

## Use Single Build

#### Dockerfile文件

```dockerfile
ARG BUILD_IMAGE=golang:alpine
FROM ${BUILD_IMAGE}

# Copy golang source code from the host
WORKDIR /data/project
COPY ./ ./

# Get dependancies
RUN go get -d -v 

# Build the binary
RUN go build -o server .

CMD ["./server"]
```

#### 执行构建命令

```bash
make build-image
```

#### 查看镜像大小
> lqshow/golang-single-build 镜像将近355MB
```bash
➜  docker images |grep golang-single-build
lqshow/golang-single-build                           46c1a7e                                      2850ca8700d9        23 seconds ago      355MB
```

## Use multi-stage builds

多阶段构建，允许在一个 Dockfile 文件里使用多个 FROM 语句，每个 FROM都有自己的 base image。
通常情况下一个是构建时镜像，另外一个是运行时镜像。
```dockerfile
# STEP 1 Build executable binary
ARG BUILD_IMAGE=golang:alpine
FROM ${BUILD_IMAGE} as builder

# Copy golang source code from the host
WORKDIR /data/project
COPY ./ ./

# Get dependancies and Build the binary
RUN go get -d -v
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o server .

# STEP 2 Build a small image
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /data/project

# Copy our static executable binary
COPY --from=builder /data/project/server .
CMD ["./server"]
```
#### 执行构建命令

```bash
make multi-stage-build-image
```
#### 查看镜像大小

> 建立一个轻量级(13.6MB)的镜像

```bash
➜   docker images |grep golang-multi-stage-build
lqshow/golang-multi-stage-build                            46c1a7e                                      24a8db0afe36        23 seconds ago      13.6MB
```

## References

- [Use multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/)
- [Create the smallest and secured golang docker image based on scratch](https://medium.com/@chemidy/create-the-smallest-and-secured-golang-docker-image-based-on-scratch-4752223b7324)
- [The Go Dockerfile](https://medium.com/@pierreprinetti/the-go-dockerfile-d5d43af9ee3c)

