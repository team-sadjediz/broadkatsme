import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  setSubscribedRooms,
  setSelectedRoom
} from "../../redux/room/room.actions";

import { BASE_API_URL } from "../../utils";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./room-subscribe.styles.scss";

const RoomSubscribe = ({
  currentUser,
  setSubscribedRooms,
  setSelectedRoom,
  subscribedRooms
}) => {
  const [roomId, setRoomId] = useState(null);

  const handleChange = event => {
    setRoomId(event.target.value);
  };

  const handleSubscribe = async event => {
    if (roomId) {
      console.log(roomId, currentUser.uid);
      await axios.put(`${BASE_API_URL}/userprops/subscribed-rooms/subscribe`, {
        roomID: roomId,
        uid: currentUser.uid
      });

      let results = await axios.get(`${BASE_API_URL}/userprops/users-rooms`, {
        params: { uid: currentUser.uid }
      });
      setSubscribedRooms(results.data);
      setSelectedRoom(roomId);
    }
    setRoomId("");
  };

  const handleUnsubscribe = async event => {
    if (roomId) {
      console.log(roomId, currentUser.uid);
      await axios
        .put(`${BASE_API_URL}/userprops/subscribed-rooms/unsubscribe`, {
          roomID: roomId,
          uid: currentUser.uid
        })
        .catch(error => {
          console.log(error);
        });

      let results = await axios.get(`${BASE_API_URL}/userprops/users-rooms`, {
        params: { uid: currentUser.uid }
      });

      setSubscribedRooms(results.data);
      setSelectedRoom(subscribedRooms[0].roomID);
    }
    setRoomId("");
  };

  return (
    <div>
      <TextField
        required
        id="filled-required"
        label="Room ID"
        variant="filled"
        value={roomId}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubscribe}>
        Subscribe
      </Button>

      <Button variant="contained" color="primary" onClick={handleUnsubscribe}>
        Unsubscribe
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  subscribedRooms: state.room.subscribedRooms
});

const mapDispatchToProps = dispatch => ({
  setSubscribedRooms: subRoomList => dispatch(setSubscribedRooms(subRoomList)),
  setSelectedRoom: roomID => dispatch(setSelectedRoom(roomID))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomSubscribe);
