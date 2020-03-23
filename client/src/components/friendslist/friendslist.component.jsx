import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

// import {
//   setSubscribedRooms,
//   setSelectedRoom
// } from "../../redux/room/room.actions";
import { updateFriendslist } from "../../redux/user/user.actions";

// custom style sheet:
import "./friendslist.styles.scss";

// utils:
import { BASE_API_URL, CHAT_SERVER } from "../../utils";

// const FriendsList = ({ userAuth, friendslist }) => {
//   useEffect(() => {
//     updateFriendslist(userAuth.uid);
//     console.log("Friendlist Mounted");
//     console.log("cu", userAuth.uid);
//     console.log("fl", friendslist);

//     axios
//       .get(`${BASE_API_URL}/friends/friends-list/${userAuth.uid}`, {
//         params: { uid: userAuth.uid }
//       })
//       .then(res => {
//         console.log("REZ", res);
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   });

//   return (
//     <div className="info-header-container">
//       {console.log("cu", userAuth.uid)}
//       {friendslist.forEach((friend, i) => {
//         console.log("hi");
//         console.log(i, friend);
//       })}
//     </div>
//   );
// };

class FriendsList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateFriendslist(this.props.userAuth.uid);
    console.log("Friendlist Mounted");
  }

  componentWillUnmount() {
    console.log("Friendslist will unmount");
  }

  render() {
    return (
      <div className="friendslist-container">
        {this.props.friendslist.map((friend, i) => (
          <div key={i}>{friend.username}</div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  userAuth: user.userAuth,
  friendslist: user.friendslist
});

const mapDispatchToProps = dispatch => ({
  updateFriendslist: userID => dispatch(updateFriendslist(userID))
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
