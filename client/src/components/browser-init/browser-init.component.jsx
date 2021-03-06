import React from "react";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

import "./browser-init.style.scss";

export default function BrowserInit(props) {
  return (
    <div className="browser-init-container">
      <PlayCircleFilledIcon
        onClick={() => {
          console.log("hello");
          props.closeInit();
          props.requestVb();
        }}
      />
    </div>
  );
}
