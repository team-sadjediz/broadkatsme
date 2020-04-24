import React, { useState, useEffect } from "react";
import axios from "axios";
// import { auth } from "../../firebase/firebase.utils";

// redux:
import { connect } from "react-redux";
import {
  setSubscribedRooms,
  updateSubscribedRooms,
} from "../../redux/room/room.actions";

// components:
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./new-room.style.scss";

// utils:
import { BASE_API_URL } from "../../utils";

const NewRoom = ({
  onClick,
  userAuth,
  updateSubscribedRooms,

  // Poppity and Modal has 'closeComponent' defined
  // call this appropriately in your component
  // such as after you click on a button
  closeComponent = () => {
    return;
  },
  ...otherProps
}) => {
  const [roomName, setRoomName] = useState("");
  const [tags, setTags] = useState("");
  const [roomSize, setRoomSize] = useState(1);
  const [privacy, setPrivacy] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const room = {
      uid: userAuth.uid,
      roomName: roomName,
      tags: tags,
      roomSize: roomSize,
      privacy: privacy,
    };

    await axios
      .post(`${BASE_API_URL}/room/create`, room)
      .then(async (res) => {
        console.log("Room posted for user:", userAuth.uid);
        updateSubscribedRooms(userAuth.uid);
        closeComponent();
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  return (
    <div className="newroom-container">
      <div className="header">Create Room</div>
      <form className="form-container">
        <FormInput
          className="new-room-title field-spacing-bottom"
          name="roomName"
          handleChange={(e) => {
            setRoomName(e.target.value);
          }}
          value={roomName}
          label="room title"
          required
        />

        <FormInput
          className="new-room-size field-spacing-bottom"
          name="roomSize"
          handleChange={(e) => {
            setRoomSize(e.target.value);
          }}
          value={roomSize}
          label="room size"
          type="number"
          min="1"
          max="5"
          required
        />

        <div className="privacy field-spacing-bottom">
          <label htmlFor="privacy">Privacy</label>
          <select
            value={privacy}
            onChange={(e) => {
              setPrivacy(e.target.value);
            }}
            name="privacy"
            id="privacy"
          >
            <option value="true">Invite Only</option>
            <option value="false">Open Room</option>
          </select>
        </div>

        <CustomButton className="new-room-btn" onClick={handleSubmit}>
          Create Room
        </CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
});

const mapDispatchToProps = (dispatch) => ({
  updateSubscribedRooms: (uid) => dispatch(updateSubscribedRooms(uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewRoom);
