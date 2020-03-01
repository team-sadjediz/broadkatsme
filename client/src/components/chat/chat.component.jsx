import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

// mui components:
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// custom style sheet:
import "./chat.styles.scss";

let socket;

const Chat = ({ currentUser, selectedRoom }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    console.log("UE 1");
    socket = io(ENDPOINT);
    console.log(
      `[Socket: ${socket.id}] [UserID: ${currentUser.uid}] [RoomID: ${selectedRoom}] ${socket}`
    );
    console.log("socket from client", socket);

    socket.emit(
      "join",
      { name: currentUser.uid, room: selectedRoom },
      error => {
        console.log("joined");
        if (error) {
          console.log(error);
        }
      }
    );

    console.log(
      `[Socket: ${socket.id}] [UserID: ${currentUser.uid}] [RoomID: ${selectedRoom}]`
    );

    socket.on("message", message => {
      // console.log("from useEffect", message);
      setMessages([...messages, message]);
    });

    return () => {
      setMessages([]);
      console.log("dismount");
      console.log("predismounted socket id:", socket.id);

      socket.disconnect();
      console.log("dismounted socket id:", socket.id);
    };
    // }, [ENDPOINT, currentUser.uid, selectedRoom]);
  }, [ENDPOINT, selectedRoom]);

  // second use effect not working as intended:
  // useEffect(() => {
  //   console.log("UE 2");
  //   socket.on("message", message => {
  //     // console.log("from useEffect", message);
  //     setMessages([...messages, message]);
  //   });
  // }, [messages]);

  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      return sendMessage(event);
    }
  };

  console.log("MSG", message);
  console.log("MESSAGES:", messages);
  return (
    <div className="chat-container">
      {selectedRoom ? (
        <React.Fragment>
          <div className="chat-header-container">{selectedRoom}</div>
          <div className="message-list-container"></div>
        </React.Fragment>
      ) : (
        "please pick a room first"
      )}

      {/* <input
        value={message}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      /> */}
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  selectedRoom: state.room.selectedRoom
});

export default connect(mapStateToProps)(Chat);
