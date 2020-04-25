import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// redux:
import { connect } from "react-redux";
import { updateFriendslist } from "../../redux/user/user.actions";

// custom components:
import CircleButton from "../circle-btn/circle-btn.component";
import Poppity from "../poppity/poppity-v2.component";
import Modal from "../modal/modal.component";
import RoomInvite from "../room-invite/room-invite.component";

// mui icons:
import UserAvatar from "../user-avatar/user-avatar.component";
import FaceIcon from "@material-ui/icons/Face";
import AirplayIcon from "@material-ui/icons/Airplay";
import FiberSmartRecordIcon from "@material-ui/icons/FiberSmartRecord";

import { BASE_API_URL, CHAT_SERVER } from "../../utils";

// custom style sheet:
import "./friendslist.styles.scss";

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateFriendslist(this.props.userAuth.uid);
    console.log("Friendlist Mounted");
    console.log("FL:", this.props.friendslist);
  }

  componentWillUnmount() {
    console.log("Friendslist will unmount");
  }

  render() {
    return (
      <div className="friends-list-container">
        {this.props.friendslist.map((friend, i) => (
          <div key={i} className="friend-item">
            <UserAvatar
              imgUrl={`${BASE_API_URL}/userprofile/get-photo?photoUrl=${friend.photoURL}`}
              onlineStatus={i % 2 == 0 ? true : false}
            />
            <span>{friend.username}</span>

            <Link to={`/userprofile/id=${friend.userID}`}>
              <CircleButton className="friend-btn" icon={<FaceIcon />} />
            </Link>

            <Modal
              backdrop
              triggerComponent={
                <CircleButton
                  className="friend-btn"
                  icon={<FiberSmartRecordIcon />}
                />
              }
              triggerAnchorPoint="bottom right"
              contentAnchorPoint="top right"
            >
              <RoomInvite userToInvite={friend.username} />
            </Modal>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
  friendslist: user.friendslist,
});

const mapDispatchToProps = (dispatch) => ({
  updateFriendslist: (userID) => dispatch(updateFriendslist(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
