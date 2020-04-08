import React, { Component } from "react";

import "./room-title.styles.scss";

export default function RoomTitle(props) {
  return (
    <input
      className="room-name"
      type="text"
      value={props.roomName}
      onChange={props.onChangeTitle}
    />
  );
}
