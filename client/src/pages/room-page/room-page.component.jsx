import React, { Component } from "react";
import axios from "axios";

import { connect } from "react-redux";

import "./room-page.styles.scss";

import Tag from "../../components/tag/tag.component";
import RoomBar from "../../components/room-bar/room-bar.component";

const initialState = {
  isMouseMoving: false,
  image: null,
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
  }

  async componentDidMount() {
    // const roomID = this.state.roomID;
    const roomID = { "roomID": "5e4a4c5a86ae580017aa1a78" };
    console.log(roomID);

    await axios
      //   .get("http://broadkatsme.herokuapp.com/api/room/findroom", {
      //     params: roomID
      //   })
      .get("http://localhost:5000/api/room/findroom", {
        params: roomID
      })
      .then(
        res => this.fetchData(res.data)
        // console.log(res.data)
      )
      .catch(error => {
        console.error(error);
      });
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
      // the whole thing (but bad take in case we change it in the backend)
      //   settings: {
      //     roomSize: roomDetails.settings.room_size,
      //     private: roomDetails.settings.private,
      //     access: {
      //       delete: roomDetails.settings.access.delete,
      //       roomAdmins: roomDetails.settings.access.roomAdmins,
      //       operators: roomDetails.settings.access.operator,
      //       invitations: roomDetails.settings.access.invitation,
      //       banneds: roomDetails.settings.access.banned
      //     }
      //   }
    });
    console.log(this.state);
  };

  closeInitialModal = () => {
    this.setState({ showInitial: false });
  };

  toggleSettingsModal = () => {
    const currentSettingsState = this.state.showSettings;
    this.setState({ showSettings: !currentSettingsState });
  };

  favoriteRoom = e => {
    //
  };

  exit = () => {
    const home = "/";
    this.props.history.push(home);
  };

  favoriteRoom = e => {};

  handleMouseMove = e => {
    e.preventDefault();
    this.setState({ isMouseMoving: true });
    let timer;
    (() => {
      clearTimeout(timer);
      timer = setTimeout(() => this.setState({ isMouseMoving: false }), 3000);
    })();
  };

  render() {
    // console.log(this.state);
    return (
      <div className="room-page">
        {this.props.currentUser.uid}
        {/* Room Page {this.state.roomID} {this.state.roomName}
        {this.state.subscribers[0]} {this.state.tags}
        {this.state.settings.roomSize} {this.state.settings.access.roomAdmins} */}
        {/* <div>
          Tag Examples
          <Tag type="add" />
          <Tag type="remove" text="Youtube" />
        </div> */}
        <div className="room-bar-area">
          {/* RoomBar w/Dynamic tags */}
          <RoomBar
            roomName={this.state.roomName}
            tags={this.state.tags}
            toggleSettingsModal={this.toggleSettingsModal}
            favoriteRoom={this.favoriteRoom}
          />
        </div>
        <div
          className="room-screen-area"
          onMouseMove={e => this.handleMouseMove(e)}
        >
          Room Screen
          {this.state.isMouseMoving ? (
            <div className="temp">VolumeControl</div>
          ) : (
            <div className="temp2" />
          )}
        </div>{" "}
        <img
          src={
            "http://localhost:5000/api/room/get-thumbnail?thumbnail_url=default1.png"
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(RoomPage);
