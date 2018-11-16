"use strict";

const { db } = require("./server/db");
const app = require("./server");
const PORT = 1338;
const socketio = require("socket.io");

const server = app.listen(PORT, () =>
  console.log(`Mixing it up on port ${PORT}`)
);

// set up our socket control center
const io = socketio(server);
require("./server/socket")(io);
