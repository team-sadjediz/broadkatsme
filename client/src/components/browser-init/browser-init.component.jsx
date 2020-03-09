import React from "react";

import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

import "./browser-init.style.scss";

export default function BrowserInit(props) {
  // const handleChange = () => {
  //   // some axios call to change room title in the db
  // };
  // onClick={props.closeInit}
  return (
    <div className="browser-init-container">
      {/* <PlayCircleFilledIcon /> */}
      {/* <div className="browser-init-bar"> */}
      {/* <Tag type="add"></Tag> */}
      <PlayCircleFilledIcon onClick={props.closeInit} />
      {/* </div> */}
    </div>
  );
}
