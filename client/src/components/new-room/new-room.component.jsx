import React from "react";

// import FormInput from "../form-input/form-input.component";
// import CustomButton from "../custom-button/custom-button.component";

import { ReactComponent as LeftArrowIcon } from "../../assets/icons/caret-left-solid.svg";
import { ReactComponent as RightArrowIcon } from "../../assets/icons/caret-right-solid.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus-solid.svg";

import "./new-room.style.scss";

const NewRoom = () => (
  <div className="newroom-container">
    <div className="header gap">Create Room</div>

    {/* <div className="room-title">sdfsdfdsf</div> */}

    {/* <FormInput
      className="room-title gap"
      name="room-title"
      type="email"
      label="room title"
      value=""
      required
    /> */}
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
    </div>
    {/* <CustomButton className="new-room-btn">Create Room</CustomButton> */}
  </div>
);

export default NewRoom;
