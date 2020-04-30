import React, { Component } from "react";

import "./room-title.styles.scss";

export default function RoomTitle(props) {
  return (
    <form
      className="room-title-container"
      onSubmit={props.onSubmit}
      onBlur={props.onSubmit}
    >
      <input
        className="room-title"
        type="text"
        value={props.roomName}
        onChange={props.onChangeTitle}
      />
      <input className="visually-hidden" type="submit" value="Submit" />
    </form>
  );
}
