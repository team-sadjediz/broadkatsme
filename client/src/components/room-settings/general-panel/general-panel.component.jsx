import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

import { BASE_API_URL } from "../../../utils";

import "./general-panel.styles.scss";

import Divider from "@material-ui/core/Divider";
// import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

const useStyles = makeStyles(theme => ({
  iconButton: {
    padding: 0,
    height: 50,
    width: 50,
    "&s svg": {
      height: 40,
      width: 40
    }
  }
}));

export default function GeneralPanel(props) {
  const classes = useStyles();
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
      <div className="room-general-panel-title">General</div>
      <Divider variant="fullWidth" />
      <div className="room-general">
        <form className="room-general-upload-btn">
          <label htmlFor="upload">
            <IconButton className={classes.iconButton} color="primary">
              <AddAPhotoIcon></AddAPhotoIcon>
            </IconButton>
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
            alt="Thumbnail"
          />
        </div>
        <div className="room-general-info">
          <div className="room-general-info-name">
            <div className="room-general-title">Room</div>
            <input
              type="text"
              value={props.name}
              // value={this.props.roomName}
              // onChange={this.props.onChangeTitle}
            />
          </div>
          <Divider variant="fullWidth" />
          <div className="room-general-info-owned-by">
            <div className="room-general-title">Owner</div>
            <div className="room-general-description">{props.owner}</div>
          </div>
          <Divider variant="fullWidth" />
          <div className="room-general-info-tags">
            {props.addTag}
            {props.tags}
          </div>
        </div>
      </div>
    </div>
  );
}
