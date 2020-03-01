import { RoomActionTypes } from "./room.types";

export const setSubscribedRooms = subscribedRooms => ({
  type: RoomActionTypes.SET_SUBSCRIBED_ROOMS,
  payload: subscribedRooms
});

export const setSelectedRoom = roomID => ({
  type: RoomActionTypes.SET_SELECTED_ROOM,
  payload: roomID
});
