import React, { Component } from "react";
import axios from "axios";

import { BASE_API_URL } from "../../utils";
import { connect } from "react-redux";
import {
  setSubscribedRooms,
  setSelectedRoom,
  updateSubscribedRooms,
} from "../../redux/room/room.actions";

import {
  setUserAuth,
  setCurrentUser,
  updateCurrentUser,
} from "../../redux/user/user.actions";


import Chip from "@material-ui/core/Chip";
import { withStyles } from "@material-ui/core/styles";

import "./tag.style.scss";

import AddCircleIcon from "@material-ui/icons/AddCircle";

// If type = add -> onClick = addOnClick, icon = addIcon
// If type = remove -> onClick = removeOnClick, icon = removeIcon
// REQUIRED PROPS: RoomID, text (if type == remove), onChangeTag
// onChangeTag is a function from the parent tag (if you remove a tag, you want to setState to change which tags are being displayed)

const useStyles = (theme) => ({
  root: {
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 3,
    fontSize: "1rem",
    // fontWeight: "bold",
    color: "#3a4660",
    background: "#fff",
    "& svg": {
      fill: "#3a4660 !important",
    },
    "&:hover": {
      color: "#fff",
      background: "#ef5350",
      "& svg": {
        fill: "#fff !important",
      },
    },
    "&:focus": {
      backgroundColor: "#ef5350 !important",
      "& svg": {
        fill: "#fff !important",
      },
    },
  },
  input: {
    width: "4em",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    fontFamily:
      "Karla, Roboto, sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI",
    fontSize: "1rem",
    "&:focus": {
      backgroundColor: "transparent !important",
      "& svg": {
        fill: "#fff !important",
      },
    },
  },
  svg: {
    fill: "#3a4660 !important",
  },
  add: {
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 3,
    background: "#fff",
    "&:hover": {
      color: "#fff",
      background: "#ef5350",
      "& svg": {
        fill: "#fff !important",
      },
    },
  },
  label: {
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 3,
    fontSize: "1rem",
    // fontWeight: "bold",
    background: "#3a4660",
    color: "#fff",
    "&:hover": {
      color: "#fff",
      background: "#ef5350",
    },
  },
});

class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      input: "",
    };
    this.cancelToken = axios.CancelToken;
    this.source = this.cancelToken.source();
  }

  componentWillUnmount() {
    this.source.cancel("Operations cancelled. Component unmounting.");
  }

  addOnClick = (e) => {
    e.preventDefault();
    let tag = this.state.input;

    axios
      .put(
        `${BASE_API_URL}/room/tags/${this.props.roomID}/${this.props.uid}`,
        null,
        {
          params: { tags: tag, action: "add" },
        },
        {
          cancelToken: this.source.token,
        }
      )
      .then((res) => {
        this.props.updateSubscribedRooms(this.props.roomID);
        this.props.setSelectedRoom(this.props.roomID);
        this.props.onChangeTag(res.data);
        this.setState({ input: "" });
      })
      .catch((error) => console.error(error));
  };

  removeOnClick = (e) => {
    e.preventDefault();
    let tag = this.props.text;
    axios
      .put(
        `${BASE_API_URL}/room/tags/${this.props.roomID}/${this.props.uid}`,
        null,
        {
          params: { tags: tag, action: "delete" },
        },
        {
          cancelToken: this.source.token,
        }
      )
      .then((res) => {
        this.props.updateSubscribedRooms(this.props.roomID);
        this.props.setSelectedRoom(this.props.roomID);
        this.props.onChangeTag(res.data);
      })
      .catch((error) => console.error(error));
  };

  //for user profile tags start
  addProfileTag = (e) => {
    e.preventDefault();
    let tag = this.state.input;
    axios
      .put(
        `${BASE_API_URL}/userprofile/tags/${this.props.uid}`,
        null,
        {
          params: { tags: tag, action: "add" },
        },
        {
          cancelToken: this.source.token,
        }
      )
      .then((res) => {
        this.props.updateCurrentUser(this.props.uid);
        this.props.setCurrentUser(this.props.uid);
        this.props.onChangeTag(res.data);
        this.setState({ input: "" });
      })
      .catch((error) => console.error(error));
  };

  removeProfileTag = (e) => {
    e.preventDefault();
    let tag = this.props.text;
    axios
      .put(
        `${BASE_API_URL}/userprofile/tags/${this.props.uid}`,
        null,
        {
          params: { tags: tag, action: "delete" },
        },
        {
          cancelToken: this.source.token,
        }
      )
      .then((res) => {
        this.props.updateCurrentUser(this.props.uid);
        this.props.setCurrentUser(this.props.uid);
        this.props.onChangeTag(res.data);
      })
      .catch((error) => console.error(error));
  };
  //for user profile tags end

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  render() {
    const { classes } = this.props;
    if (this.state.type === "add") {
      return (
        <Chip
          className={classes.add}
          label={
            <input
              className={classes.input}
              id="add-tag"
              type="text"
              value={this.state.input}
              onChange={this.handleChange}
              placeholder="Add tag"
            />
          }
          icon={
            <AddCircleIcon onClick={this.addOnClick} className={classes.svg} />
          }
          variant="outlined"
        ></Chip>
      );
    } else if (this.state.type === "remove") {
      return (
        <Chip
          // do an if check to see if they have the permissions and if not, disable
          // disabled
          className={classes.root}
          onDelete={this.removeOnClick}
          label={this.props.text}
          variant="outlined"
        />
      );
    } else if (this.state.type === "label") {
      return <Chip className={classes.label} label={this.props.text} />;
    } else if (this.state.type === "add-profile") {
      return (
        <Chip
          className={classes.add}
          label={
            <input
              className={classes.input}
              id="add-tag"
              type="text"
              value={this.state.input}
              onChange={this.handleChange}
              placeholder="Add tag"
            />
          }
          icon={
            <AddCircleIcon onClick={this.addProfileTag} className={classes.svg} />
          }
          variant="outlined"
        />
      );
    } else if (this.state.type === "remove-profile") {
      return (
        <Chip
          className={classes.root}
          onDelete={this.removeProfileTag}
          label={this.props.text}
          variant="outlined"
        />
      );
    }
  }
}

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  subscribedRooms: state.room.subscribedRooms,
  selectedRoom: state.room.selectedRoom,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateSubscribedRooms: (uid) => dispatch(updateSubscribedRooms(uid)),
  setSelectedRoom: (roomID) => dispatch(setSelectedRoom(roomID)),
  updateCurrentUser: (uid) => dispatch(updateCurrentUser(uid)),
  setCurrentUser: (uid) => dispatch(setCurrentUser(uid)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(Tag));
