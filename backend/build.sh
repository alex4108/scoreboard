#!/usr/bin/env bash
set -x

if [[ -z "$1" ]]; then
    $1="latest"
fi

docker buildx create --use
docker buildx build --platform linux/amd64,linux/arm/v7 -t alex4108/scoreboard-backend:$1 . --push

