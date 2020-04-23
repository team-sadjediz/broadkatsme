import React, { useState, useEffect } from "react";

// components:
import CircleButton from "../circle-btn/circle-btn.component";
import ChatColorChange from "../chat-color-change/chat-color-change.component";
import Poppity from "../poppity/poppity-v2.component";

// icons:
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import BugReportIcon from "@material-ui/icons/BugReport";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ColorLensIcon from "@material-ui/icons/ColorLens";

// custom style sheet:
import "./sidebar-content-header.styles.scss";

// utils:
// import { BASE_API_URL } from "../../utils";

const ChatSidebarHeader = ({ children }) => {
  return (
    <div className="chat-header">
      <div className="chat-title">Chat</div>

      <Poppity
        triggerType="click"
        triggerComponent={
          <CircleButton
            id="change-color-btn"
            className="chat-header-content"
            icon={<ColorLensIcon />}
          />
        }
        contentAnchorPoint="top right"
        triggerAnchorPoint="bottom right"
      >
        <ChatColorChange />
      </Poppity>
    </div>
  );
};

export default ChatSidebarHeader;
