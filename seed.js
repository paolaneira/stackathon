const { db, Message } = require("./server/db/message");
const Sequelize = require("sequelize");

const { green, red } = require("chalk");

const seed = async () => {
  await db.sync({ force: true });

  //Messages

  const mouse = await Message.create({
    to: "+19179325623",
    from: "+19735878503",
    body: "There is a mouse in your apartment!",
    mouse: true
  });

  const noMouse = await Message.create({
    to: "+19179325623",
    from: "+19735878503",
    body: "There is NO mouse in your apartment, rest assure :)",
    mouse: false
  });

  const message = [mouse, noMouse];

  console.log(green("Seeding success!"));
  db.close();
};

seed().catch(err => {
  console.error(red("Oh no! Something went wrong!"));
  console.error(err);
  db.close();
});
