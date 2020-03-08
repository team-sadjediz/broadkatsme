import { BASE_API_URL, CHAT_SERVER } from "../../utils";
import axios from "axios";

import { RoomActionTypes } from "./room.types";

export const setSubscribedRooms = subscribedRooms => ({
  type: RoomActionTypes.SET_SUBSCRIBED_ROOMS,
  payload: subscribedRooms
});

export const setSelectedRoom = roomID => ({
  type: RoomActionTypes.SET_SELECTED_ROOM,
  payload: roomID
});

export const updateSubscribedRooms = userID => {
  return dispatch => {
    axios
      .get(`${BASE_API_URL}/userprops/users-rooms`, {
        params: { uid: userID }
      })
      .then(res => {
        dispatch(setSubscribedRooms(res.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
};
