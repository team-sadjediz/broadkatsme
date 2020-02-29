import React, { Component } from "react";
import axios from "axios";

import { connect } from "react-redux";

import "./room-page.styles.scss";

// import Tag from "../../components/tag/tag.component";
import RoomBar from "../../components/room-bar/room-bar.component";
import BrowserOverlay from "../../components/browser-overlay/browser-overlay.component";
import RoomSettings from "../../components/room-settings/room-settings.component";

const initialState = {
  isMouseMoving: false,
  image: null,
  isFavorited: false,
  volume: 50,
  roomName: "TestRoom",
  roomID: "5e4a4c5a86ae580017aa1a78",
  ownerID: "TestOwnerID",
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
    this.timer = null;
  }

  async componentDidMount() {
    // const roomID = this.state.roomID;
    const roomID = { "roomID": "5e4a4c5a86ae580017aa1a78" };
    // console.log(roomID);

    let header = { "AuthToken": this.props.currentUser.getIdToken(true) };
    console.log(this.props.currentUser.getIdToken(true));
    await axios
      //   .get("http://broadkatsme.herokuapp.com/api/room/findroom", {
      //     params: roomID
      //   })
      // .get("http://localhost:5000/api/room/findroom", {
      .get("http://broadkatsme.herokuapp.com/api/room/findroom", {
        params: roomID
      })
      .then(
        res => this.fetchData(res.data)
        // console.log(res.data)
      )
      .catch(error => {
        console.error(error);
      });

    await axios
      // .get("http://localhost:5000/api/userprops/is-favorited", {
      .get("http://broadkatsme.herokuapp.com/api/userprops/is-favorited", {
        params: {
          "uid": this.props.currentUser.uid,
          "roomID": "5e4a4c5a86ae580017aa1a78"
        }
      })
      .then(res => this.setState({ isFavorited: res.data }))
      .catch(error => console.error(error));
    console.log(this.state);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(this.state.isMouseMoving);
    // console.log(nextState.isMouseMoving);
    // console.log(this.state.isMouseMoving !== nextState.isMouseMoving);
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

  fetchData = roomDetails => {
    this.setState({
      roomName: roomDetails.name,
      roomID: roomDetails._id,
      ownerID: roomDetails.owner_ID,
      showInitial: true,
      showSettings: false,
      subscribers: roomDetails.subscriber,
      tags: roomDetails.tags,
      settings: roomDetails.settings
    });
  };

  closeInitialModal = () => {
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
      "roomID": this.state.roomID
    };
    let response;
    await axios
      // .put("http://localhost:5000/api/userprops/favorite", request)
      .put("http://broadkatsme.herokuapp.com/api/userprops/favorite", request)
      .then(res => this.setState({ isFavorited: res.data.favorited }))
      .catch(error => console.error(error));
  };

  onChangeTag = tags => {
    this.setState({ tags: tags });
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
    return (
      <div className="main-container">
        {this.state.showSettings ? (
          <div className="room-settings-container">
            <RoomSettings
              tabs={["Add", "Delete", "Eat Shit"]}
              panels={["fml", "2xfml", "3xfml"]}
              toggleSettingsModal={this.toggleSettingsModal}
            ></RoomSettings>
          </div>
        ) : null}

        <div className="room-page-container">
          {/* <RoomSettings></RoomSettings> */}
          <div className="room-page">
            <div className="room-bar-area">
              <RoomBar
                roomName={this.state.roomName}
                roomID={this.state.roomID}
                tags={this.state.tags}
                toggleSettingsModal={this.toggleSettingsModal}
                favoriteRoom={this.favoriteRoom}
                isFavorited={this.state.isFavorited}
                onChangeTag={this.onChangeTag}
              />
            </div>
            <div
              className="room-screen-area"
              onMouseMove={e => this.handleMouseMove(e)}
            >
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(RoomPage);
