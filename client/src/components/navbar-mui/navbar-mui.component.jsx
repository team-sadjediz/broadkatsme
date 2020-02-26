import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import CircleBtn from "../circle-btn/circle-btn.component";
import ImageButton from "../img-btn/img-btn.component";
import Poppity from "../poppity/poppity.component";
import PageDropdown from "../page-dropdown/page-dropdown.component";
import MouseOverPopover from "../custom-popover/custom-popover.component";
import NewRoom from "../new-room/new-room.component";

// icons:
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
import NineDotsIcon from "../../assets/icons/nine-dots-solid.svg";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";

import "./navbar-mui.styles.scss";

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

    this.state = {
      roomList: []
    };
  }

  async componentDidMount() {
    console.log(
      "hellllllllllllllllllllllllllllllllllllll",
      this.props.currentUser.uid
    );

    let results = await axios.get(
<<<<<<< HEAD
      // "http://localhost:5000/api/home/users-rooms",
      "http://broadkatsme.herokuapp.com/api/home/users-rooms",
=======
      "http://localhost:5000/api/home/users-rooms",
      // "http://broadkatsme.herokuapp.com/api/home/users-rooms",
>>>>>>> master
      {
        params: { uid: this.props.currentUser.uid }
      }
    );
    // console.log("iwannabefree", results);

    this.setState({ roomList: results.data });
    console.log("after api call", this.state.roomList);
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

              {console.log("before map:", this.state.roomList)}
              {this.state.roomList.map(room => (
                <Link to={`/room/id/${room.roomID}`}>
                  <ImageButton
                    iconHover={<SlowMotionVideoIcon />}
<<<<<<< HEAD
                    // bgImageUrl={`http://localhost:5000/api/room/get-thumbnail?thumbnail_url=${room.thumbnail_url}`}
                    bgImageUrl={`http://broadkatsme.herokuapp.com/api/room/get-thumbnail?thumbnail_url=${room.thumbnail_url}`}
=======
                    bgImageUrl={`http://localhost:5000/api/room/get-thumbnail?thumbnail_url=${room.thumbnail_url}`}
                    // bgImageUrl={`http://broadkatsme.herokuapp.com/api/room/get-thumbnail?thumbnail_url=${room.thumbnail_url}`}
>>>>>>> master
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

// export default ButtonAppBar;

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(ButtonAppBar);
