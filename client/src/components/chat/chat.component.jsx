import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import io from "socket.io-client";

import "./chat.styles.scss";
const roomId = "123";
let socket;

const Chat = ({ currentUser, selectedRoom }) => {
  // console.log("uid", currentUser.uid);
  // console.log("roomid", selectedRoom);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log("socket from client", socket);

    socket.emit("join", { name: currentUser.uid, room: roomId }, () => {
      console.log("joined");
    });

    return () => {
      socket.disconnect();
    };
  }, [ENDPOINT, currentUser.uid, roomId]);

  useEffect(() => {
    socket.on("message", message => {
      console.log("from useEffect", message);
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = event => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      return sendMessage(event);
    }
  };

  // console.log(message, messages);

  console.log("MSG", message);
  console.log("MESSAGES:", messages);
  return (
    <div className="chat-container">
      <div>CHAT</div>

      <input
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  selectedRoom: state.room.selectedRoom
});

export default connect(mapStateToProps)(Chat);
