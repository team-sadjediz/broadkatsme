import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";

import { BASE_API_URL } from "../../../utils";

import "./general-panel.styles.scss";

import Divider from "@material-ui/core/Divider";
// import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { Redshift } from "aws-sdk";

const useStyles = theme => ({
  iconButton: {
    padding: 0,
    height: 50,
    width: 50,
    "&s svg": {
      height: 40,
      width: 40
    }
  }
});

class GeneralPanel extends Component {
  constructor(props) {
    super(props);
    this.state = { thumbnailUrl: props.thumbnailUrl };
  }

  fileUploadHandler = async files => {
    const formData = new FormData();
    formData.append("image", files);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    await axios
      .put(
        `${BASE_API_URL}/room/upload-thumbnail/${this.props.roomID}/${this.props.ownerID}`,
        formData,
        config
      )
      .then(res => {
        console.log("???" + res.data);
        this.props.onChangeThumbnail(res.data);
        this.setState({ thumbnailUrl: res.data });
      })
      .catch(error => console.error(error));
  };

  onChange = async e => {
    this.fileUploadHandler(e.target.files[0]);
    e.target.value = null;
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="room-general-panel">
        <div className="room-general-panel-title">General</div>
        <Divider variant="fullWidth" />
        <div className="room-general">
          <form className="room-general-upload-btn">
            <label htmlFor="upload" for="upload">
              <IconButton
                className={classes.iconButton}
                color="primary"
                component="span"
              >
                <AddAPhotoIcon></AddAPhotoIcon>
              </IconButton>
            </label>
            <input
              type="file"
              id="upload"
              name="roompic"
              accept="image/png, image/jpeg"
              onChange={this.onChange}
            ></input>
          </form>
          <div className="room-general-upload">
            <img
              src={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=${
                this.state.thumbnailUrl
              }&?${new Date().getTime()}`}
              alt="Thumbnail"
            />
          </div>
          <div className="room-general-info">
            <div className="room-general-info-name">
              <div className="room-general-title">Room</div>
              <input
                type="text"
                placeholder={this.props.name}
                onChange={this.props.onChangeTitle}
                onBlur={this.props.onBlurTitle}
              />
            </div>
            <Divider variant="fullWidth" />
            <div className="room-general-info-owned-by">
              <div className="room-general-title">Owner</div>
              <div className="room-general-description">{this.props.owner}</div>
            </div>
            <Divider variant="fullWidth" />
            <div className="room-general-info-tags">
              {this.props.addTag}
              {this.props.tags}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(GeneralPanel);
