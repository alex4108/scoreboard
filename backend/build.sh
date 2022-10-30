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
docker buildx build --platform linux/amd64 -t alex4108/scoreboard-backend:$1 . --push

