const secrets = require("../secrets");

const accountSid = process.env.accountSid;
const authToken = process.env.authToken;

const client = require("twilio")(accountSid, authToken);

const sendMessage = client.messages
  .create({
    to: process.env.myPhoneNumber,
    from: "+19735878503",
    body: "There is a mouse in your apartment!"
  })
  .then(message => console.log(message.body));

module.exports = sendMessage;
