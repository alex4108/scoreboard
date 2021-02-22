#!/usr/bin/env bash
set -x

docker build -t alex4108/scoreboard-frontend .
docker build -t alex4108/scoreboard-frontend-tls -f Dockerfile.tls .

