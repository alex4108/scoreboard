#!/usr/bin/env bash
set -x

docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm/v7 -t alex4108/scoreboard-frontend . --push

docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm/v7 -f Dockerfile.tls -t alex4108/scoreboard-frontend-tls . --push
