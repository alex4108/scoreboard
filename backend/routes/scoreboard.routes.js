module.exports = app => {
    const scoreboards = require("../controllers/scoreboard.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Scoreboard
    router.post("/", scoreboards.create);
  
    // Retrieve all Scoreboards
    router.get("/", scoreboards.findAll);

    // Start a game
    router.get("/:id/start", scoreboards.start);
    
    // End a game
    router.get("/:id/end", scoreboards.end);
    
    // Retrieve a single Scoreboard with id
    router.get("/:id", scoreboards.findOne);
  
    // Add a player to the Scoreboard
    router.post("/:sid/players/:pid/add", scoreboards.addPlayer);
  
    // Remove a player from the Scoreboard
    router.post("/:sid/players/:pid/remove", scoreboards.remPlayer);
  
    // Remove a player from the Scoreboard
    router.post("/:sid/players/:pid/score", scoreboards.updatePlayerScore);
  


    // Update a Tutorial with id
    // router.put("/:id", scoreboards.update);
  
    app.use('/api/scoreboard', router);
  };