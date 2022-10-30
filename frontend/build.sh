#!/usr/bin/env bash
set -x

if [[ -z "$1" ]]; then
    $1="latest"
fi

builders=$(docker buildx ls | grep scoreboard)
if [[ -z "$builders" ]]; then
    docker buildx create --name scoreboard
fi

docker buildx use scoreboard
docker buildx build --platform linux/amd64 -t alex4108/scoreboard-frontend:$1 . --push
docker buildx build --platform linux/amd64 -f Dockerfile.tls -t alex4108/scoreboard-frontend-tls:$1 . --push
