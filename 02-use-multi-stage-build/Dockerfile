ARG BUILD_IMAGE=golang:alpine
FROM ${BUILD_IMAGE}

# Copy golang source code from the host
WORKDIR /project
COPY ./ ./

# Get dependancies
RUN go get -d -v 

# Build the binary
RUN go build -o server .

CMD ["./server"]