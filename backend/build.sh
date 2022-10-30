#!/usr/bin/env bash
set -x

# Get long git commit sha
GIT_SHA=$(git rev-parse HEAD)

docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm/v7 -t alex4108/scoreboard-backend:${GIT_SHA} . --push

