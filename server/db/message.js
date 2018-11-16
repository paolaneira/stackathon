const Sequelize = require("sequelize");
const db = require("./database");

const Message = db.define("message", {
  to: {
    type: Sequelize.STRING,
    defaultValue: "+19179325623"
  },
  from: {
    type: Sequelize.STRING,
    defaultValue: "+19735878503"
  },
  message: {
    type: Sequelize.STRING,
    defaultValue: "There is a mouse in your apartment!"
  },
  mouse: {
    type: Sequelize.BOOLEAN
  }
});

const Interim = db.define("interim", {
  counter: {
    type: Sequelize.INTEGER
  },
  mouse: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = { db, Message, Interim };
