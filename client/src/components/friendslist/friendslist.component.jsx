import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import ImageButton from "../img-btn/img-btn.component";
import AirplayIcon from "@material-ui/icons/Airplay";

// import {
//   setSubscribedRooms,
//   setSelectedRoom
// } from "../../redux/room/room.actions";
import { updateFriendslist } from "../../redux/user/user.actions";

// custom style sheet:
import "./friendslist.styles.scss";

// utils:
import { BASE_API_URL, CHAT_SERVER } from "../../utils";

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
      // <div className="friendslist-container">
      //   {this.props.friendslist.map((friend, i) => (
      //     <div key={i}>{friend.username}</div>
      //   ))}
      // </div>
      <div className="friends-list-container">
        {/* {console.log("FL", friendslist)} */}
        {this.props.friendslist.map((friend, i) => (
          <div key={i} className="friend-item">
            <ImageButton
              // src={`${BASE_API_URL}/userprofile/get-photo?photoUrl=${this.state.photoURL}`}
              bgImageUrl={`${BASE_API_URL}/userprofile/get-photo?photoUrl=${friend.photoURL}`}
            ></ImageButton>
            <span>{friend.username}</span>

            <div className="send-invitation">
              <AirplayIcon />
            </div>

            <div className="status">
              <div className={`circle ${i % 2 == 0 ? "green" : "red"}`}></div>
            </div>
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
