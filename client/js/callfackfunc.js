import axios from "axios";

async function callbackfunc(state) {
  console.log("HERE", state);
  await axios.post(
    "/Users/paolaneira/Documents/Coding/Senior-Phase/Cat/Scratch/Cat-FeederV2/server/api/messages.js",
    state
  );
}
