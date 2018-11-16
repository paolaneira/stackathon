const express = require("express");
const app = express();
const path = require("path");

const { db, Message } = require("./db");

db.authenticate().then(() => {
  console.log("connected to the database");
});

const morgan = require("morgan"); //STEP 2
app.use(morgan("dev"));

const bodyParser = require("body-parser"); //STEP 4
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", require("./api"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client2/index.html"));
});

app.use(
  (req, res, next) =>
    path.extname(req.path).length > 0
      ? res.status(404).send("Not found")
      : next()
);

app.use((err, req, res, next) => {
  // STEP 8
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app; //STEP 9
