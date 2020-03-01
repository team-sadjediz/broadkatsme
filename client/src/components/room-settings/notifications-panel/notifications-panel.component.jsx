import React from "react";
// import axios from "axios";

import Switch from "@material-ui/core/Switch";
import Divider from "@material-ui/core/Divider";

import "./notifications-panel.styles.scss";

export default function NotificationsPanel(props) {
  const [state, setState] = React.useState({
    allowNotifications: props.allowNotifications
  });

  const handleSwitch = name => e => {
    setState({ ...state, [name]: e.target.checked });
  };

  return (
    <div>
      <div className="room-notifications-panel-title">Notifications</div>
      <Divider variant="fullWidth" />
      <div className="room-notifications-panel-allow">
        <div className="room-notifications-panel-allow-title">
          Receive Notifications
        </div>
        <div className="room-notifications-panel-allow-description">
          Receive notifications from room.
        </div>
        <Switch
          className="room-notifications-panel-allow-button"
          checked={state.allowNotifications}
          onChange={handleSwitch("allowNotifications")}
          value="privacy"
          color="primary"
        ></Switch>
      </div>
      <Divider variant="fullWidth" />
    </div>
  );
}
