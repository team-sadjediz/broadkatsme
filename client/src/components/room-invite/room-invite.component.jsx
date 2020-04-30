import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateFriendslist } from "../../redux/user/user.actions";

import CircleButton from "../circle-btn/circle-btn.component";
import CloseIcon from "@material-ui/icons/Close";
import CancelIcon from "@material-ui/icons/Cancel";

import "./room-invite.styles.scss";

const RoomInvite = ({
  userAuth,
  subscribedRooms,
  userToInvite = "none",
  closeComponent = () => {
    return;
  },
}) => {
  // const [varA, setVarA] = useState("");
  // const [varB, setVarB] = useState([]);

  useEffect(() => {}, []);

  const sendInvite = (roomID) => {
    console.log(`Invite sent to ${userToInvite} for room ${roomID}`);
    closeComponent();
  };

  return (
    <div className="room-invite-container">
      <CircleButton
        onClick={closeComponent}
        className="close-invite-btn"
        icon={<CloseIcon />}
      ></CircleButton>
      <p className="invite-header">
        Invite <span className="invitee-name">{userToInvite}</span> to:
      </p>
      <ul className="room-invite-list">
        {subscribedRooms.map((room, i) =>
          room.ownerID === userAuth.uid || !room.settings.privacy ? (
            <li key={i}>
              <button
                className="invite-btn"
                onClick={() => {
                  sendInvite(room.roomID);
                }}
              >
                {room.name}
              </button>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  subscribedRooms: state.room.subscribedRooms,
});

const mapDispatchToProps = (dispatch) => ({
  updateFriendslist: (userID) => dispatch(updateFriendslist(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomInvite);
