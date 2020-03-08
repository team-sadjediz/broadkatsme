import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  userAuth: null,
  currentUser: {
    userID: "",
    username: "",
    chatColor: "",
    photoURL: "",
    biography: "",
    tags: [],
    favorites: { movies: "", music: "", websites: "" },
    privacy: true
  },
  friendslist: [],
  notifications: [],
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
    case UserActionTypes.SET_FRIENDSLIST:
      return {
        ...state,
        friendslist: action.payload
      };
    case UserActionTypes.SET_NOTIFICATION:
      return {
        ...state,
        notifications: action.payload
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
