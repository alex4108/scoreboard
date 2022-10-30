# Scoreboard

[![GitHub issues](https://img.shields.io/github/issues/alex4108/scoreboard)](https://github.com/alex4108/scoreboard/issues)
[![GitHub forks](https://img.shields.io/github/forks/alex4108/scoreboard)](https://github.com/alex4108/scoreboard/network)
[![GitHub stars](https://img.shields.io/github/stars/alex4108/scoreboard)](https://github.com/alex4108/scoreboard/stargazers)
![GitHub contributors](https://img.shields.io/github/contributors/alex4108/scoreboard)
[![GitHub license](https://img.shields.io/github/license/alex4108/scoreboard)](https://github.com/alex4108/scoreboard/blob/master/LICENSE)
![Docker Pulls](https://img.shields.io/docker/pulls/alex4108/scoreboard-backend)
[![Build Status](https://travis-ci.com/alex4108/scoreboard.svg?branch=main)](https://travis-ci.com/alex4108/scoreboard)


This is a super simple "Scoreboard" app that lets us keep track of players and their scores while we're playing a game.  It persists player information between games and persists match history.  

# Demo

[YouTube Video](https://www.youtube.com/watch?v=L2Wkm76MCLY)

# Environment Notes

## Development

* Backend: Node 14 / Express (`cd backend && node server.js`) / Starts on http://localhost:8080/api/
* Frontend: Node 14 / React 17 (`cd frontend && yarn start`) / Starts on http://localhost:3000/
* MongoDB 4.4 (`docker run --name mongodb-scoreboard -p 27017:27017 mongo`)

When starting the frontend from `yarn`, the environment variable `NODE_ENV` is set to `development`.  When this is set, the frontend will expect the API to be exposed on port 8080.  In production, `NODE_ENV=production`, so 8080 is not expected, as an nginx reverse proxy configuration is used to serve requests to the API over the web server's port (80 or 443).

### First time setup

1. Ensure you have Node 14 installed.  I recommend [using nvm](https://github.com/nvm-sh/nvm#install--update-script) if you don't already.
1. Ensure you have yarn package manager installed.  [Instructions here](https://classic.yarnpkg.com/en/docs/install).
1. Install node_modules: `cd backend && npm install && cd ../frontend && yarn install`

You can seed a test database with some sample data by running `bash backend/tests.sh`

### Development (TLS)

1. Place your Certificate at `./certs/sslCert.pem`
1. Place your Key file at `./certs/sslKey.pem`
1. Start the backend with dev and tls flags: `dev=1 tls=1 node server.js`
1. Start the frontend in dev mode: `HTTPS=true yarn start`

The server will indicate it is started with HTTPS enabled: `HTTPS Server running on port ${PORT}`
Yarn will start a development server on [https://localhost:3000](https://localhost:3000)

## Production

* Docker
* docker-compose
* Supports docker engines for `linux/amd64` and `linux/arm/v7` architectures.  You can see my [notes](https://github.com/alex4108/scoreboard/issues/1) and [frontend/build.sh](https://github.com/alex4108/scoreboard/blob/main/frontend/build.sh) or [backend/build.sh](https://github.com/alex4108/scoreboard/blob/main/backend/build.sh) for how I set this up using [Travis-CI](https://travis-ci.com)

By default, the container uses the configuration from `frontend/nginx/`.  The application will require port 80 to be available, however this can be modified in the docker-compose file to meet your needs.

`bash run-production.sh` (requires root or member of "docker" group)

### Production (TLS)

When using TLS, the `frontend/nginx-ssl/` configuration file is used in place of nginx's default.  Additionally, port 443 will be used to serve HTTPS, and 80 will be configured to redirect to HTTPS.

1. Place your Certificate at `./certs/sslCert.pem`
1. Place your Key file at `./certs/sslKey.pem`
1. Start the docker-compose-ssl.yml file: `bash run-production-tls.sh`

### Production (Kubernetes)

First deploy a secret containing your mongodb connection string like such...

```
`kubectl create secret generic 
mongodb
--from-literal=connection_string="mongodb+srv://...." 
```

Then run a couple sed's on the kube-manifest.yml before applying the manifest.

```

export GIT_SHA=$(git rev-parse HEAD)
sed -i 's/GIT_SHA/${GIT_SHA}/g' kube-manifest.yml

# If you deploy in a different namespace
sed -i 's/default/YOUR_NAMESPACE/g' kube-manifest.yml

#### In-cluster MongoDB

Todo... Eventually

#### Remote MongoDB

In my production deployment I use [MongoDB Atlas](https://atlas.mongodb.com) to host my MongoDB cluster.  You can use the `remote-mongo.yml` file in `kubernetes/` to deploy the application to a kubernetes cluster.  

Make sure to fill in the MongoDB connection string in the template prior to deploying.

#### linux/arm/v7 & mongodb do not agree

Currently, MongoDB's container on [dockerhub](https://hub.docker.com/_/mongo) doesn't support `linux/arm/v7` architecture.  You can work around this by using [MongoDB Atlas](https://atlas.mongodb.com) free tier to run an online MongoDB cluster.  **Be sure to set up Network Security rules that secure your cluster!**

From a high level, you'll need to modify your `docker-compose.yml` to:
* Do not run a mongodb container
* Modify the mongodb connection string to point to your cluster on Atlas

I use this method for running my production environment on my RaspberryPi 2.  Feel free to raise an issue if you want help or direction configuring this environment.

# Frontend Environment Variables

* `NODE_ENV`: Set automatically.  [See here](https://create-react-app.dev/docs/adding-custom-environment-variables/)
* `BACKEND_HOST`: Defaults to scoreboard-backend.default.svc.cluster.local.  If you're running in an alternate kubernetes namespace, ensure this value is updated in the template before deployment.
* `BACKEND_PORT`: The port the backend API is hosted at.  Defaults to 8080.

#### Optional Environment Variables

* `apiEndpoint`: By default, the frontend assumes the api endpoint to be available on the same host in the /api path of the same server serving the frontend.  This endpoint overrides it, however `/api` is included automatically.
* `dev`: If apiEndpoint is not set, and this flag is, the frontend will use port 8080 to communicate with the backend.

# Backend Environment Variables

The Express backend takes a couple of environment variables

#### Optional Environment Variables

* `corsOrigin`: The intended CORS origin for your backend.  Defaults to `http://localhost:3000`.  
* `mongoConnectionString`: The MongoDB connection string.  Defaults to `mongodb://localhost:27017/scoreboard`.  
* `tls` : If set, the server will start with HTTPS forced.
* `dev` : If set, the server will use development paths when loading the certificate and key used for HTTPS.

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
