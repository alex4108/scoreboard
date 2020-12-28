const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Scoreboard = require("./scoreboard.model.js")(mongoose);
db.Player = require("./player.model.js")(mongoose);

module.exports = db;
