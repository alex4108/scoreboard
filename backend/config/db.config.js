
const mongoHost = process.env.mongoHost || "localhost";
const mongoPort = process.env.mongoPort || 27017;

module.exports = {
    url: "mongodb://" + mongoHost + ":" + mongoPort + "/scoreboard"
};