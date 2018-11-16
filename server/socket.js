const message = "Attention! There is a mouse in your apartment";

module.exports = io => {
  io.on("connection", socket => {
    console.log(socket.id, " has made a persistent connection to the server!");

    var interval = setInterval(function() {
      socket.emit("new-message", message);
      console.log("sending message x2");
    }, 2000);
  });
};
