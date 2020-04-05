import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Timestamp from "react-timestamp";
// import axios from "axios";
// import { BASE_API_URL } from "../../utils";

// mui components:

// custom style sheet:
import "./message.styles.scss";

const Message = ({
  message,
  senderID,
  senderName,
  chatColor,
  date,
  userAuth,
  currentUser
}) => {
  const [flexDirection, setFlexDirection] = useState("");
  const [border, setBorder] = useState({});
  const [bgColor, setBgColor] = useState("");
  const [orientation, setOrientation] = useState("");
  const [textAlign, setTextAlign] = useState("");

  // const getChatColor = async userID => {
  //   let chatColor = "white";
  //   await axios
  //     .get(`${BASE_API_URL}/userprofile/details/${userID}`)
  //     .then(async res => {
  //       console.log("chatcolor", res.data.chatColor);

  //       chatColor = await res.data.chatColor;
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });

  //   return chatColor;
  // };

  useEffect(() => {
    let isSentByCurrentUser = false;

    if (userAuth.uid === senderID) {
      isSentByCurrentUser = true;
    }

    if (isSentByCurrentUser) {
      setFlexDirection("flex-row-reverse");
      setBorder({ borderRight: `5px solid ${currentUser.chatColor}` });
      setBgColor("bgc-sent");
      setOrientation("align-right");
      setTextAlign("text-left");
    } else {
      setFlexDirection("flex-row");

      // let chatColor = "black"; // for admins
      // if (senderName !== "admin") {
      //   // getChatColor(senderID).then(res => {
      //   //   chatColor = res;
      //   // });
      //   chatColor = chatColor;
      // }

      console.log("chatCOLOR", chatColor);

      setBorder({ borderLeft: `5px solid ${chatColor || "black"}` });
      setBgColor("bgc-rec");
      setOrientation("align-left");
      setTextAlign("text-right");
    }
  }, []);

  // let isSentByCurrentUser = false;

  // if (userAuth.uid === senderID) {
  //   isSentByCurrentUser = true;
  // }

  // let flexDirection;
  // let border;
  // let bgColor;
  // let orientation;
  // let textAlign;
  // if (isSentByCurrentUser) {
  //   flexDirection = "flex-row-reverse";
  //   border = { borderRight: `5px solid ${currentUser.chatColor}` };
  //   bgColor = "bgc-sent";
  //   orientation = "align-right";
  //   textAlign = "text-left";
  // } else {
  //   flexDirection = "flex-row";
  //   // border = "border-left";
  //   let chatColor = getChatColor(senderID);
  //   console.log("chatCOLOR", chatColor);
  //   border = { borderLeft: `5px solid ${chatColor}` };
  //   bgColor = "bgc-rec";
  //   orientation = "align-left";
  //   textAlign = "text-right";
  // }

  return (
    <div className={`message-container ${orientation}`}>
      <div className={`msg-info-container ${flexDirection} ${orientation}`}>
        <div
          className={`msg-sender ${bgColor}`}
          // style={{ borderRight: "10px solid black" }}
          style={border}
        >
          {senderName}
        </div>
        {/* <div className={`msg-timestamp ${textAlign}`}>{date}</div> */}
        <Timestamp
          className={`msg-timestamp ${textAlign}`}
          // relative
          date={date}
          // autoUpdate
          options={{ format: "time" }}
        ></Timestamp>
      </div>
      <div className={`msg-text ${bgColor} ${orientation}`} style={border}>
        {message}
      </div>
    </div>
  );

  // return isSentByCurrentUser ? (
  //   <div className="message-container">
  //     <div className="msg-info-container">
  //       <div className="msg-sender sent-msgs">{username}</div>
  //       <div className="msg-timestamp">11:59:36</div>
  //     </div>
  //     <div className="msg-text sent-msgs">{message}</div>
  //   </div>
  // ) : (
  //   <div className="message-container">
  //     <div className="msg-info-container">
  //       <div className="msg-sender received-msgs">{username}</div>

  //       <div className="msg-timestamp ">11:59:36</div>
  //     </div>
  //     <div className="msg-text received-msgs">{message}</div>
  //   </div>
  // );
};

const mapStateToProps = state => ({
  userAuth: state.user.userAuth,
  currentUser: state.user.currentUser
});
export default connect(mapStateToProps)(Message);
