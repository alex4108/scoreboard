#!/usr/bin/env bash

docker pull alex4108/scoreboard-frontend-tls
docker pull alex4108/scoreboard-backend
docker pull mongo
docker-compose down
docker-compose -f docker-compose-ssl.yml up -d
