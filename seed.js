const { db, Message, Interim } = require("./server/db/message");
const Sequelize = require("sequelize");

const { green, red } = require("chalk");

const seed = async () => {
  await db.sync({ force: true });

  //Messages

  const connection = await Message.create({
    to: "+19179325623",
    from: "+19735878503",
    message: "Connection has been established!",
    mouse: false
  });

  // const noMouse = await Message.create({
  //   to: "+19179325623",
  //   from: "+19735878503",
  //   body: "There is NO mouse in your apartment, rest assure :)",
  //   mouse: false
  // });

  const message = [connection];

  const interim1 = await Interim.create({
    counter: 1,
    mouse: false
  });

  console.log(green("Seeding success!"));
  db.close();
};

seed().catch(err => {
  console.error(red("Oh no! Something went wrong!"));
  console.error(err);
  db.close();
});
