#!/usr/bin/env bash

API_ENDPOINT='http://localhost:8080/api'

# Create a player
echo "Creating Player"
myPlayer=$(curl -s -X POST ${API_ENDPOINT}/player -H "Content-Type: application/json" -d '{"name": "Alex", "photoURL": "nowhere"}')
myPlayerId=$(echo ${myPlayer} | jq -r ".id")
echo ${myPlayer} | jq

# Create a game
echo "Creating Scoreboard"
myBoard=$(curl -s -X POST ${API_ENDPOINT}/scoreboard -H "Content-Type: application/json" -d '{"name": "Test Scoreboard", "description": "Just a test"}')
myBoardId=$(echo ${myBoard} | jq -r ".id")
echo ${myBoard} | jq

# Get all scoreboards
echo "Getting all scoreboards"
allBoards=$(curl -s -X GET ${API_ENDPOINT}/scoreboard -H "Content-Type: application/json")
echo ${allBoards} | jq

# Add a player to the game
echo "Adding player to board"
addPlayer=$(curl -s -X POST ${API_ENDPOINT}/scoreboard/${myBoardId}/players/${myPlayerId}/add -H "Content-Type: application/json")
echo ${addPlayer} | jq
myBoard=$(curl -s -X GET ${API_ENDPOINT}/scoreboard/${myBoardId} -H "Content-Type: application/json")
echo ${myBoard} | jq

echo "Doing it again"
addPlayer=$(curl -s -X POST ${API_ENDPOINT}/scoreboard/${myBoardId}/players/${myPlayerId}/add -H "Content-Type: application/json")
echo ${addPlayer} | jq
myBoard=$(curl -s -X GET ${API_ENDPOINT}/scoreboard/${myBoardId} -H "Content-Type: application/json")
echo ${myBoard} | jq

# Remove player from game
echo "Removing player to board"
remPlayer=$(curl -s -X POST ${API_ENDPOINT}/scoreboard/${myBoardId}/players/${myPlayerId}/remove -H "Content-Type: application/json")
echo ${remPlayer} | jq
myBoard=$(curl -s -X GET ${API_ENDPOINT}/scoreboard/${myBoardId} -H "Content-Type: application/json")
echo ${myBoard} | jq

echo "Doing it again"
remPlayer=$(curl -s -X POST ${API_ENDPOINT}/scoreboard/${myBoardId}/players/${myPlayerId}/remove -H "Content-Type: application/json")
echo ${remPlayer} | jq
myBoard=$(curl -s -X GET ${API_ENDPOINT}/scoreboard/${myBoardId} -H "Content-Type: application/json")
echo ${myBoard} | jq

# Add a player
echo "Adding player to board"
addPlayer=$(curl -s -X POST ${API_ENDPOINT}/scoreboard/${myBoardId}/players/${myPlayerId}/add -H "Content-Type: application/json")
echo ${addPlayer} | jq
myBoard=$(curl -s -X GET ${API_ENDPOINT}/scoreboard/${myBoardId} -H "Content-Type: application/json")
echo ${myBoard} | jq

# Start the game
echo "Starting game"
startGame=$(curl -s -X POST ${API_ENDPOINT}/scoreboard/${myBoardId}/start -H "Content-Type: application/json")
echo ${startGame} | jq
myBoard=$(curl -s -X GET ${API_ENDPOINT}/scoreboard/${myBoardId} -H "Content-Type: application/json")
echo ${myBoard} | jq

# Increment player score
echo "Updating score"
updateScore=$(curl -s -X POST ${API_ENDPOINT}/scoreboard/${myBoardId}/players/${myPlayerId}/score -H "Content-Type: application/json" -d '{"score": 10}')
echo ${updateScore}
myBoard=$(curl -s -X GET ${API_ENDPOINT}/scoreboard/${myBoardId} -H "Content-Type: application/json")
echo ${myBoard} | jq


# End game
echo "Ending game"
endGame=$(curl -s -X POST ${API_ENDPOINT}/scoreboard/${myBoardId}/end -H "Content-Type: application/json")
echo ${endGame} | jq
myBoard=$(curl -s -X GET ${API_ENDPOINT}/scoreboard/${myBoardId} -H "Content-Type: application/json")
echo ${myBoard} | jq
