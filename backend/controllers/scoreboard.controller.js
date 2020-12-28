const db = require("../models");
const Scoreboard = db.Scoreboard;

// Create and Save a new Scoreboard
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Scoreboard
  const scoreboard = new Scoreboard({
    name: req.body.name,
    description: req.body.description,
    started_at: 0,
    ended_at: 0,
    players: req.body.players
  });

  // Save Scoreboard in the database
  scoreboard
    .save(scoreboard)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Scoreboard."
      });
    });
};


// Retrieve all Scoreboards from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Scoreboard.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving scoreboards."
        });
      });
  };

// Find a single Scoreboard with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Scoreboard.findById(id)
        .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Scoreboard with id " + id });
        else res.send(data);
        })
        .catch(err => {
        res
            .status(500)
            .send({ message: "Error retrieving Scoreboard with id=" + id });
        });
};

/*
// Update a Scoreboard by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Scoreboard with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Scoreboard from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Scoreboard
exports.findAllPublished = (req, res) => {
  
};

*/

exports.start = (req, res) => { 
    const id = req.params.id;
    const body = { 
        started_at: new Date().toISOString()
    }
    console.log("Staring game - " + id)
    Scoreboard.findByIdAndUpdate(id, body, { useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                  message: `Cannot update Scoreboard with id=${id}. Maybe Scoreboard was not found!`
                });
              } else {
                  var msg = "Game Started!"
                  console.log(msg)
                  res.status(200).send({ message: msg });
              } 
        })
        .catch(err => {
            res.status(500).send({
              message: "Error updating Scoreboard with id=" + id
            });
        });
};

exports.end = (req, res) => { 
    const id = req.params.id;
    const body = { 
        ended_at: new Date().toISOString()
    }
    console.log("Closing game - " + id)
    Scoreboard.findByIdAndUpdate(id, body, { useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                  message: `Cannot update Scoreboard with id=${id}. Maybe Scoreboard was not found!`
                });
              } else {
                  var msg = "Game closed!"
                  console.log(msg)
                  res.status(200).send({ message: msg });
              }
        })
        .catch(err => {
            res.status(500).send({
              message: "Error updating Scoreboard with id=" + id
            });
        });
};

exports.addPlayer = (req, res) => {
    const sid = req.params.sid;
    const pid = req.params.pid;
    
    console.log("Trying to add " + pid + " player to " + sid + " scoreboard")

    Scoreboard.findById(sid)
        .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Scoreboard with id " + id });
        else {
            const players = data.players
            var updateList = true
            players.forEach( playerEntry => { 
                if (playerEntry.player_id == pid) { 
                    console.log("Failed")
                    updateList = false
                    res.status(400)
                    res.send({ message: "Player already exists in Scoreboard."})
                }
            })

            if (updateList) { 
                playerEntry = { 
                    player_id: pid,
                    score: 0
                }
                players.push(playerEntry)
                const body = { 
                    players: players
                }
                Scoreboard.findByIdAndUpdate(sid, body, { useFindAndModify: false})
                .then(data => {
                    if (!data) {
                        res.status(404).send({
                        message: `Cannot update Scoreboard with id=${sid}. Maybe Scoreboard was not found!`
                        });
                    } else { 
                        console.log("Success")
                        res.status(200).send({ message: "Added player!" })
                    }
                })
                .catch(err => {
                    res.status(500).send({
                    message: "Error updating Scoreboard with id=" + sid
                    });
                });
            }
        }
        })
        .catch(err => {
        res
            .status(500)
            .send({ message: "Error retrieving Scoreboard with id=" + id });
        });
};

exports.remPlayer = (req, res) => {
    const sid = req.params.sid;
    const pid = req.params.pid;
    
    console.log("Trying to remove " + pid + " player to " + sid + " scoreboard")

    Scoreboard.findById(sid)
        .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Scoreboard with id " + sid });
        else {
            var players = data.players
            var playerRemoved = false
            players.forEach( (playerEntry, index, array) => { 
                if (playerEntry.player_id == pid) { 
                    playerRemoved = true
                    var newPlayerList = players.filter( x => x.player_id != pid);
                    const body = { 
                        players: newPlayerList
                    }
                    Scoreboard.findByIdAndUpdate(sid, body, { useFindAndModify: false})
                    .then(data => {
                        if (!data) {
                            res.status(404).send({
                            message: `Cannot update Scoreboard with id=${sid}. Maybe Scoreboard was not found!`
                            });
                        } else {
                            var msg = "Removed player!"
                            console.log(msg)
                            res.status(200)
                            res.send({ message: msg });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).send({ message: "Error updating Scoreboard with id=" + sid });
                    });
                }
            })
            if (!playerRemoved) {
                var msg = "Player does not exist in Scoreboard."
                console.log(msg)
                res.status(400).send({ message: msg })
            }
        }
        })
        .catch(err => {
        res
            .status(500)
            .send({ message: "Error retrieving Scoreboard with id=" + sid });
        });
};

exports.updatePlayerScore = (req, res) => {
    const sid = req.params.sid;
    const pid = req.params.pid;
    const newScore = req.body.score;

    console.log("Trying to update player score " + pid + " :: " + newScore + " in " + sid + " scoreboard")
    
    Scoreboard.findById(sid)
    .then(data => {
    if (!data)
        res.status(404).send({ message: "Not found Scoreboard with id " + sid });
    else {
        var players = data.players
        var scoreUpdated = false
        players.forEach( (playerEntry, index, array) => { 
            if (playerEntry.player_id == pid) { 
                scoreUpdated = true
                // Update the score on this entry
                
                var newPlayerList = players.filter( x => x.player_id != pid);
                const newPlayerEntry = { 
                    player_id: pid,
                    score: newScore
                }
                newPlayerList.push(newPlayerEntry)

                const body = { 
                    players: newPlayerList
                }
                Scoreboard.findByIdAndUpdate(sid, body, { useFindAndModify: false})
                .then(data => {
                    if (!data) {
                        res.status(404).send({
                        message: `Cannot update Scoreboard with id=${sid}. Maybe Scoreboard was not found!`
                        });
                    } else {
                        var msg = "Updated score!"
                        console.log(msg)
                        res.status(200)
                        res.send({ message: msg });
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).send({ message: "Error updating Scoreboard with id=" + sid });
                });
            }
        })
        if (!scoreUpdated) {
            var msg = "Player does not exist in Scoreboard."
            console.log(msg)
            res.status(400).send({ message: msg })
        }
    }
    })
    .catch(err => {
    res
        .status(500)
        .send({ message: "Error retrieving Scoreboard with id=" + sid });
    });
};