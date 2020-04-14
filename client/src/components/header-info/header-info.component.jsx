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

const HeaderInfo = ({ userAuth, selectedRoom, subscribedRooms }) => {
  return (
    <div className="info-header-container">
      <div>User: {userAuth.uid}</div>
      <div>Room: {selectedRoom["roomID"]}</div>
      <div>BASE_API_URL: {BASE_API_URL}</div>
      <div>CHAT_SERVER: {CHAT_SERVER}</div>
    </div>
  );
};

const mapStateToProps = state => ({
  userAuth: state.user.userAuth,
  subscribedRooms: state.room.subscribedRooms,
  selectedRoom: state.room.selectedRoom
});

// const mapDispatchToProps = dispatch => ({
//   setSubscribedRooms: subRoomList => dispatch(setSubscribedRooms(subRoomList)),
//   setSelectedRoom: roomID => dispatch(setSelectedRoom(roomID))
// });

export default connect(mapStateToProps)(HeaderInfo);
