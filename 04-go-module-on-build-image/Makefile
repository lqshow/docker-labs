SHELL := /bin/bash

BUILD_IMAGE := golang:alpine
REGISTRY := docker.io/lqshow
IMAGE_NAME := $(REGISTRY)/go-module-build
VERSION := $(shell git rev-parse --short HEAD)
MODULE := github.com/lqshow/go-module-test


all: build

.PHONY: version
version:
	@echo $(VERSION)

.PHONY: clean
clean:
	@rm -rf bin

.PHONY: build
build:
	@GOBIN=$(shell mkdir -p ./bin && cd ./bin && pwd) go install -ldflags "-X $(MODULE)/pkg/version.VERSION=$(VERSION)" ./...

.PHONY: run
run:
	@bin/server

.PHONY: build-image
build-image:
	@docker build -t $(IMAGE_NAME):$(VERSION) -f Dockerfile --build-arg BUILD_IMAGE=$(BUILD_IMAGE) .

.PHONY: run-container
run-container:
	@docker run -it --rm  -p 3000:3000 $(IMAGE_NAME):$(VERSION)