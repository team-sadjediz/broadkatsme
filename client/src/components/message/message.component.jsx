import React from "react";
import { connect } from "react-redux";
import Timestamp from "react-timestamp";

// mui components:

// custom style sheet:
import "./message.styles.scss";

const Message = ({ message, sender, currentUser }) => {
  let isSentByCurrentUser = false;

  if (currentUser.uid === sender) {
    isSentByCurrentUser = true;
  }

  let username = sender;

  if (sender.length > 10) {
    username =
      sender.slice(0, 3) + sender.slice(sender.length - 3, sender.length);
  }

  let flexDirection;
  let border;
  let bgColor;
  let orientation;
  if (isSentByCurrentUser) {
    flexDirection = "flex-row-reverse";
    border = "border-right";
    bgColor = "bgc-sent";
    orientation = "align-right";
  } else {
    flexDirection = "flex-row";
    border = "border-left";
    bgColor = "bgc-rec";
    orientation = "align-left";
  }

  let date = new Date();

  console.log(date);

  return (
    <div className={`message-container ${orientation}`}>
      <div className={`msg-info-container ${flexDirection} ${orientation}`}>
        <div className={`msg-sender ${border} ${bgColor}`}>{username}</div>
        {/* <div className="msg-timestamp">11:59:36</div> */}
        <Timestamp
          className="msg-timestamp"
          date={date}
          relative
          autoUpdate
        ></Timestamp>
      </div>
      <div className={`msg-text ${border} ${bgColor} ${orientation}`}>
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
  currentUser: state.user.currentUser
});
export default connect(mapStateToProps)(Message);
