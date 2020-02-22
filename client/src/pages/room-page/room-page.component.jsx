import React, { Component } from "react";
import axios from "axios";

import "./room-page.styles.scss";

const initialState = {
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
      //   .get("http://broadkatsme.herokuapp.com/api/room/findroom", roomID)
      .get("http://localhost:5000/api/room/findroom", {
        params: roomID
      })
      .then(res => this.fetchData(res.data))
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

  exit = () => {
    const home = "/";
    this.props.history.push(home);
  };

  render() {
    return (
      <div className="room-page">
        {/* Room Page & state = {this.state} */}
        <div className="room-bar">Title, Buttons, etc.</div>
        <div className="room-screen">Room Screen</div>
      </div>
    );
  }
}

export default RoomPage;
