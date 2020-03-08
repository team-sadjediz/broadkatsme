import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  setSubscribedRooms,
  setSelectedRoom
} from "../../redux/room/room.actions";

// custom style sheet:
import "./header-info.styles.scss";

// utils:
import { BASE_API_URL, CHAT_SERVER } from "../../utils";

const HeaderInfo = ({ currentUser, selectedRoom, subscribedRooms }) => {
  return (
    <div className="info-header-container">
      <div>User: {currentUser.uid}</div>
      <div>Room: {selectedRoom}</div>
      <div>BASE_API_URL: {BASE_API_URL}</div>
      <div>CHAT_SERVER: {CHAT_SERVER}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  subscribedRooms: state.room.subscribedRooms,
  selectedRoom: state.room.selectedRoom
});

// const mapDispatchToProps = dispatch => ({
//   setSubscribedRooms: subRoomList => dispatch(setSubscribedRooms(subRoomList)),
//   setSelectedRoom: roomID => dispatch(setSelectedRoom(roomID))
// });

export default connect(mapStateToProps)(HeaderInfo);
