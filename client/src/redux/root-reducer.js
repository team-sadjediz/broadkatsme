import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import roomReducer from "./room/room.reducer";
import uiReducer from "./ui/ui.reducer";

export default combineReducers({
  user: userReducer,
  room: roomReducer,
  ui: uiReducer,
});
