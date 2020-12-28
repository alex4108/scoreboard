const db = require("../models");
const Player = db.Player;

// Create and Save a new Player
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Player
  const player = new Player({
    name: req.body.name,
    photoURL: req.body.photoURL
  });

  // Save Player in the database
  player
    .save(player)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Player."
      });
    });
};


// Retrieve all Players from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Player.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Players."
        });
      });
  };

// Find a single Player with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Player.findById(id)
        .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Player with id " + id });
        else res.send(data);
        })
        .catch(err => {
        res
            .status(500)
            .send({ message: "Error retrieving Player with id=" + id });
        });
};

/*
// Update a Player by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Player with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Player from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Player
exports.findAllPublished = (req, res) => {
  
};

*/