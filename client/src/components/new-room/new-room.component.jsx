import React from "react";
import axios from "axios";
// import { auth } from "../../firebase/firebase.utils";

// redux:
import { connect } from "react-redux";
// import { setSubscribedRooms } from "../../redux/room/room.actions";
import { updateUserProps } from "../../redux/user/user.actions";

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

    const room = {
      uid: this.props.userAuth.uid,
      roomName: this.state.roomName,
      tags: this.state.tags,
      roomSize: this.state.roomSize,
      privacy: this.state.privacy
    };

    console.log(room);

    axios
      .post(`${BASE_API_URL}/room/create-room`, room)
      .then(async res => {
        console.log("Room posted for user:", this.props.userAuth.uid);
        // let results = await axios.get(`${BASE_API_URL}/userprops/users-rooms`, {
        //   params: { uid: this.props.currentUser.uid }
        // });
        // this.props.setSubscribedRooms(results.data);

        this.props.updateUserProps(this.props.userAuth.uid);
      })
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
  userAuth: state.user.userAuth
});

const mapDispatchToProps = dispatch => ({
  updateUserProps: uid => dispatch(updateUserProps(uid))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRoom);
