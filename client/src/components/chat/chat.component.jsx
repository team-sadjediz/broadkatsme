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

const Chat = ({ currentUser, selectedRoom }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    console.log("---------------------------------------------------------");
    console.log("MOUNT", messages);
    socket = io(ENDPOINT);

    socket.emit(
      "join",
      { name: currentUser.uid, room: selectedRoom },
      error => {
        console.log("someone joined");
        if (error) {
          console.log("ERROR", error);
        }
      }
    );

    socket.on("message", message => {
      console.log("on rec", messages);
      console.log("from useEffect", message.text);
      setMessages([...messages, message]);
    });

    return () => {
      // setMessages([]);
      socket.disconnect();
      console.log("DISMOUNT", messages);
      console.log("**************************************************");
    };
    // }, [ENDPOINT, currentUser.uid, selectedRoom]);
  }, [ENDPOINT, selectedRoom]);

  // second use effect not working as intended:
  // useEffect(() => {
  //   console.log("UPDATE MSGS:", messages);
  //   socket.on("message", message => {
  //     // console.log("from useEffect", message);
  //     setMessages([...messages, message]);
  //   });
  // });

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

  return (
    <div className="chat-container">
      {selectedRoom ? (
        <React.Fragment>
          <div className="chat-header-container">{selectedRoom}</div>
          <div className="message-list-container">
            {/* <ScrollToBottom> */}
            {messages.map(msg => {
              // console.log("from map", msg);
              return <Message message={msg.text} sender={msg.user}></Message>;
            })}
            {/* </ScrollToBottom> */}
          </div>
          {/* <input
            value={message}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          /> */}

          <TextField
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
        "please pick a room first"
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  selectedRoom: state.room.selectedRoom
});

export default connect(mapStateToProps)(Chat);
