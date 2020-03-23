import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import {
  setSelectedRoom,
  updateSubscribedRooms
} from "../../redux/room/room.actions";

import ImageButton from "../img-btn/img-btn.component";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

// custom style sheet:
import "./room-list-nav.styles.scss";

// utils:
import { BASE_API_URL, CHAT_SERVER } from "../../utils";

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

const DISPLAY_MAX = 3;

class RoomListNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayStart: 0,
      displayEnd: DISPLAY_MAX
    };
  }

  componentDidMount() {
    // console.log("RoomListNav Mounted");
    // console.log("RLN CDM uid", this.props.userAuth.uid);
    // this.props.updateSubscribedRooms(this.props.userAuth.uid, () => {
    //   console.log("lengthinside", this.props.subscribedRooms.length);
    // });
    // console.log("subscribedRooms", this.props.subscribedRooms);
    // console.log("length", this.props.subscribedRooms.length);
    // this.setState({ numOfRooms: 5 });
    // console.log(this.state);
    // axios
    //   .get(`${BASE_API_URL}/userprops/rooms/${this.props.userAuth.uid}`)
    //   .then(res => {
    //     console.log("subscribedRoomdfsdfsdfsdfsdfs", res.data);
    //     this.setState({ numOfRooms: res.data.length });
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     console.log(err.response);
    //   });
  }

  componentWillUnmount() {
    // console.log("RoomListNav will unmount");
  }

  next = () => {
    console.log(this.state, this.props.subscribedRooms.length);

    if (this.state.displayEnd < this.props.subscribedRooms.length) {
      this.setState({
        displayStart: this.state.displayStart + 1,
        displayEnd: this.state.displayEnd + 1
      });
    } else {
      console.log("end of line");
    }
  };

  prev = () => {
    console.log(this.state, this.props.subscribedRooms.length);

    if (this.state.displayStart > 0) {
      this.setState({
        displayStart: this.state.displayStart - 1,
        displayEnd: this.state.displayEnd - 1
      });
    } else {
      console.log("cant go back any further");
    }
  };

  render() {
    return (
      // <div className="room-list-nav-container">

      <React.Fragment>
        <RoomNavButton onClick={this.prev}>
          <ChevronLeftIcon />
        </RoomNavButton>
        {this.props.subscribedRooms
          .slice(this.state.displayStart, this.state.displayEnd)
          .map((room, i) => (
            <Link
              style={{ position: "relative" }}
              to={`/room/id=${room.roomID}`}
              key={i}
            >
              {this.props.selectedRoom.roomID === room.roomID ? (
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
                // bgImageUrl={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=default1.png`}
                bgImageUrl={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=${room.thumbnailUrl}`}
              ></ImageButton>
            </Link>
          ))}
        <RoomNavButton onClick={this.next}>
          <ChevronRightIcon />
        </RoomNavButton>
      </React.Fragment>
      // </div>
    );
  }
}

const mapStateToProps = ({ user, room }) => ({
  userAuth: user.userAuth,
  friendslist: user.friendslist,
  subscribedRooms: room.subscribedRooms,
  selectedRoom: room.selectedRoom
});

const mapDispatchToProps = dispatch => ({
  updateSubscribedRooms: uid => dispatch(updateSubscribedRooms(uid)),
  setSelectedRoom: roomID => dispatch(setSelectedRoom(roomID))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomListNav);
