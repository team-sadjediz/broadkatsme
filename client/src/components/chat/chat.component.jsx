import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import { setSocket } from "../../redux/user/user.actions";

// mui components:
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// components:
import Message from "../message/message.component";

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
  setSocket,
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const endpoint = CHAT_SERVER;

  useEffect(() => {
    // console.log("---------------------------------------------------------");
    // console.log("MOUNT", messages);
    socket = io(endpoint);

    setSocket(socket);

    socket.emit(
      "join",
      {
        id: userAuth.uid,
        name: currentUser.username,
        chatColor: currentUser.chatColor,
        room: selectedRoom.roomID,
        date: new Date(),
      },
      (error) => {
        console.log("someone joined");
        if (error) {
          console.log("ERROR", error);
        }
      }
    );

    socket.on("message", (message) => {
      // console.log("on rec", messages);
      // console.log("Array of messsages from this room:", message);
      // setMessages([...message]);
      setMessages(message);
      // console.log("from useEffect", message.text);
      // setMessages([...messages, message]);
    });

    return () => {
      // setMessages([]);
      setSocket(null);
      socket.disconnect();
      // console.log("DISMOUNT", messages);
      // console.log("**************************************************");
    };
    // }, [ENDPOINT, currentUser.uid, selectedRoom]);
  }, [CHAT_SERVER, selectedRoom]);

  // second use effect not working as intended:
  // useEffect(() => {
  //   console.log("UPDATE MSGS:", messages);
  //   socket.on("message", message => {
  //     // console.log("from useEffect", message);
  //     setMessages([...messages, message]);
  //   });
  // });

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
          <div className="chat-header-container">
            {drawerOpen ? selectedRoom.roomID : ""}
          </div>
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
});

const mapDispatchToProps = (dispatch) => ({
  setSocket: (socketID) => dispatch(setSocket(socketID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
