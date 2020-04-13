import { RoomActionTypes, INITIAL_STATE } from "./room.types";

const roomReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RoomActionTypes.RESET_ROOM_REDUX:
      return action.payload;

    case RoomActionTypes.SET_SUBSCRIBED_ROOMS:
      return {
        ...state,
        subscribedRooms: action.payload,
      };
    case RoomActionTypes.SET_SELECTED_ROOM:
      return {
        ...state,
        selectedRoom: action.payload,
      };
    default:
      return state;
  }
};

export default roomReducer;
