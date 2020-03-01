import React from "react";
// import axios from "axios";

import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";

import "./settings-panel.styles.scss";

export default function SettingsPanel(props) {
  return (
    <div>
      Settings
      <div>
        {/* Privacy */}
        {/* <RoomSettingsCard
          title="Privacy"
          description="Allow only friends and invited individuals to join the room."
        ></RoomSettingsCard> */}
      </div>
      <div>
        {/* Room Size */}
        {/* <RoomSettingsCard
          title="Room Size"
          description="Set the limit of allowed individuals in this room."
        ></RoomSettingsCard> */}
      </div>
    </div>
  );
}
