#!/usr/bin/env bash
set -x

docker build -t alex4108/scoreboard-backend .
docker push alex4108/scoreboard-backend