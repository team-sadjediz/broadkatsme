import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

// mui components:
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// components:
import Message from "../message/message.component";

// custom style sheet:
import "./chat.styles.scss";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

let socket;
const ENDPOINT = "localhost:5000";

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      messages: []
    };
  }

  componentDidMount() {
    console.log("---------------------------------------------------------");
    console.log("MOUNT", this.state.messages);
    socket = io(ENDPOINT);
    // console.log(
    //   `[Socket: ${socket.id}] [UserID: ${currentUser.uid}] [RoomID: ${selectedRoom}] ${socket}`
    // );
    // setMessages([{ id: "root", name: currentUser.uid, room: selectedRoom }]);

    socket.emit(
      "join",
      { name: this.props.currentUser.uid, room: this.props.selectedRoom },
      error => {
        console.log("someone joined");
        if (error) {
          console.log("ERROR", error);
        }
      }
    );
  }

  componentWillUnmount() {
    socket.disconnect();
    console.log("DISMOUNT", this.state.messages);
    console.log("**************************************************");
  }

  componentWillUpdate() {
    console.log("componentWillUpdate");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("should we update");
    console.log(nextProps, nextState);

    if (
      nextProps.currentUser === this.props.currentUser &&
      nextProps.selectedRoom === this.props.selectedRoom
    ) {
      return false;
    }

    return true;
  }

  componentDidUpdate() {
    console.log("UPDATE MSGS:", this.state.messages);
    socket.on("message", message => {
      // console.log("from useEffect", message);
      // setMessages([...messages, message]);
      let o = { messages: [...message, message] };
      console.log("o", o);
      this.setState(o);
    });
  }

  sendMessage = event => {
    event.preventDefault();
    if (this.state.message) {
      socket.emit("sendMessage", this.state.message, () => {
        // setMessage("");
        this.setState({ message: "" });
      });
    }
  };

  handleChange = event => {
    console.log("handleChange");
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  handleKeyPress = event => {
    console.log("handleKeyPress");

    if (event.key === "Enter") {
      return this.sendMessage(event);
    }
  };

  render() {
    return (
      <div className="chat-container">
        {this.props.selectedRoom ? (
          <React.Fragment>
            <div className="chat-header-container">
              {this.props.selectedRoom}
            </div>
            <div className="message-list-container">
              {/* <ScrollToBottom> */}
              {this.state.messages.map(msg => {
                // console.log("from map", msg);
                return <Message message={msg.text} sender={msg.user}></Message>;
              })}
              {/* </ScrollToBottom> */}
            </div>
            <input
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
            />

            {/* <TextField
              id="filled-multiline-flexible"
              label="Chat Message"
              multiline
              rowsMax="4"
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              variant="filled"
            /> */}
          </React.Fragment>
        ) : (
          "please pick a room first"
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  selectedRoom: state.room.selectedRoom
});

export default connect(mapStateToProps)(Chat);
