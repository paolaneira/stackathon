import React, { Component } from "react";
import axios from "axios";
import { loadMessages } from "../store";
import { connect } from "react-redux";
import moment from "moment";

export class Messages extends Component {
  componentDidMount() {
    this.props.loadMessages();
  }

  render() {
    const messages = this.props.messages;
    console.log("AT", messages);
    return (
      <div id="table" className="dataContainer">
        <div className="notifications">
          {" "}
          {messages.map(message => (
            <div
              key={message.id}
              className={message.mouse ? "notice error" : "notice info"}
            >
              {`${moment(message.createdAt).format("hh:mm")}`}
              {` ${message.message}`}{" "}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  messages: state.messages
});

const mapDispatchToProps = dispatch => ({
  loadMessages: () => dispatch(loadMessages())
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
