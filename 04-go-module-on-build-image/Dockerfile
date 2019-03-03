# STEP 1 Build executable binary
ARG BUILD_IMAGE=golang:alpine
FROM ${BUILD_IMAGE} as builder

# Force the go compiler to use modules
ENV GO111MODULE on
RUN apk add --no-cache git

WORKDIR /project
ARG MODULE=github.com/lqshow/go-module-test
ARG VERSION=latest

# Install app dependencies
COPY go.mod go.sum ./
RUN go mod download

# Bundle app source
COPY ./ ./

#  Build the binary
RUN CGO_ENABLED=0 GOOS=linux go install -v -ldflags "-X ${MODULE}/pkg/version.VERSION=${VERSION}" ./...

# STEP 2 Build a small image
FROM alpine:latest
WORKDIR /project

# Copy our static executable binary
COPY --from=builder /go/bin/server .

CMD ["./server"]
