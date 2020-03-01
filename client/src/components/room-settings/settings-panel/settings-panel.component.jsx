import React from "react";
// import axios from "axios";

import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import "./settings-panel.styles.scss";

export default function SettingsPanel(props) {
  const [state, setState] = React.useState({
    privacy: props.privacy,
    size: props.size
  });

  const handlePrivacy = e => {
    setState({ ...state, privacy: e.target.checked });
  };

  const handleSize = e => {
    setState({ ...state, size: e.target.value });
  };
  return (
    <div>
      Settings
      <div className="room-settings-panel-privacy">
        <div className="room-settings-panel-privacy-title">Privacy</div>
        <div className="room-settings-panel-privacy-description">
          Allow only friends and invited individuals to join the room.
        </div>
        <Switch
          className="room-settings-panel-privacy-button"
          checked={state.privacy}
          onChange={handlePrivacy}
          value="privacy"
          color="primary"
        ></Switch>
      </div>
      <div className="room-settings-panel-size">
        <div className="room-settings-panel-size-title">Room Size</div>
        <div className="room-settings-panel-size-description">
          Set the limit of allowed individuals in this room.
        </div>
        <Select
          className="room-settings-panel-size-button"
          value={state.size}
          onChange={handleSize}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </div>
    </div>
  );
}
