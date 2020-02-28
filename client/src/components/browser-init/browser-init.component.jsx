import React from "react";

import Tag from "../../components/tag/tag.component";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

import "./browser-init.style.scss";

export default function BrowserInit(props) {
  const handleChange = () => {
    // some axios call to change room title in the db
  };
  // onClick={props.closeInit}
  return (
    <div className="browser-init-container">
      {/* <PlayCircleFilledIcon /> */}
      {/* <div className="browser-init-bar"> */}
      {/* <Tag type="add"></Tag> */}
      <PlayCircleFilledIcon />
      {/* </div> */}
    </div>
  );
}
