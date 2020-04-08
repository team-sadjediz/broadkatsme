import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  setSubscribedRooms,
  setSelectedRoom,
} from "../../redux/room/room.actions";

import { BASE_API_URL } from "../../utils";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./room-subscribe.styles.scss";

const RoomSubscribe = ({
  userAuth,
  currentUser,
  setSubscribedRooms,
  setSelectedRoom,
  subscribedRooms,
}) => {
  const [roomId, setRoomId] = useState(null);

  const handleChange = (event) => {
    setRoomId(event.target.value);
  };

  const handleSubscribe = async (event) => {
    if (roomId) {
      console.log(roomId, userAuth.uid);
      // await axios.put(`${BASE_API_URL}/userprops/subscribed-rooms/subscribe`, {
      //   roomID: roomId,
      //   uid: currentUser.uid
      // });
      console.log("sdlkfjlksdjfjfjjjjjjjjjjjjjjjjjjjjjjjjjjjj", roomId);
      await axios.put(
        `${BASE_API_URL}/userprops/subscribe/${roomId}/${userAuth.uid}`,
        null,
        { params: { action: "subscribe" } }
      );

      // let results = await axios.get(`${BASE_API_URL}/userprops/users-rooms`, {
      //   params: { uid: currentUser.uid }
      // });
      let results = await axios.get(
        `${BASE_API_URL}/userprops/rooms/${userAuth.uid}`
      );

      setSubscribedRooms(results.data);
      setSelectedRoom(roomId);
    }
    setRoomId("");
  };

  const handleUnsubscribe = async (event) => {
    if (roomId) {
      // console.log(roomId, currentUser.uid);
      // await axios
      //   .put(`${BASE_API_URL}/userprops/subscribed-rooms/unsubscribe`, {
      //     roomID: roomId,
      //     uid: currentUser.uid
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });

      // await axios
      //   .put(
      //     `${BASE_API_URL}/userprops/subscribe/${currentUser.uid}/${roomId}`,
      //     null,
      //     { params: { action: "unsubscribe" } }
      //   )
      await axios
        .put(
          `${BASE_API_URL}/userprops/subscribe/${roomId}/${userAuth.uid}`,
          null,
          { params: { action: "unsubscribe" } }
        )
        .catch((error) => {
          console.log(error);
        });

      // let results = await axios.get(`${BASE_API_URL}/userprops/users-rooms`, {
      //   params: { uid: currentUser.uid }
      // });
      let results = await axios.get(
        `${BASE_API_URL}/userprops/rooms/${userAuth.uid}`
      );

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

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  currentUser: state.user.currentUser,
  subscribedRooms: state.room.subscribedRooms,
});

const mapDispatchToProps = (dispatch) => ({
  setSubscribedRooms: (subRoomList) =>
    dispatch(setSubscribedRooms(subRoomList)),
  setSelectedRoom: (roomID) => dispatch(setSelectedRoom(roomID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomSubscribe);
