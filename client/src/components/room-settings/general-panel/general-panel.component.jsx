import React from "react";
import axios from "axios";

import { BASE_API_URL } from "../../../utils";

import "./general-panel.styles.scss";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

export default function GeneralPanel(props) {
  const [file, setFile] = React.useState(null);

  const fileUploadHandler = async () => {
    const formData = new FormData();
    formData.append("image", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    await axios
      .put(`${BASE_API_URL}/room/upload-thumbnail`, formData, config)
      .then(res => console.log("shouldve worked"))
      .catch(error => console.log("fuck"));
  };

  const onChange = async e => {
    await setFile(e.target.files[0]).then(() => fileUploadHandler());
  };

  return (
    <div className="room-general-panel">
      General
      <div className="room-general">
        <form className="room-general-upload-btn">
          <label htmlFor="upload">
            <AddAPhotoIcon></AddAPhotoIcon>
          </label>
          <input
            className="room-hide"
            type="file"
            id="upload"
            name="roompic"
            onChange={onChange}
          ></input>
        </form>
        <div className="room-general-upload">
          <img
            src={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=${props.thumbnailUrl}`}
          />
        </div>
        <div className="room-general-info">
          <div className="room-general-info-name">
            Room Name:
            <input
              type="text"
              value={props.name}
              // value={this.props.roomName}
              // onChange={this.props.onChangeTitle}
            />
          </div>
          <div className="room-general-info-owned-by">
            Owned by... <br />
            {props.owner}
          </div>
          <div className="room-general-info-tags">{props.tags}</div>
        </div>
      </div>
    </div>
  );
}
