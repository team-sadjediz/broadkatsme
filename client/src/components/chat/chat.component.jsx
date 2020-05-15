import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { setSocket, resetUserRedux } from "../../redux/user/user.actions";

// mui components:
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// components:
import Message from "../message/message.component";
// import SidebarContentHeader from "../sidebar-content-header/sidebar-content-header.component";

// custom style sheet:
import "./chat.styles.scss";

import { CHAT_SERVER } from "../../utils";

const textBoxBorderRadius = 3;

const CustomTextField = withStyles((theme) => ({
  root: {
    marginBottom: 2,
    "& .MuiFilledInput-underline:before": {
      // borderBottomColor: "green"
      borderBottom: "none",
    },
    "& .MuiFilledInput-underline:after": {
      // borderBottomColor: "green"
      borderBottom: `4px solid ${theme.palette.secondary.main}`,
      borderBottomRightRadius: textBoxBorderRadius,
      borderBottomLeftRadius: textBoxBorderRadius,
    },
    "& .MuiFilledInput-root": {
      borderRadius: textBoxBorderRadius,
    },
  },
}))(TextField);

let socket;

const Chat = ({
  currentUser,
  userAuth,
  selectedRoom,
  drawerOpen,
  socket,
  setSocket,
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket.id) {
      socket.on("message", (message) => {
        setMessages(message);
      });
    }
  }, [socket, selectedRoom.roomID]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", { msg: message, date: new Date() }, () => {
        setMessage("");
      });
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      return sendMessage(event);
    }
  };

  return (
    <div className="chat-container">
      {selectedRoom.roomID ? (
        <React.Fragment>
          <ScrollToBottom className="message-list-container">
            {messages.map((message, i) => {
              return (
                <Message
                  key={i}
                  message={message.msg}
                  senderID={message.senderID}
                  senderName={message.senderName}
                  chatColor={message.senderChatColor}
                  date={message.date}
                ></Message>
              );
            })}
          </ScrollToBottom>

          <CustomTextField
            id="filled-multiline-flexible"
            label="Chat Message"
            multiline
            rowsMax="4"
            value={message}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            variant="filled"
          />
        </React.Fragment>
      ) : (
        "Please pick a room first"
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  userAuth: state.user.userAuth,
  selectedRoom: state.room.selectedRoom,
  socket: state.user.socket,
});

const mapDispatchToProps = (dispatch) => ({
  setSocket: (socketID) => dispatch(setSocket(socketID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
