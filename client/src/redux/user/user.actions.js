import { BASE_API_URL, CHAT_SERVER } from "../../utils";
import axios from "axios";
import { UserActionTypes } from "./user.types";

export const setUserAuth = user => ({
  type: UserActionTypes.SET_USER_AUTH,
  payload: user
});

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const setFriendsList = friendslist => ({
  type: UserActionTypes.SET_FRIENDSLIST,
  payload: friendslist
});

export const setNotifications = notifications => ({
  type: UserActionTypes.SET_NOTIFICATION,
  payload: notifications
});

export const setSocket = socket => ({
  type: UserActionTypes.SET_SOCKET,
  payload: socket
});

export const updateCurrentUser = userID => {
  return dispatch => {
    axios
      .get(`${BASE_API_URL}/userprofile/details/${userID}`)
      .then(res => {
        dispatch(setCurrentUser(res.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const updateFriendslist = userID => {
  console.log("updateFriendslist called");
  return dispatch => {
    console.log("nope");
    axios
      .get(`${BASE_API_URL}/friends/friends-list/${userID}`, {
        params: { uid: userID }
      })
      .then(res => {
        console.log("REZ", res);
        dispatch(setFriendsList(res.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

// export const updateNotifications = userID => {
//   return dispatch => {
//     axios
//       .get(`${BASE_API_URL}/userprops/user-props`, {
//         params: { uid: userID }
//       })
//       .then(res => {
//         console.log("REZ", res);
//         dispatch(setUserProps(res.data));
//       })
//       .catch(err => {
//         console.error(err);
//       });
//   };
// };
