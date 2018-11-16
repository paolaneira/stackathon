import React, { Component } from "react";
import { Route } from "react-router-dom";
import Messages from "./Messages";
import Header from "./Header";
import Time from "./Clock";
import MouseTracker from "./MouseTracker";

export default class App extends Component {
  render() {
    return (
      <div>
        <MouseTracker
          className="mouseTracker"
          render={({ x, y }) => (
            <img
              src="http://pngimg.com/uploads/cat/cat_PNG132.png"
              width="100"
              style={{ position: "absolute", top: y, left: x }}
            />
          )}
        />
        <Header />
        <div id="header">
          <h1>The Cat-Feeder Dashboard</h1>
          <p>
            {`Welcome to the first Machine Learning algorithm to keep your apartment clean from pests.`}
          </p>
        </div>
        <h2>Live Updates</h2> <Time />
        <Route exact path="/messages" component={Messages} />
        {/* <Route path='/todos/:todoId' component={SingleTodo} /> */}
      </div>
    );
  }
}
