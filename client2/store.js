import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import socket from "./socket";

const initialState = {
  messages: []
};

//ACTIONS
export const GOT_MESSAGES = "GOT_MESSAGES";
export const GOT_NEW_MESSAGE_FROM_SERVER = "GOT NEW MESSAGE FROM SERVER";

//ACTION CREATORS

export const gotMessages = function(messages) {
  return {
    type: GOT_MESSAGES,
    messages
  };
};

// THUNK CREATORS

export const loadMessages = () => {
  return async dispatch => {
    const res = await axios.get("/api/messages");
    dispatch(gotMessages(res.data));
  };
};

export const gotNewMessageFromServer = message => ({
  type: GOT_NEW_MESSAGE_FROM_SERVER,
  message
});

//REDUCERS
export function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES:
      return {
        ...state,
        messages: action.messages
      };
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return { ...state, messages: [...state.messages, action.message] };
    default:
      return state;
  }
}

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
