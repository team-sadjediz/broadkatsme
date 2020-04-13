export const UserActionTypes = {
  RESET_USER_REDUX: "RESET_USER_REDUX",
  SET_USER_AUTH: "SET_USER_AUTH",
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_FRIENDSLIST: "SET_FRIENDSLIST",
  SET_NOTIFICATION: "SET_NOTIFICATION",
  SET_SOCKET: "SET_SOCKET",

  UPDATE_CURRENT_USER: "UPDATE_CURRENT_USER",
  UPDATE_FRIENDSLIST: "UPDATE_FRIENDSLIST",
  UPDATE_NOTIFICATION: "UPDATE_NOTIFICATION",
};

export const INITIAL_STATE = {
  userAuth: null,
  currentUser: {
    userID: "",
    username: "",
    chatColor: "",
    photoURL: "",
    biography: "",
    tags: [],
    favorites: { movies: "", music: "", websites: "" },
    privacy: true,
  },
  friendslist: [],
  notifications: [],
  socket: { id: null },
};
