import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  userAuth: null,
  currentUser: null,
  userProps: {
    friends: [],
    ownedRooms: [],
    subscribedRooms: [],
    favoritedRooms: [],
    notifications: []
  },
  socket: { id: null }
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_USER_AUTH:
      return {
        ...state,
        userAuth: action.payload
      };
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case UserActionTypes.SET_USER_PROPS:
      return {
        ...state,
        userProps: action.payload
      };
    case UserActionTypes.SET_SOCKET:
      return {
        ...state,
        socket: action.payload
      };
    // case UserActionTypes.UPDATE_CURRENT_USER:
    //   return state;
    // case UserActionTypes.UPDATE_USER_PROPS:
    //   return state;
    default:
      return state;
  }
};

export default userReducer;
