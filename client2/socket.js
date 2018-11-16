import io from "socket.io-client";
import store, { gotNewMessageFromServer, loadMessages } from "./store";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("I am now connected to the server!");
  socket.on("new-message", message => {
    console.log("loading messages");
    store.dispatch(loadMessages());
  });
});

export default socket;
