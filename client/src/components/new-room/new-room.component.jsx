import React from "react";
import axios from "axios";
// import { auth } from "../../firebase/firebase.utils";

// redux:
import { connect } from "react-redux";
import { setSubscribedRooms } from "../../redux/room/room.actions";

// components:
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./new-room.style.scss";

// utils:
import { BASE_API_URL } from "../../utils";

class NewRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      roomName: "",
      tags: "",
      roomSize: "",
      privacy: "true"
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    // const room = {
    //   uid: this.props.currentUser.uid,
    //   room_name: this.state.room_name,
    //   tags: this.state.tags,
    //   room_size: this.state.room_size,
    //   privacy: this.state.privacy
    // };

    // axios
    //   .post(`${utils.BASE_API_URL}/room/createroom`, room)
    //   .then(() => console.log("Room posted to backend/created."))
    //   .catch(error => {
    //     console.error(error);
    //   });

    const room = {
      uid: this.props.currentUser.uid,
      roomName: this.state.roomName,
      tags: this.state.tags,
      roomSize: this.state.roomSize,
      privacy: this.state.privacy
    };

    console.log(room);

    axios
      .post(`${utils.BASE_API_URL}/room/create-room`, room)
      .then(() => console.log("Room posted to backend/created."))
      .catch(error => {
        console.error(error);
      });

    this.setState({
      roomName: "",
      tags: "",
      roomSize: "",
      privacy: ""
    });
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="newroom-container">
        <div className="header">Create Room</div>
        <form className="form-container" onSubmit={this.handleSubmit}>
          <FormInput
            className="room-title"
            name="roomName"
            handleChange={this.handleChange}
            value={this.state.roomName}
            label="room title"
            required
          />

          <FormInput
            className="room-size"
            name="roomSize"
            handleChange={this.handleChange}
            value={this.state.roomSize}
            label="room size"
            type="number"
            min="1"
            max="5"
            required
          />

          <div className="privacy">
            <label for="privacy">Privacy</label>
            <select
              value={this.state.privacy}
              onChange={this.handleChange}
              name="privacy"
              id="privacy"
            >
              <option value="true">Invite Only</option>
              <option value="false">Open Room</option>
            </select>
          </div>

          <CustomButton className="new-room-btn" type="submit">
            Create Room
          </CustomButton>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setSubscribedRooms: subscribedRoomList =>
    dispatch(setSubscribedRooms(subscribedRoomList))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRoom);
