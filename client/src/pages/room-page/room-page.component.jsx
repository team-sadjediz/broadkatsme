import React, { Component } from "react";
import axios from "axios";
// import { axiosConfig, setAuthorization } from "../../firebase/firebase.sdk";

import { BASE_API_URL } from "../../utils";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./room-page.styles.scss";

import Tag from "../../components/tag/tag.component";
import RoomTitle from "../../components/room-title/room-title.component";
import RoomBar from "../../components/room-bar/room-bar.component";
import BrowserOverlay from "../../components/browser-overlay/browser-overlay.component";
import BrowserInit from "../../components/browser-init/browser-init.component";
import RoomSettings from "../../components/room-settings/room-settings.component";
import Divider from "@material-ui/core/Divider";

// import Modal from "@material-ui/core/Modal";

const initialState = {
  isFetching: true,
  exists: false,
  isMouseMoving: false,
  image: null,
  isFavorited: false,
  volume: 50,
  roomName: "",
  ownerID: "",
  showInitial: true,
  showSettings: false,
  subscribers: [],
  tags: []
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
  }

  componentWillUnmount() {
    this.source.cancel("Operations cancelled. Component unmounting.");
  }

  validate = async () => {
    console.log(this.state.exists);
    console.log(this.state.isFetching);
    await axios
      .get(`${BASE_API_URL}/room/valid/${this.props.match.params.id}`, {
        cancelToken: this.source.token
      })
      .then(res => {
        this.setState({ exists: res.data, isFetching: false });
        // console.log(this.state);
        if (this.state.exists) {
          this.fetchData();
        }
      })
      .catch(error => this.setState({ isFetching: false, exists: false }));
    console.log(this.state);
  };

  shouldComponentUpdate(nextProps, nextState) {
    let isFetching = this.state.isFetching !== nextState.isFetching;
    let exists = this.state.exists !== nextState.exists;
    let roomID = this.props.match.params.id !== nextProps.match.params.id;
    let isMouseMoving = this.state.isMouseMoving !== nextState.isMouseMoving;
    let isFavorited = this.state.isFavorited !== nextState.isFavorited;
    let roomName = this.state.roomName !== nextState.roomName;
    let showInitial = this.state.showInitial !== nextState.showInitial;
    let showSettings = this.state.showSettings !== nextState.showSettings;
    let subscribers = this.state.subscribers !== nextState.subscribers;
    let tags = this.state.tags !== nextState.tags;
    return (
      isFetching ||
      exists ||
      roomID ||
      isMouseMoving ||
      isFavorited ||
      roomName ||
      showInitial ||
      showSettings ||
      subscribers ||
      subscribers ||
      tags
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    let roomDetails;
    let isFavorited = this.state.isFavorited;
    await axios
      .get(`${BASE_API_URL}/room/find/${this.props.match.params.id}`, {
        cancelToken: this.source.token
      })
      .then(res => {
        roomDetails = res.data;
        return axios.put(
          `${BASE_API_URL}/userprops/favorites/${this.props.match.params.id}/${this.props.currentUser.uid}`,
          null,
          {
            params: { action: "exists" }
          },
          {
            cancelToken: this.source.token
          }
        );
      })
      .then(res => {
        isFavorited = res.data;
      })
      .catch(error => {
        console.error(error);
      });

    this.setState({
      roomName: roomDetails.name,
      roomID: roomDetails._id,
      ownerID: roomDetails.ownerID,
      subscribers: roomDetails.subscriber,
      tags: roomDetails.tags,
      isFavorited: isFavorited
    });
  };

  closeInit = () => {
    this.setState({ showInitial: false });
  };

  toggleSettingsModal = () => {
    const currentSettingsState = this.state.showSettings;
    this.setState({ showSettings: !currentSettingsState });
  };

  favoriteRoom = async e => {
    let action;
    if (this.state.isFavorited) {
      action = "unfavorite";
    } else {
      action = "favorite";
    }
    await axios
      .put(
        `${BASE_API_URL}/userprops/favorites/${this.props.match.params.id}/${this.props.currentUser.uid}`,
        null,
        {
          params: { action }
        },
        {
          cancelToken: this.source.token
        }
      )
      .then(res => {
        console.log(res.data);
        this.setState({ isFavorited: res.data });
      })
      .catch(error => console.log("not favorited"));
  };

  unsubscribe = async () => {
    await axios
      .put(
        `${BASE_API_URL}/userprops/subscribe/${this.props.match.params.id}/${this.props.currentUser.uid}`,
        null,
        { params: { action: "unsubscribe" } },
        {
          cancelToken: this.source.token
        }
      )
      .then(res =>
        console.log("Unsubscribed from " + this.props.match.params.id)
      )
      .catch(error => console.error(error));
  };

  onChangeTag = tags => {
    this.setState({ tags: tags });
  };

  onChangeTitle = newName => {
    this.setState({ roomName: newName });
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
    // console.log(this.state.exists);
    // console.log(this.state.isFetching);
    if (this.state.isFetching) {
      return <div> LOADING </div>;
    } else {
      if (!this.state.exists) {
        return <Redirect to="/lobby" />;
      } else {
        let tags = this.state.tags.map(tag => {
          return (
            <Tag
              key={tag}
              type="remove"
              text={tag}
              onChangeTag={this.onChangeTag}
              roomID={this.props.match.params.id}
              uid={this.props.currentUser.uid}
            ></Tag>
          );
        });
        let addTag = (
          <Tag
            type="add"
            roomID={this.props.match.params.id}
            onChangeTag={this.onChangeTag}
            uid={this.props.currentUser.uid}
          ></Tag>
        );
        return (
          <div className="main-container">
            {this.state.showSettings ? (
              <div className="room-settings-container">
                <RoomSettings
                  toggleSettingsModal={this.toggleSettingsModal}
                  roomID={this.props.match.params.id}
                  owned={true}
                  tags={tags}
                  addTag={addTag}
                  uid={this.props.currentUser.uid}
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
                  />
                  {/* <RoomBar
                    roomName={this.state.roomName}
                    roomID={this.props.match.params.id}
                    toggleSettingsModal={this.toggleSettingsModal}
                    favoriteRoom={this.favoriteRoom}
                    isFavorited={this.state.isFavorited}
                    onChangeTag={this.onChangeTag}
                    onChangeTitle={this.onChangeTitle}
                    unsubscribe={this.unsubscribe}
                  /> */}
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
                <div className="room-bar-area">
                  <RoomBar
                    toggleSettingsModal={this.toggleSettingsModal}
                    favoriteRoom={this.favoriteRoom}
                    isFavorited={this.state.isFavorited}
                    unsubscribe={this.unsubscribe}
                  />
                </div>
                <div className="room-tags-area">
                  <Divider className="room-tag-divider" variant="fullWidth" />
                  {addTag}
                  {tags}
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  selectedRoom: state.room.selectedRoom
});

const mapDispatchToProps = dispatch => ({
  // setSubscribedRooms: subRoomList => dispatch(setSubscribedRooms(subRoomList)),
  // setSelectedRoom: roomID => dispatch(setSelectedRoom(roomID))
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
