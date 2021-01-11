const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const tls_enabled = ((process.env.tls) ? true : false) || false;
const tlsCertPath = ((!process.env.dev) ? "/app/certs/sslCert.pem" : "../certs/sslCert.pem");
const tlsKeyPath = ((!process.env.dev) ? "/app/certs/sslKey.pem" : "../certs/sslKey.pem");
const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: process.env.corsOrigin || "http://localhost:3000"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (tls_enabled) { 
  const https = require('https');
  const fs = require('fs');
  const httpsServer = https.createServer({
    key: fs.readFileSync(tlsKeyPath),
    cert: fs.readFileSync(tlsCertPath),
  }, app);
  
  httpsServer.listen(PORT, () => {
      console.log(`HTTPS Server running on port ${PORT}`);
  });
} else {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
  
}

app.get("/", (req, res) => {
  res.json({ message: "ScoreBoard API" });
});

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


require("./routes/scoreboard.routes")(app);
require("./routes/player.routes")(app);
