import { RoomActionTypes } from "./room.types";

const INITIAL_STATE = {
  subscribedRooms: [],
  selectedRoom: {
    roomID: null,
    subscribers: [],
    tags: [],
    ownerID: null,
    thumbnailUrl: "default1.png",
    settings: {
      roomSize: null,
      privacy: false,
      access: {
        roomAdmins: [],
        operators: [],
        invitations: [],
        bans: [],
        delete: null
      }
    }
  }
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
