const router = require("express").Router();
const sequelize = require("sequelize");
const { Message } = require("../db/message");
var sfx = require("sfx");

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
      messageBody = "Your cute little dog is in front of the camera";
    } else {
      sfx.play("airraid", 100);
      // sfx.say(
      //   "ATTENTION, ATTENTION, ATTENTION THERE IS A MOUSE IN THE APARTMENT",
      //   "random"
      // );
      messageBody = "Attention! There is a mouse in your apartment";
      client.messages
        .create({
          to: process.env.myPhoneNumber,
          from: "+19735878503",
          body: messageBody
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
