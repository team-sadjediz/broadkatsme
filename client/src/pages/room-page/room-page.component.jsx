import React, { Component } from "react";
import axios from "axios";
import io from "socket.io-client";
// import { axiosConfig, setAuthorization } from "../../firebase/firebase.sdk";

import { BASE_API_URL, CHAT_SERVER } from "../../utils";
import { connect } from "react-redux";
import {
  setSubscribedRooms,
  setSelectedRoom,
  updateSubscribedRooms,
} from "../../redux/room/room.actions";
import { Redirect } from "react-router-dom";

import "./room-page.styles.scss";

import Tag from "../../components/tag/tag.component";
import RoomTitle from "../../components/room-title/room-title.component";
import RoomBar from "../../components/room-bar/room-bar.component";
import BrowserOverlay from "../../components/browser-overlay/browser-overlay.component";
import BrowserInit from "../../components/browser-init/browser-init.component";
import RoomSettings from "../../components/room-settings/room-settings.component";
import Divider from "@material-ui/core/Divider";
import CircleButton from "../../components/circle-btn/circle-btn.component";

// import Modal from "@material-ui/core/Modal";

const initialState = {
  isFetching: true,
  exists: false,
  isMouseMoving: false,
  // isFavorited: false,
  volume: 50,
  roomName: "",
  ownerID: "",
  showInitial: true,
  showSettings: false,
  subscribers: [],
  tags: [],
  socketOverlay: false,
  blockControl: false,
  socketId: "",
};

class RoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.timer = null;
    this.cancelToken = axios.CancelToken;
    this.source = this.cancelToken.source();
  }

  componentDidMount() {
    this.validate();
    console.log("page mounted");

    if (this.props.socket.id) {
      console.log("listening success");
      this.props.socket.on("pushBlockControl", (message) => {
        this.setState({ blockControl: true });
        // console.log("on rec", messages);
        // console.log("Array of messsages from this room:", message);
        // setMessages([...message]);
        // setMessages(message);
        console.log(message);
      });
    }
  }

  componentWillUnmount() {
    this.source.cancel("Operations cancelled. Component unmounting.");
  }

  validate = async () => {
    //checks if the rooms subscribers include the owner
    //if not subscribed then they subscribe
    // otherwise if subscribed...
    await axios
      .get(`${BASE_API_URL}/room/find/${this.props.match.params.id}`, {
        cancelToken: this.source.token,
      })
      .then((res) => {
        this.setState({ exists: true, isFetching: false });
        if (res.data.subscribers.includes(this.props.userAuth.uid)) {
          return false;
        } else {
          // return false;
          return axios.put(
            `${BASE_API_URL}/userprops/subscribe/${this.props.match.params.id}/${this.props.userAuth.uid}`,
            null,
            { params: { action: "subscribe" } }
          );
        }
      })
      .then((subscribed) => {
        // if (!isSubscribed) {
        //   return axios.put(
        //     `${BASE_API_URL}/userprops/subscribe/${this.props.match.params.id}/${this.props.userAuth.uid}`,
        //     null,
        //     { params: { action: "subscribe" } }
        //   );
        // }
        console.log(this.state.exists);
        if (subscribed) {
          this.props.updateSubscribedRooms(this.props.userAuth.uid);
        }
        if (this.state.exists) {
          this.props.setSelectedRoom(this.props.match.params.id);
          this.fetchData();
          console.log(this.state);
        }
      })
      .catch((error) => this.setState({ isFetching: false, exists: false }));
  };

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(
    //   `!!!!!!!!!!!!!!!!!       ${this.props.match.params.id}             ${nextProps.match.params.id}       `
    // );
    // console.log("THIS CURRENT PROPS SELECTED ROOM");
    // console.log(this.props.selectedRoom);
    // console.log("NEXT PROPS SELECTED ROOM");
    // console.log(nextProps.selectedRoom);
    let isFetching = this.state.isFetching !== nextState.isFetching;
    let exists = this.state.exists !== nextState.exists;
    let roomID = this.props.match.params.id !== nextProps.match.params.id;
    let selectedRoomId =
      this.props.selectedRoom._id !== nextProps.selectedRoom._id;
    let isMouseMoving = this.state.isMouseMoving !== nextState.isMouseMoving;
    // let isFavorited = this.state.isFavorited !== nextState.isFavorited;
    let roomName = this.state.roomName !== nextState.roomName;
    let showInitial = this.state.showInitial !== nextState.showInitial;
    let showSettings = this.state.showSettings !== nextState.showSettings;
    let subscribers = this.state.subscribers !== nextState.subscribers;
    let tags = this.state.tags !== nextState.tags;
    let socketOverlay = this.state.socketOverlay !== nextState.socketOverlay;
    let blockControl = this.state.blockControl !== nextState.blockControl;
    let socketChanged = this.props.socket.id !== nextState.socketId;

    // console.log(
    //   `isFetching ${isFetching} - exists ${exists} - roomID ${roomID} - isMouseMoving ${isMouseMoving} - roomName ${roomName} - showInitial ${showInitial} - show Settings ${showSettings} - subscribers ${subscribers} - tags ${tags} - selectedRoomId ${selectedRoomId}`
    // );
    // console.log(
    //   isFetching ||
    //     exists ||
    //     roomID ||
    //     isMouseMoving ||
    //     // isFavorited ||
    //     selectedRoomId ||
    //     roomName ||
    //     showInitial ||
    //     showSettings ||
    //     subscribers ||
    //     subscribers ||
    //     tags
    // );
    return (
      isFetching ||
      exists ||
      roomID ||
      isMouseMoving ||
      // isFavorited ||
      selectedRoomId ||
      roomName ||
      showInitial ||
      showSettings ||
      subscribers ||
      subscribers ||
      tags ||
      socketOverlay ||
      blockControl
      // socketChanged
    );
    // return this.state !== nextState;
  }

  componentDidUpdate(prevProps) {
    this.setState({ socketId: this.props.socket.id });
    if (
      this.props.match.params.id !== prevProps.match.params.id ||
      this.props.selectedRoom._id !== prevProps.selectedRoom._id
    ) {
      // console.log(this.props.selectedRoom);
      // console.log(
      //   `COMPONENT HAS CHANGED DATA FROM ${this.props.match.params.id} TO ${prevProps.match.params.id}`
      // );
      this.fetchData();

      // console.log(this.state);
    }
  }

  fetchData = async () => {
    // let roomDetails;
    // let isFavorited = this.state.isFavorited;
    // await axios
    //   .get(`${BASE_API_URL}/room/find/${this.props.match.params.id}`, {
    //     cancelToken: this.source.token,
    //   })
    //   .then((res) => {
    //     roomDetails = res.data;
    //     return axios.put(
    //       `${BASE_API_URL}/userprops/favorites/${this.props.match.params.id}/${this.props.userAuth.uid}`,
    //       null,
    //       {
    //         params: { action: "exists" },
    //       },
    //       {
    //         cancelToken: this.source.token,
    //       }
    //     );
    //   })
    //   .then((res) => {
    //     isFavorited = res.data;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    // await axios
    //   .put(
    //     `${BASE_API_URL}/userprops/favorites/${this.props.match.params.id}/${this.props.user.userAuth.uid}`,
    //     null,
    //     {
    //       params: { action: "exists" },
    //     },
    //     {
    //       cancelToken: this.source.token,
    //     }
    //   )
    //   .then((res) => {
    //     isFavorited = res.data;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    console.log(this.props.selectedRoom);
    this.setState({
      roomName: this.props.selectedRoom.name,
      roomID: this.props.selectedRoom._id,
      ownerID: this.props.selectedRoom.ownerID,
      subscribers: this.props.selectedRoom.subscribers,
      tags: this.props.selectedRoom.tags,
      // isFavorited: isFavorited
    });
    console.log(this.state);
  };

  closeInit = () => {
    this.setState({ showInitial: false });
  };

  toggleSettingsModal = () => {
    const currentSettingsState = this.state.showSettings;
    this.setState({ showSettings: !currentSettingsState });
  };

  // favoriteRoom = async (e) => {
  //   let action;
  //   if (this.state.isFavorited) {
  //     action = "unfavorite";
  //   } else {
  //     action = "favorite";
  //   }
  //   await axios
  //     .put(
  //       `${BASE_API_URL}/userprops/favorites/${this.props.match.params.id}/${this.props.user.userAuth.uid}`,
  //       null,
  //       {
  //         params: { action },
  //       },
  //       {
  //         cancelToken: this.source.token,
  //       }
  //     )
  //     .then((res) => {
  //       this.setState({ isFavorited: res.data });
  //     })
  //     .catch((error) => console.log("not favorited"));
  // };

  unsubscribe = async () => {
    await axios
      .put(
        `${BASE_API_URL}/userprops/subscribe/${this.props.match.params.id}/${this.props.userAuth.uid}`,
        null,
        { params: { action: "unsubscribe" } },
        {
          cancelToken: this.source.token,
        }
      )
      .then((res) =>
        console.log("Unsubscribed from " + this.props.match.params.id)
      )
      .catch((error) => console.error(error));
  };

  onChangeTag = (tags) => {
    this.setState({ tags: tags });
  };

  onChangeTitle = (e) => {
    this.setState({ roomName: e.target.value });
    //axios call to save title changes here & return true -> flashes when saved/true is returned?
  };

  onSubmitTitle = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${BASE_API_URL}/roomsettings/change-name/${this.props.match.params.id}/${this.props.userAuth.uid}`,
        null,
        { params: { name: this.state.roomName } },
        { cancelToken: this.source.token }
      )
      .then((res) => console.log("Changed name to " + res.data))
      .catch((error) => console.error(error));
  };

  handleMouseMove = (e) => {
    e.preventDefault();
    this.setState({ isMouseMoving: true });
    (() => {
      clearTimeout(this.timer);
      this.timer = setTimeout(
        () => this.setState({ isMouseMoving: false }),
        3000
      );
    })();
  };

  handleVolume = (volume) => {
    this.setState({ volume: volume });
  };

  turnOffOverlay = (e) => {
    console.log("off");
    this.setState({ socketOverlay: false });
  };

  turnOnOverlay = (e) => {
    console.log("on");
    this.setState({ socketOverlay: true });
  };

  takeControl = (e) => {
    this.props.socket.emit("updateBlockControl", true, () => {
      console.log("updating this users controls");
      this.setState({ blockControl: false });
    });
  };

  render() {
    if (this.state.isFetching) {
      return <div> LOADING </div>;
    } else {
      if (!this.state.exists) {
        return <Redirect to="/lobby" />;
      } else {
        let tags = this.state.tags.map((tag) => {
          return (
            <Tag
              key={tag}
              type="remove"
              text={tag}
              onChangeTag={this.onChangeTag}
              roomID={this.props.match.params.id}
              uid={this.props.userAuth.uid}
            ></Tag>
          );
        });
        let addTag = (
          <Tag
            type="add"
            roomID={this.props.match.params.id}
            onChangeTag={this.onChangeTag}
            uid={this.props.userAuth.uid}
          ></Tag>
        );
        return (
          <React.Fragment>
            <div className="main-container">
              {this.state.showSettings ? (
                <div className="room-settings-container">
                  <RoomSettings
                    toggleSettingsModal={this.toggleSettingsModal}
                    roomID={this.props.match.params.id}
                    owned={true}
                    tags={tags}
                    addTag={addTag}
                    uid={this.props.userAuth.uid}
                    onChangeTitle={this.onChangeTitle}
                  ></RoomSettings>
                </div>
              ) : null}

              <div className="room-page-container">
                <div className="room-page">
                  <div className="room-title-area">
                    <RoomTitle
                      roomName={this.state.roomName}
                      onChangeTitle={this.onChangeTitle}
                      onSubmit={this.onSubmitTitle}
                    />
                  </div>
                  {this.state.showInitial ? (
                    <div className="room-screen-init">
                      <BrowserInit
                        closeInit={this.closeInit}
                        roomName={this.state.roomName}
                      ></BrowserInit>
                    </div>
                  ) : null}
                  <div
                    className="room-screen-area"
                    onMouseMove={(e) => this.handleMouseMove(e)}
                  >
                    <iframe
                      // width="500"
                      // height="500"
                      src="http://3.22.254.199:5800/"
                      // frameborder="0"
                      // allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                    {this.state.isMouseMoving ? (
                      <BrowserOverlay
                        className="browser-overlay"
                        volume={this.state.volume}
                        handleVolume={this.handleVolume}
                      />
                    ) : (
                      <div className="hide" />
                    )}
                  </div>
                  <div className="room-bar-area">
                    <RoomBar
                      toggleSettingsModal={this.toggleSettingsModal}
                      favoriteRoom={this.favoriteRoom}
                      isFavorited={this.state.isFavorited}
                      unsubscribe={this.unsubscribe}
                    />
                    {addTag}
                  </div>
                  <div className="room-tags-area">
                    <Divider className="room-tag-divider" variant="fullWidth" />
                    {/* {addTag} */}
                    {tags}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`socket-main ${
                this.state.socketOverlay ? "socket-overlay" : ""
              }`}
              // onMouseEnter={this.turnOnOverlay}
              // onMouseLeave={this.turnOffOverlay}
            >
              <div className="actual-browser"></div>
              <div className="socket-overlay"></div>
              {this.state.blockControl && (
                <div className="remote-control-blocked"></div>
              )}
              <CircleButton onClick={this.takeControl} />
            </div>
          </React.Fragment>
        );
      }
    }
  }
}

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  subscribedRooms: state.room.subscribedRooms,
  selectedRoom: state.room.selectedRoom,
  currentUser: state.user.currentUser,
  socket: state.user.socket,
});

const mapDispatchToProps = (dispatch) => ({
  updateSubscribedRooms: (uid) => dispatch(updateSubscribedRooms(uid)),
  setSelectedRoom: (roomID) => dispatch(setSelectedRoom(roomID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
