import React from "react";
import axios from "axios";
// import { auth } from "../../firebase/firebase.utils";

// redux:
import { connect } from "react-redux";

// components:
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./new-room.style.scss";

// utils:
const utils = require("../../utils");

class NewRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      room_name: "",
      tags: "",
      room_size: "",
      privacy: "true"
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const room = {
      uid: this.props.currentUser.uid,
      room_name: this.state.room_name,
      tags: this.state.tags,
      room_size: this.state.room_size,
      privacy: this.state.privacy
    };

    axios
      .post(`${utils.BASE_API_URL}/room/createroom`, room)
      .then(() => console.log("Room posted to backend/created."))
      .catch(error => {
        console.error(error);
      });

    this.setState({
      room_name: "",
      tags: "",
      room_size: "",
      privacy: ""
    });
  };

  handleChange = event => {
    const { value, name } = event.target;
    console.log("a:", name, value);
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="newroom-container">
        <div className="header">Create Room</div>
        <form className="form-container" onSubmit={this.handleSubmit}>
          <FormInput
            className="room-title"
            name="room_name"
            handleChange={this.handleChange}
            value={this.state.room_name}
            label="room title"
            required
          />

          <FormInput
            className="room-size"
            name="room_size"
            handleChange={this.handleChange}
            value={this.state.room_size}
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

export default connect(mapStateToProps)(NewRoom);
