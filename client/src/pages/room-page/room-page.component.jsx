import React, { Component } from "react";
import axios from "axios";
// import { axiosConfig, setAuthorization } from "../../firebase/firebase.sdk";

import { BASE_API_URL } from "../../utils";
import { connect } from "react-redux";

import "./room-page.styles.scss";

import Tag from "../../components/tag/tag.component";
import RoomBar from "../../components/room-bar/room-bar.component";
import BrowserOverlay from "../../components/browser-overlay/browser-overlay.component";
import BrowserInit from "../../components/browser-init/browser-init.component";
import RoomSettings from "../../components/room-settings/room-settings.component";

// import Modal from "@material-ui/core/Modal";

const initialState = {
  isMouseMoving: false,
  image: null,
  isFavorited: false,
  volume: 50,
  roomName: "",
  // roomID: null,
  ownerID: "",
  showInitial: true,
  showSettings: false,
  subscribers: [],
  tags: [],
  settings: {
    roomSize: 1,
    private: true,
    access: {
      delete: null,
      roomAdmins: [],
      operators: [],
      invitations: [],
      banneds: []
    }
  }
};

class RoomPage extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    // this.state.roomID = this.props.selectedRoom;
    this.timer = null;
  }

  async componentDidMount() {
    // console.log(this.props.match.params);
    // console.log(this.props.match.params.id);
    this.fetchData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(this.props.selectedRoom !== nextProps.selectedRoom);
    // let roomID = this.props.selectedRoom !== nextProps.selectedRoom;
    let roomID = this.props.match.params.id !== nextProps.match.params.id;
    let isMouseMoving = this.state.isMouseMoving !== nextState.isMouseMoving;
    let isFavorited = this.state.isFavorited !== nextState.isFavorited;
    let roomName = this.state.roomName !== nextState.roomName;
    let showInitial = this.state.showInitial !== nextState.showInitial;
    let showSettings = this.state.showSettings !== nextState.showSettings;
    let subscribers = this.state.subscribers !== nextState.subscribers;
    let tags = this.state.tags !== nextState.tags;
    let settings = this.state.settings !== nextState.settings;
    // let showSettings = this.state.showSettings !== nextState.showSettings;
    return (
      roomID ||
      isMouseMoving ||
      isFavorited ||
      roomName ||
      showInitial ||
      showSettings ||
      subscribers ||
      subscribers ||
      tags ||
      settings
      // showSettings
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    // if (this.props.selectedRoom === null) {
    //   return;
    // }

    let roomDetails, isFavorited;
    await axios
      .get(`${BASE_API_URL}/room/find-room`, {
        // params: { "roomID": this.props.selectedRoom }
        params: { "roomID": this.props.match.params.id }
      })
      .then(res => {
        roomDetails = res.data;
      })
      .catch(error => {
        console.error(error);
      });
    // console.log(roomDetails);
    // await axiosConfig
    await axios
      .get(`${BASE_API_URL}/userprops/favorite-rooms/is-favorited`, {
        params: {
          "uid": this.props.currentUser.uid,
          // "roomID": this.props.selectedRoom
          "roomID": this.props.match.params.id
        }
      })
      .then(res => {
        isFavorited = res.data;
        // this.setState({ isFavorited: res.data });
      })
      .catch(error => console.error(error));
    this.setState({
      roomName: roomDetails.name,
      roomID: roomDetails._id,
      ownerID: roomDetails.owner_ID,
      // showInitial: true,
      // showSettings: false,
      subscribers: roomDetails.subscriber,
      tags: roomDetails.tags,
      settings: roomDetails.settings,
      isFavorited: isFavorited
    });
  };

  closeInit = () => {
    console.log("close init called");
    this.setState({ showInitial: false });
  };

  toggleSettingsModal = () => {
    const currentSettingsState = this.state.showSettings;
    this.setState({ showSettings: !currentSettingsState });
  };

  exit = () => {
    const home = "/";
    this.props.history.push(home);
  };

  favoriteRoom = async e => {
    let request = {
      "uid": this.props.currentUser.uid,
      // "roomID": this.state.roomID
      // "roomID": this.props.selectedRoom
      "roomID": this.props.match.params.id
    };
    let response;
    await axios
      .put(`${BASE_API_URL}/userprops/favorite-rooms/favorite`, request)
      .then(res => this.setState({ isFavorited: res.data.favorited }))
      .catch(error => console.error(error));
  };

  onChangeTag = tags => {
    this.setState({ tags: tags });
  };

  onChangeTitle = e => {
    this.setState({ roomName: e.target.value });
    //axios call to save title changes here & return true -> flashes when saved/true is returned?
  };

  handleMouseMove = e => {
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

  handleVolume = volume => {
    this.setState({ volume: volume });
  };

  render() {
    // console.log(this.state.showInitial);
    // console.log(this.props.selectedRoom);
    let tags = this.state.tags.map(tag => {
      // console.log(this.props.selectedRoom);
      return (
        <Tag
          key={tag}
          type="remove"
          text={tag}
          onChangeTag={this.onChangeTag}
          // roomID={this.state.roomID}
          // roomID={this.props.selectedRoom}
          roomID={this.props.match.params.id}
        ></Tag>
      );
    });
    let addTag = (
      <Tag
        type="add"
        // roomID={this.state.roomID}
        // roomID={this.props.selectedRoom}
        roomID={this.props.match.params.id}
        onChangeTag={this.onChangeTag}
      ></Tag>
    );
    return (
      <div className="main-container">
        {this.state.showSettings ? (
          <div className="room-settings-container">
            <RoomSettings
              toggleSettingsModal={this.toggleSettingsModal}
              // HEEEEREEEEEE
              owned={true}
              tags={tags}
              addTag={addTag}
              roomName={this.state.roomName}
            ></RoomSettings>
          </div>
        ) : null}

        <div className="room-page-container">
          <div className="room-page">
            <div className="room-bar-area">
              <RoomBar
                roomName={this.state.roomName}
                // roomID={this.state.roomID}
                // roomID={this.props.selectedRoom}
                roomID={this.props.match.params.id}
                // tags={this.state.tags}
                toggleSettingsModal={this.toggleSettingsModal}
                favoriteRoom={this.favoriteRoom}
                isFavorited={this.state.isFavorited}
                onChangeTag={this.onChangeTag}
                onChangeTitle={this.onChangeTitle}
              />
            </div>
            {this.state.showInitial ? (
              <div className="room-screen-init">
                <BrowserInit
                  // className="room-screen-init-play"
                  closeInit={this.closeInit}
                  roomName={this.state.roomName}
                ></BrowserInit>
              </div>
            ) : null}
            <div
              className="room-screen-area"
              onMouseMove={e => this.handleMouseMove(e)}
            >
              {/* <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Fb0Og6pB9Z8"
              ></iframe> */}
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
            <div className="room-tags-area">
              {/* <Tag
                type="add"
                // roomID={this.state.roomID}
                roomID={this.props.selectedRoom}
                onChangeTag={this.onChangeTag}
              ></Tag> */}
              {addTag}
              {tags}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  selectedRoom: state.room.selectedRoom
});

export default connect(mapStateToProps)(RoomPage);
