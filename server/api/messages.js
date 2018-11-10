const router = require("express").Router();
const sequelize = require("sequelize");
const { Message } = require("../db/message");
var sfx = require("sfx");

// const sendMessage = require("./sendMessage");

const secrets = require("../secrets");

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

const client = require("twilio")(accountSid, authToken);

router.get("/", async (req, res, next) => {
  try {
    const allMessages = await Message.findAll();
    res.json(allMessages);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  {
    if (req.body.mouse !== true) {
      messageBody = "There is no mouse in your apartment";
    } else {
      messageBody = "Attention! There is a mouse in your apartment";
      sfx.say(
        "ATTENTION, ATTENTION, ATTENTION THERE IS A MOUSE IN THE APARTMENT",
        "random"
      );

      client.messages
        .create({
          to: process.env.myPhoneNumber,
          from: "+19735878503",
          body: "There is a mouse in your apartment!"
        })
        .then(message => console.log(message.body));
    }
  }

  try {
    const message = await Message.create({
      mouse: req.body.mouse,
      message: messageBody
    });
    res.json(message);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
