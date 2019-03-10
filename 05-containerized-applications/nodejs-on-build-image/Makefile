SHELL := /bin/bash

BUILD_IMAGE := node:alpine
REGISTRY := docker.io/lqshow
IMAGE_NAME := $(REGISTRY)/node-build
VERSION := $(shell git rev-parse --short HEAD)


all: build

.PHONY: version
version:
	@echo $(VERSION)

.PHONY: clean
clean:
	@rm -rf node_modules

.PHONY: build-dev-image
build-dev-image:
	@docker build -t $(IMAGE_NAME)-dev:$(VERSION) -f dev.Dockerfile --build-arg BUILD_IMAGE=$(BUILD_IMAGE) .

.PHONY: run-dev-container
run-dev-container:
	@docker run -it --rm  -p 3000:3000 -v $(pwd):/app $(IMAGE_NAME)-dev:$(VERSION)


.PHONY: build-pro-image
build-pro-image:
	@docker build -t $(IMAGE_NAME)-pro:$(VERSION) -f pro.Dockerfile --build-arg BUILD_IMAGE=$(BUILD_IMAGE) .

.PHONY: run-pro-container
run-pro-container:
	@docker run -it --rm  -p 3000:3000 $(IMAGE_NAME)-pro:$(VERSION)