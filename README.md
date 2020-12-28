# Scoreboard

[![GitHub issues](https://img.shields.io/github/issues/alex4108/scoreboard)](https://github.com/alex4108/scoreboard/issues)
[![GitHub forks](https://img.shields.io/github/forks/alex4108/scoreboard)](https://github.com/alex4108/scoreboard/network)
[![GitHub stars](https://img.shields.io/github/stars/alex4108/scoreboard)](https://github.com/alex4108/scoreboard/stargazers)
![GitHub contributors](https://img.shields.io/github/contributors/alex4108/scoreboard)
[![GitHub license](https://img.shields.io/github/license/alex4108/scoreboard)](https://github.com/alex4108/scoreboard/blob/master/LICENSE)
![GitHub All Releases](https://img.shields.io/github/downloads/alex4108/scoreboard/total)
![Docker Pulls](https://img.shields.io/docker/pulls/alex4108/scoreboard-backend)

This will be a MERN stack application to track the score during a board game.

This project is still in progress!  Currently the API functionality seems good.  I need to write the frontend component to finish this up.

# Dev environemnt

* Node 14
* React frontend (TODO)
* MongoDB 4.4 (`docker run --name mongodb-scoreboard -p 27017:27017 mongo`)

# Production environment

* Docker
* Docker-compose
* x86 based host

`docker-compose up -d`

# Players API Usage

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


# Scoreboards API Usage

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
