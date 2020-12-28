module.exports = app => {
    const Player = require("../controllers/player.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Player
    router.post("/", Player.create);
  
    // Retrieve all Players
    router.get("/", Player.findAll);
    
    // Retrieve a single Player with id
    router.get("/:id", Player.findOne);
  
    // Update a Tutorial with id
    // router.put("/:id", Players.update);
  
    app.use('/api/player', router);
  };