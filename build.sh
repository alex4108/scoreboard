#!/usr/bin/env bash

cd backend
docker build -t alex4108/scoreboard-backend .
docker push alex4108/scoreboard-backend
