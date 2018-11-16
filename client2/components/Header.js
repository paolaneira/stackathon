import React, { Component } from "react";
import { Route } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div id="header">
        <nav id="nav">
          <ul>
            <li>Paola Neira</li>
            <li>2018</li>
          </ul>
        </nav>
      </div>
    );
  }
}
