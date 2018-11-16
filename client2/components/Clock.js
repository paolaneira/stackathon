import React from "react";
import Clock from "react-live-clock";

export default class Time extends React.Component {
  render() {
    return (
      <Clock
        id={"clock"}
        format={"HH:mm"}
        ticking={true}
        timezone={"US/Eastern"}
      />
    );
  }
}
