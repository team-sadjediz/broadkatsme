import React, { useState, useEffect } from "react";

// mui components:
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

// custom style sheet:
import "./message.styles.scss";

const Message = ({ message, sender, currentUser }) => {
  let isSentByCurrentUser = false;

  if (currentUser.uid === sender) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="message-container align-right">{message}</div>
  ) : (
    <div className="message-container align-left">{message}</div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});
export default connect(mapStateToProps)(Message);
