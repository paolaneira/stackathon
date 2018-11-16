// import axios from axios

const router = require("express").Router();
const sequelize = require("sequelize");
const { Interim } = require("../db/message");
const axios = require("axios");
let counter = 9;
let counterDog = 9;
var sfx = require("sfx");

router.get("/", async (req, res, next) => {
  try {
    const allInterims = await Interim.findAll();
    res.json(allInterims);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  console.log("COUNTER", counter);
  if (counter < 10) {
    res.sendStatus(200);
    return (counter = counter + 1);
  } else {
    await axios.post("http://localhost:1338/api/messages", {
      mouse: true
    });
    res.sendStatus(200);
    return (counter = 0);
  }
});

router.post("/dog", async (req, res, next) => {
  console.log("COUNTER", counterDog);
  if (counterDog < 10) {
    res.sendStatus(200);
    return (counterDog = counterDog + 1);
  } else {
    await axios.post("http://localhost:1338/api/messages", {
      mouse: false
    });
    res.sendStatus(200);
    return (counterDog = 0);
  }
});

module.exports = router;
