# STEP 1 Build executable binary
ARG BUILD_IMAGE=golang:alpine
FROM ${BUILD_IMAGE} as builder

ENV GO111MODULE on
RUN apk add --no-cache git

# Copy golang source code from the host
WORKDIR /project
COPY ./ ./

ARG MODULE=github.com/lqshow/go-module-test
ARG VERSION=latest

# Get dependancies and Build the binary
RUN CGO_ENABLED=0 GOOS=linux go install -v -ldflags "-X ${MODULE}/pkg/version.VERSION=${VERSION}" ./...

# STEP 2 Build a small image
FROM alpine:latest
WORKDIR /project

# Copy our static executable binary
COPY --from=builder /go/bin/server .

CMD ["./server"]
