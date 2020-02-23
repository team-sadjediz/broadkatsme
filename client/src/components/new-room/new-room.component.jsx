import React from "react";
import axios from "axios";
import { auth } from "../../firebase/firebase.utils";

// redux:
import { connect } from "react-redux";

// components:
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

// icons:
import { ReactComponent as LeftArrowIcon } from "../../assets/icons/caret-left-solid.svg";
import { ReactComponent as RightArrowIcon } from "../../assets/icons/caret-right-solid.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus-solid.svg";

import "./new-room.style.scss";

class NewRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      room_name: "",
      tags: "",
      room_size: "",
      privacy: ""
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
      .post("http://broadkatsme.herokuapp.com/api/room/createroom", room)
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
        <div className="header gap">Create Room</div>

        {/* <div className="room-title">sdfsdfdsf</div> */}
        <form className="form-container" onSubmit={this.handleSubmit}>
          <FormInput
            className="room-title gap"
            name="room_name"
            handleChange={this.handleChange}
            value={this.state.room_name}
            label="room title"
            required
          />

          <FormInput
            className="room-title gap"
            name="tags"
            handleChange={this.handleChange}
            value={this.state.tags}
            label="tags"
            required
          />

          <FormInput
            className="room-title gap"
            name="room_size"
            handleChange={this.handleChange}
            value={this.state.room_size}
            label="room size"
            required
          />

          <FormInput
            className="room-title gap"
            name="privacy"
            handleChange={this.handleChange}
            value={this.state.privacy}
            label="privacy"
            required
          />
          {/* 
          <div className="tags-container gap">Add Tags</div>
          <div className="toggle-container">
            <PlusIcon />
            <div className="values">nsfw</div>
          </div>

          <div className="settings gap">Privacy</div>
          <div className="toggle-container">
            <LeftArrowIcon />
            <div className="values">Private</div>
            <RightArrowIcon />
          </div>

          <div className="settings gap">Room Type</div>
          <div className="toggle-container">
            <LeftArrowIcon />
            <div className="values">Theatre</div>
            <RightArrowIcon />
          </div> */}

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
