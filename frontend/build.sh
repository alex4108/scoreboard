#!/usr/bin/env bash
set -x

if [[ -z "$1" ]]; then
    $1="latest"
fi

docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm/v7 -t alex4108/scoreboard-frontend:$1 . --push

docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm/v7 -f Dockerfile.tls -t alex4108/scoreboard-frontend-tls:$1 . --push
