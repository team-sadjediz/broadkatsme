import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  setSubscribedRooms,
  setSelectedRoom
} from "../../redux/room/room.actions";
import axios from "axios";

// components:
import CircleBtn from "../circle-btn/circle-btn.component";
import ImageButton from "../img-btn/img-btn.component";
import PageDropdown from "../page-dropdown/page-dropdown.component";
import MouseOverPopover from "../custom-popover/custom-popover.component";
import NewRoom from "../new-room/new-room.component";

// mui components:
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

// icons:
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import MenuIcon from "@material-ui/icons/Menu";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

// custom style sheet:
import "./navbar-mui.styles.scss";

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

const MyAppBar = withStyles(theme => ({
  root: {
    boxShadow: "none"
  }
}))(AppBar);

const LogoCircle = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    fontFamily: `"Karla"`,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "1em",
    color: "white",
    padding: 0
  }
}))(IconButton);

const MenuButton = withStyles(theme => ({
  root: {
    backgroundColor: "white",
    fontFamily: `"Karla"`,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "1em",
    color: theme.palette.primary.main,
    "&:hover": { backgroundColor: theme.palette.secondary.main, color: "white" }
  }
}))(IconButton);

const RoomNavButton = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    fontFamily: `"Karla"`,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: "1em",
    // margin: "0 3px",
    color: "white",
    "&:hover": { backgroundColor: theme.palette.secondary.main, color: "white" }
  }
}))(IconButton);

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   roomList: []
    // };
  }

  async componentDidMount() {
    console.log(
      "current user:",
      this.props.currentUser.uid,
      this.props.currentUser
    );

    // let results = await axios.get(`${BASE_API_URL}/userprops/users-rooms`, {
    //   params: { uid: this.props.currentUser.uid }
    // });
    let results = await axios.get(
      `${BASE_API_URL}/userprops/rooms/${this.props.currentUser.uid}`
    );
    console.log(results);

    this.props.setSubscribedRooms(results.data);
  }

  render() {
    return (
      <div className="nav-bar-container">
        <MyAppBar position="static">
          <Toolbar>
            <div className="logo-section">
              <p>broadkats</p>
              <CircleBtn text="me"></CircleBtn>
              {/* <LogoCircle>me</LogoCircle> */}
            </div>

            {/* [DEBUG]: TO SEE CURRENT USER INFO: */}
            {/* <div>{`${this.props.currentUser.uid} ${this.props.currentUser.email}`}</div> */}

            <div className="room-nav">
              <Link to="/lobby">
                <RoomNavButton>
                  <DashboardIcon></DashboardIcon>
                </RoomNavButton>
              </Link>
              <Link to="/search">
                <RoomNavButton>
                  <SearchIcon></SearchIcon>
                </RoomNavButton>
              </Link>
              <MouseOverPopover
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
                content={<NewRoom />}
              >
                <RoomNavButton>
                  <AddIcon></AddIcon>
                </RoomNavButton>
              </MouseOverPopover>
              {/* {console.log("before map:", this.state.roomList)} */}

              {this.props.subscribedRooms.map(room => (
                <Link
                  style={{ position: "relative" }}
                  to={`/room/id=${room.roomID}`}
                >
                  {this.props.selectedRoom === room.roomID ? (
                    <div className="room-selected">
                      <div className="indicator"></div>
                    </div>
                  ) : (
                    ""
                  )}
                  <ImageButton
                    onClick={() => {
                      this.props.setSelectedRoom(room.roomID);
                    }}
                    iconHover={<PlayCircleFilledIcon />}
                    bgImageUrl={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=${room.thumbnailUrl}`}
                  ></ImageButton>
                </Link>
              ))}
            </div>

            <MouseOverPopover
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              content={<PageDropdown />}
            >
              <MenuButton>
                <MenuIcon></MenuIcon>
              </MenuButton>
            </MouseOverPopover>
            {/* 
            <MenuButton>
              <MenuIcon></MenuIcon>
            </MenuButton> */}
          </Toolbar>
        </MyAppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  subscribedRooms: state.room.subscribedRooms,
  selectedRoom: state.room.selectedRoom
});

const mapDispatchToProps = dispatch => ({
  setSubscribedRooms: subRoomList => dispatch(setSubscribedRooms(subRoomList)),
  setSelectedRoom: roomID => dispatch(setSelectedRoom(roomID))
});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);
