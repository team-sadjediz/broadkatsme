import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { updateFriendslist } from "../../redux/user/user.actions";

import { BASE_API_URL } from "../../utils";

import "./add-friend.styles.scss";

const AddFriend = ({ userAuth, updateFriendslist }) => {
  const [friendID, setFriendID] = useState("");

  const handleChange = (event) => {
    setFriendID(event.target.value);
  };

  const handleSubmit = (event) => {
    axios
      .put(`${BASE_API_URL}/friends/update/${userAuth.uid}/${friendID}`, null, {
        params: { action: "add" },
      })
      .then((res) => {
        updateFriendslist(userAuth.uid);
        setFriendID("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   // same as componentDidMount() (not really but sorta; read up on this)
  // }, []);

  return (
    <div>
      <TextField
        required
        id="filled-required"
        label="Add a friend (userID)"
        variant="filled"
        value={friendID}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Friend
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
});

const mapDispatchToProps = (dispatch) => ({
  updateFriendslist: (subRoomList) => dispatch(updateFriendslist(subRoomList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);
