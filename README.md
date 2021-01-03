# Scoreboard

[![GitHub issues](https://img.shields.io/github/issues/alex4108/scoreboard)](https://github.com/alex4108/scoreboard/issues)
[![GitHub forks](https://img.shields.io/github/forks/alex4108/scoreboard)](https://github.com/alex4108/scoreboard/network)
[![GitHub stars](https://img.shields.io/github/stars/alex4108/scoreboard)](https://github.com/alex4108/scoreboard/stargazers)
![GitHub contributors](https://img.shields.io/github/contributors/alex4108/scoreboard)
[![GitHub license](https://img.shields.io/github/license/alex4108/scoreboard)](https://github.com/alex4108/scoreboard/blob/master/LICENSE)
![GitHub All Releases](https://img.shields.io/github/downloads/alex4108/scoreboard/total)
![Docker Pulls](https://img.shields.io/docker/pulls/alex4108/scoreboard-backend)
[![Build Status](https://travis-ci.com/alex4108/scoreboard.svg?branch=main)](https://travis-ci.com/alex4108/scoreboard)


This is a super simple "Scoreboard" app that lets us keep track of players and their scores while we're playing a game.  It persists player information between games and persists match history.  

# Demo

[YouTube Video](https://www.youtube.com/watch?v=L2Wkm76MCLY)

# Environment Notes

## Development

* Backend: Node 14 / Express (`cd backend && node server.js`)
* Frontend: Node 14 / React 17 (`cd frontend && yarn start`)
* MongoDB 4.4 (`docker run --name mongodb-scoreboard -p 27017:27017 mongo`)

#### First time setup

1. Ensure you have Node 14 installed.  I recommend [using nvm](https://github.com/nvm-sh/nvm#install--update-script) if you don't already.
1. Ensure you have yarn package manager installed.  [Instructions here](https://classic.yarnpkg.com/en/docs/install).
1. Install node_modules: `cd backend && npm install && cd ../frontend && yarn install`

You can seed a test database with some sample data by running `bash backend/tests.sh`

## Production

* Docker
* docker-compose
* Supports docker engines for `linux/amd64` and `linux/arm/v7` architectures.  You can see my [notes](https://github.com/alex4108/scoreboard/issues/1) and [frontend/build.sh](https://github.com/alex4108/scoreboard/blob/main/frontend/build.sh) or [backend/build.sh](https://github.com/alex4108/scoreboard/blob/main/backend/build.sh) for how I set this up using [Travis-CI](https://travis-ci.com)

`docker-compose up -d`

#### linux/arm/v7 & mongodb do not agree

Currently, MongoDB's container on [dockerhub](https://hub.docker.com/_/mongo) doesn't support `linux/arm/v7` architecture.  You can work around this by using [MongoDB Atlas]() free tier to run an online MongoDB cluster.  **Be sure to set up Network Security rules that secure your cluster!**

From a high level, you'll need to modify your `docker-compose.yml` to:
* Do not run a mongodb container
* Modify the mongodb connection string to point to your cluster on Atlas

I use this method for running my production environment on my RaspberryPi 2.  Feel free to raise an issue if you want help or direction configuring this environment.

## Environment Variables

The Express backend takes a couple of environment variables

#### Optional Environment Variables

* `corsOrigin`: The intended CORS origin for your backend.  Defaults to `http://localhost:3000`.  
* `mongoConnectionString`: The MongoDB connection string.  Defaults to `mongodb://localhost:27017/scoreboard`.  

# API Usage

## Players API Usage

### Create a player profile

```
curl -X POST http://localhost:8080/api/player -H "Content-Type: application/json" -d '{"name": "Alex", "photoURL": "nowhere"}'
```

### Get all profiles

```
curl -X GET http://localhost:8080/api/player -H "Content-Type: application/json"
```

### Get single profile

```
curl -X GET http://localhost:8080/api/player/{id} -H "Content-Type: application/json"
```


## Scoreboards API Usage

### Create a new Scoreboard
```
 curl -X POST http://localhost:8080/api/scoreboard -d '{"name": "Test", "description": "testy"}' -H "Content-Type: application/json"
```

### Get all scoreboard details
```
 curl -X GET http://localhost:8080/api/scoreboard -H "Content-Type: application/json"
```

### Get single scoreboard details
```
 curl -X GET http://localhost:8080/api/scoreboard/{id} -H "Content-Type: application/json"
```

### Start a game
```
 curl -X POST http://localhost:8080/api/scoreboard/{id}/start -H "Content-Type: application/json"
```

### End a game
```
 curl -X POST http://localhost:8080/api/scoreboard/{id}/end -H "Content-Type: application/json"
```

### Add player to game
```
 curl -X POST http://localhost:8080/api/scoreboard/{id}/players/{player_id}/add
```

### Remove player from game
```
 curl -X POST http://localhost:8080/api/scoreboard/{id}/players/{player_id}/add
```

### Get points for a player
```
  curl -X GET http://localhost:8080/api/scoreboard/{id}/players/{player_id}/score -H "Content-Type: application/json"
```

### Modify points of a player
```
 curl -X POST http://localhost:8080/api/scoreboard/{id}/players/{player_id}/score \
 -d '{"score": 10} \ 
 -H "Content-Type: application/json"
```

# Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
