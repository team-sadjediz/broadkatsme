export const RoomActionTypes = {
  RESET_ROOM_REDUX: "RESET_ROOM_REDUX",
  SET_SUBSCRIBED_ROOMS: "SET_SUBSCRIBED_ROOMS",
  SET_SELECTED_ROOM: "SET_SELECTED_ROOM",
  UPDATE_SUBSCRIBED_ROOMS: "UPDATE_SUBSCRIBED_ROOMS",
};

export const INITIAL_STATE = {
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
        delete: null,
      },
    },
  },
};
