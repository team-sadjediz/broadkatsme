import React, { Component } from "react";

import "./room-title.styles.scss";

export default function RoomTitle(props) {
  return (
    <input
      className="room-name"
      type="text"
      value={props.roomName}
      onChange={props.onChangeTitle}
      // placeholder={this.props.roomName}
      // onkeypress="this.style.width = ((this.value.length + 1) * 8) + 'px';"
    />
  );
}
