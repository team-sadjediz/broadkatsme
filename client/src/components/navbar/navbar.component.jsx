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
import ImageButton from "../img-btn/img-btn.component";
import PageDropdown from "../page-dropdown/page-dropdown.component";
// import MouseOverPopover from "../custom-popover/custom-popover.component";
import NewRoom from "../new-room/new-room.component";
import RoomListNav from "../room-list-nav/room-list-nav.component";
import Poppity from "../poppity/poppity-v2.component";

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

const Navbar = ({ updateSubscribedRooms, subscribedRooms, userAuth }) => {
  // async componentDidMount() {
  //   this.props.updateSubscribedRooms(this.props.userAuth.uid);
  //   console.log("navbar sub rooms:", this.props.subscribedRooms);
  // }

  useEffect(() => {
    updateSubscribedRooms(userAuth.uid);
    console.log("navbar sub rooms:", subscribedRooms);
  }, []);

  return (
    <div className="nav-bar-container">
      <div className="logo-section">
        <p className="logo-text">broadkats.me</p>
        {/* <CircleButton className="me-btn" text="me"></CircleButton> */}
        {/* <LogoCircle>me</LogoCircle> */}
      </div>

      {/* [DEBUG]: TO SEE CURRENT USER INFO: */}
      {/* <div>{`${this.props.currentUser.uid} ${this.props.currentUser.email}`}</div> */}

      <div className="room-nav">
        <Link to="/lobby">
          {/* <RoomNavButton>
            <DashboardIcon></DashboardIcon>
          </RoomNavButton> */}

          <CircleButton className="nav-bar-btn" icon={<DashboardIcon />} />
        </Link>
        <Link to="/search">
          {/* <RoomNavButton>
            <SearchIcon></SearchIcon>
          </RoomNavButton> */}
          <CircleButton className="nav-bar-btn" icon={<SearchIcon />} />
        </Link>

        <Poppity
          content={<NewRoom />}
          // buttonEventTrigger="hover"
          spacing="10px"
          contentAnchorPoint="top middle"
          childrenAnchorPoint="bottom middle"
        >
          {/* <RoomNavButton>
            <AddIcon></AddIcon>
          </RoomNavButton> */}

          <CircleButton className="nav-bar-btn" icon={<AddIcon />} />
        </Poppity>

        <RoomListNav />
      </div>
      {/* <CircleButton icon={<MenuIcon />} /> */}

      <Poppity
        content={<PageDropdown />}
        buttonEventTrigger="hover"
        contentAnchorPoint="top right"
        childrenAnchorPoint="bottom right"
      >
        <CircleButton className="nav-bar-btn" icon={<MenuIcon />} />
      </Poppity>
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

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
