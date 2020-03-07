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

export const setUserProps = userprops => ({
  type: UserActionTypes.SET_USER_PROPS,
  payload: userprops
});

export const setSocket = socket => ({
  type: UserActionTypes.SET_SOCKET,
  payload: socket
});

export const updateCurrentUser = userID => {
  return dispatch => {
    axios
      .get(`${BASE_API_URL}/userprofile/user-profile`, {
        params: { uid: userID }
      })
      .then(res => {
        dispatch(setCurrentUser(res.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const updateUserProps = userID => {
  console.log("updateUserProps", userID);
  return dispatch => {
    console.log("inside dispatch");
    axios
      .get(`${BASE_API_URL}/userprops/user-props`, {
        params: { uid: userID }
      })
      .then(res => {
        console.log("REZ", res);
        dispatch(setUserProps(res.data));
      })
      .catch(err => {
        console.error(err);
      });
  };
};
