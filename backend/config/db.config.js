
const mongoConnectionString = process.env.mongoConnectionString || "mongodb://localhost:27017/scoreboard";

module.exports = {
    url: mongoConnectionString
};