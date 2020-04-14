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

// mui components:
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

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

// const useStyles = makeStyles(theme => ({
//   root: {
//     flexGrow: 1,
//     boxShadow: "none"
//   },
//   menuButton: {
//     marginRight: theme.spacing(2)
//   },
//   title: {
//     flexGrow: 1
//   }
// }));

// const MyAppBar = withStyles((theme) => ({
//   root: {
//     boxShadow: "none",
//   },
// }))(AppBar);

// const LogoCircle = withStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.secondary.main,
//     fontFamily: `"Karla"`,
//     textTransform: "uppercase",
//     fontWeight: "bold",
//     fontSize: "1em",
//     color: "white",
//     padding: 0,
//   },
// }))(IconButton);

// const MenuButton = withStyles((theme) => ({
//   root: {
//     backgroundColor: "white",
//     fontFamily: `"Karla"`,
//     textTransform: "uppercase",
//     fontWeight: "bold",
//     fontSize: "1em",
//     color: theme.palette.primary.main,
//     "&:hover": {
//       backgroundColor: theme.palette.secondary.main,
//       color: "white",
//     },
//   },
// }))(IconButton);

const RoomNavButton = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    fontFamily: `"Karla"`,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "1em",
    // margin: "0 3px",
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
    },
  },
}))(IconButton);

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

          <CircleButton icon={<DashboardIcon />} />
        </Link>
        <Link to="/search">
          {/* <RoomNavButton>
            <SearchIcon></SearchIcon>
          </RoomNavButton> */}
          <CircleButton icon={<SearchIcon />} />
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

          <CircleButton icon={<AddIcon />} />
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
        <CircleButton icon={<MenuIcon />} />
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
