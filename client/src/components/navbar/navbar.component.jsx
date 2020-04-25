import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  setSubscribedRooms,
  setSelectedRoom,
  updateSubscribedRooms,
} from "../../redux/room/room.actions";
// import axios from "axios";

// components:
import CircleButton from "../circle-btn/circle-btn.component";
import PageDropdown from "../page-dropdown/page-dropdown.component";
import Poppity from "../poppity/poppity-v2.component";
import UserAvatar from "../user-avatar/user-avatar.component";
import ProfileDropdown from "../profile-dropdown/profile-dropdown.component";
import HomeSearchBar from "../home-search-bar/home-search-bar.component";

// icons:
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MenuIcon from "@material-ui/icons/Menu";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

// custom style sheet:
import "./navbar.styles.scss";

// utils:
import { BASE_API_URL } from "../../utils";

const Navbar = ({
  updateSubscribedRooms,
  subscribedRooms,
  userAuth,
  currentUser,
}) => {
  useEffect(() => {
    updateSubscribedRooms(userAuth.uid);
    console.log("navbar sub rooms:", subscribedRooms);
  }, []);

  return (
    <div className="navbar-container">
      <Poppity
        triggerType="click"
        triggerComponent={
          <UserAvatar
            // square
            className="avatar-properties"
            // onlineStatus
            // imgUrl={`${BASE_API_URL}/userprofile/get-photo?photoUrl=${currentUser.photoURL}`}
          />
        }
        // spacingTop="1rem"
        spacingLeft="1rem"
        contentAnchorPoint="middle left"
        triggerAnchorPoint="middle right"
      >
        <ProfileDropdown />
      </Poppity>

      {/* <div className="logo-section"> */}
      {/* <p className="logo-text">broadkats.me</p> */}
      {/* <CircleButton className="me-btn" text="me"></CircleButton> */}
      {/* <LogoCircle>me</LogoCircle> */}
      {/* </div> */}

      <div className="room-nav">
        <HomeSearchBar />
      </div>

      <Poppity
        spacingTop="1rem"
        // content={}
        // buttonEventTrigger="hover"
        triggerComponent={
          <CircleButton className="nav-bar-btn" icon={<MenuIcon />} />
        }
        // contentAnchorPoint="top right"
        // childrenAnchorPoint="bottom right"
        contentAnchorPoint="top right"
        triggerAnchorPoint="bottom right"
      >
        <PageDropdown />
      </Poppity>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  subscribedRooms: state.room.subscribedRooms,
  selectedRoom: state.room.selectedRoom,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateSubscribedRooms: (uid) => dispatch(updateSubscribedRooms(uid)),
  setSelectedRoom: (roomID) => dispatch(setSelectedRoom(roomID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
