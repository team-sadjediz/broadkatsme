import React, { useState, useEffect } from "react";

// components:
import CircleButton from "../circle-btn/circle-btn.component";
import ChatColorChange from "../chat-color-change/chat-color-change.component";
import Poppity from "../poppity/poppity-v2.component";
import AddFriend from "../add-friend/add-friend.component";

// icons:
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import BugReportIcon from "@material-ui/icons/BugReport";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import CancelIcon from "@material-ui/icons/Cancel";
import CloseIcon from "@material-ui/icons/Close";

// custom style sheet:
import "./sidebar-header-friendslist.styles.scss";

const ChatSidebarHeader = ({ children }) => {
  const [showAddFriend, setShowAddFriend] = useState(false);

  const toggleAddFriend = () => {
    setShowAddFriend(!showAddFriend);
  };
  return (
    <div className="friendslist-header">
      <div className={`friendslist-title ${showAddFriend ? "hidden" : ""}`}>
        Friends List
      </div>

      <AddFriend
        className={`add-friend-override ${showAddFriend ? "" : "hidden"}`}
        toggleComponent={toggleAddFriend}
      />

      <CircleButton
        id="header-add-friend-btn"
        className="chat-header-content"
        icon={showAddFriend ? <CloseIcon /> : <PersonAddIcon />}
        onClick={toggleAddFriend}
      />
    </div>
  );
};

export default ChatSidebarHeader;
