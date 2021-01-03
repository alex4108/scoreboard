#!/usr/bin/env bash

docker pull alex4108/scoreboard-frontend
docker pull alex4108/scoreboard-backend
docker-compose down
docker-compose up -d
