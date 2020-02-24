import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import CircleBtn from "../circle-btn/circle-btn.component";
import ImageButton from "../img-btn/img-btn.component";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

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
    margin: "0 3px",
    color: "white",
    "&:hover": { backgroundColor: theme.palette.secondary.main, color: "white" }
  }
}))(IconButton);

class ButtonAppBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      room_name: "",
      tags: "",
      room_size: "",
      privacy: "true"
    };
  }

  componentDidMount() {
    console.log(
      "hellllllllllllllllllllllllllllllllllllll",
      this.props.currentUser.uid
    );

    // axios
    //   .get("http://broadkatsme.herokuapp.com/api/room/createroom", room)
    //   .then(() => console.log("Room posted to backend/created."))
    //   .catch(error => {
    //     console.error(error);
    //   });
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
              <RoomNavButton>
                <DashboardIcon></DashboardIcon>
              </RoomNavButton>

              <RoomNavButton>
                <SearchIcon></SearchIcon>
              </RoomNavButton>

              <RoomNavButton>
                <AddIcon></AddIcon>
              </RoomNavButton>

              <ImageButton
                iconHover={<SlowMotionVideoIcon />}
                bgImageUrl="https://i.picsum.photos/id/1049/3900/3120.jpg"
              ></ImageButton>
            </div>

            <MenuButton>
              {/* <MenuIcon color="primary"></MenuIcon> */}
              <MenuIcon></MenuIcon>
            </MenuButton>
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
