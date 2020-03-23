import { BASE_API_URL, CHAT_SERVER } from "../../utils";
import axios from "axios";

import { RoomActionTypes } from "./room.types";

export const setSubscribedRooms = subscribedRooms => ({
  type: RoomActionTypes.SET_SUBSCRIBED_ROOMS,
  payload: subscribedRooms
});

export const setSelectedRoomInfo = roomID => ({
  type: RoomActionTypes.SET_SELECTED_ROOM,
  payload: roomID
});

export const updateSubscribedRooms = userID => {
  console.log("updateSubRooms for ", userID);
  return dispatch => {
    console.log("dispatches");

    axios
      .get(`${BASE_API_URL}/userprops/rooms/${userID}`)
      .then(res => {
        console.log("dispatch done", res.data);
        dispatch(setSubscribedRooms(res.data));
      })
      .catch(err => {
        console.error(err);
        console.log(err.response);
      });
  };
};

export const setSelectedRoom = roomID => {
  return dispatch => {
    axios
      .get(`${BASE_API_URL}/room/find/${roomID}`)
      .then(res => {
        console.log("h", { roomID: roomID, ...res.data });
        dispatch(setSelectedRoomInfo({ roomID: roomID, ...res.data }));
      })
      .catch(err => {
        console.error(err);
      });
  };
};
