import { RoomActionTypes } from "./room.types";

const INITIAL_STATE = {
  subscribedRooms: [],
  selectedRoom: null
};

const roomReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RoomActionTypes.SET_SUBSCRIBED_ROOMS:
      return {
        ...state,
        subscribedRooms: action.payload
      };
    case RoomActionTypes.SET_SELECTED_ROOM:
      return {
        ...state,
        selectedRoom: action.payload
      };
    default:
      return state;
  }
};

export default roomReducer;
