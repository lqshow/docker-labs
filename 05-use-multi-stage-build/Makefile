SHELL := /bin/bash

BUILD_IMAGE := golang:alpine
REGISTRY := docker.io/lqshow
SINGLE_BUILD_IMAGE := $(REGISTRY)/golang-single-build
MULTI_STAGE_BUILD_IMAGE := $(REGISTRY)/golang-multi-stage-build
VERSION := $(shell git rev-parse --short HEAD)

all: build

build: build-image multi-stage-build-image

version:
	@echo $(VERSION)

build-image:
	@docker build -t $(SINGLE_BUILD_IMAGE):$(VERSION) -f Dockerfile --build-arg BUILD_IMAGE=$(BUILD_IMAGE) .

multi-stage-build-image:
	@docker build -t $(MULTI_STAGE_BUILD_IMAGE):$(VERSION) -f Dockerfile.multi --build-arg BUILD_IMAGE=$(BUILD_IMAGE) .

.PHONY: build \
		build-image \
		multi-stage-build-image