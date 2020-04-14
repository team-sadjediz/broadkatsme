import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  setSubscribedRooms,
  setSelectedRoom,
  updateSubscribedRooms,
} from "../../redux/room/room.actions";

// components:
import CircleButton from "../circle-btn/circle-btn.component";
import NewRoom from "../new-room/new-room.component";
import ChatColorChange from "../chat-color-change/chat-color-change.component";
import AddFriend from "../add-friend/add-friend.component";
import RoomSubscribe from "../room-subscribe/room-subscribe.component";
import HeaderInfo from "../header-info/header-info.component";

import Chat from "../chat/chat.component";
import FriendsList from "../friendslist/friendslist.component";

import ChatSidebarHeader from "../sidebar-content-header/sidebar-content-header.component";

// icons:
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import BugReportIcon from "@material-ui/icons/BugReport";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// custom style sheet:
import "./sidebar.styles.scss";

// utils:
import { BASE_API_URL } from "../../utils";

const tabNavComponents = [
  {
    component: <FriendsList />,
    componentHeader: null,
    title: "Friends List",
    icon: <SupervisedUserCircleIcon />,
    index: 0,
  },
  {
    component: <Chat />,
    componentHeader: <ChatSidebarHeader />,
    title: "Chat",
    icon: <ChatIcon />,
    index: 1,
  },
  {
    component: <HeaderInfo />,
    componentHeader: null,
    title: "Debug",
    icon: <BugReportIcon />,
    index: 2,
  },
];

const Sidebar = ({
  updateSubscribedRooms,
  subscribedRooms,
  userAuth,
  children,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [itemSelected, setItemSelected] = useState(0);

  useEffect(() => {}, [drawerOpen, itemSelected]);

  const toggleSidebar = () => {
    setDrawerOpen(!drawerOpen);
  };

  const enableSidebar = () => {
    setDrawerOpen(true);
  };

  return (
    <div className="main-sidebar-container">
      <div className="sidebar-nav">
        <div className="sidebar-item">
          <CircleButton
            id="toggle-sidebar-btn"
            className={`${drawerOpen ? "btn-left" : "btn-right"}`}
            icon={<ChevronRightIcon />}
            onClick={toggleSidebar}
          />
        </div>

        {tabNavComponents.map((item, i) => (
          <div key={i} className="sidebar-item">
            <CircleButton
              className={`tab-nav-item-circle-btn ${
                item.index === itemSelected ? "tab-nav-item-selected" : ""
              }`}
              onClick={() => {
                enableSidebar();
                setItemSelected(item.index);
              }}
              icon={item.icon}
            />
          </div>
        ))}

        <div onClick={toggleSidebar} className="toggle-container"></div>
      </div>

      <div
        className={`sidebar-content ${
          drawerOpen ? "sidebar-open" : "sidebar-closed"
        }`}
      >
        <div className="sidebar-header">
          {tabNavComponents[itemSelected].componentHeader
            ? tabNavComponents[itemSelected].componentHeader
            : tabNavComponents[itemSelected].title}
          {/* {} */}
        </div>
        <div className="sidebar-component">
          {tabNavComponents[itemSelected].component}
        </div>
      </div>

      <div className="main-content">{children}</div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  subscribedRooms: state.room.subscribedRooms,
  selectedRoom: state.room.selectedRoom,
});

const mapDispatchToProps = (dispatch) => ({
  updateSubscribedRooms: (uid) => dispatch(updateSubscribedRooms(uid)),
  setSelectedRoom: (roomID) => dispatch(setSelectedRoom(roomID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
