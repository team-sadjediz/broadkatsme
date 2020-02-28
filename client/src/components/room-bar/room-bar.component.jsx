import React, { Component } from "react";

import "./room-bar.style.scss";

import { ReactComponent as RefreshIcon } from "../../assets/icons/refresh.svg";
import { ReactComponent as MoreIcon } from "../../assets/icons/three-dots.svg";
import { ReactComponent as FavoriteIcon } from "../../assets/icons/heart.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/cog.svg";

import Tag from "../tag/tag.component";
import CircleBtn from "../circle-btn/circle-btn.component";

class RoomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: this.props.roomID,
      showTags: false,
      showOptions: false
    };
  }

  render() {
    // let tags = this.props.tags.map(tag => {
    //   return (
    //     <Tag
    //       className="room-tag"
    //       type="remove"
    //       text={tag}
    //       onChangeTag={this.props.onChangeTag}
    //       roomID={this.state.roomID}
    //     />
    //   );
    // });
    console.log(this.state.roomID);
    let options = (
      <div className="more-buttons">
        <CircleBtn
          className={this.props.isFavorited ? "active-btn" : "room-bar-btn"}
          onClick={this.props.favoriteRoom}
          icon={<FavoriteIcon />}
        />
        <CircleBtn
          className="room-bar-btn"
          onClick={this.props.toggleSettingsModal}
          icon={<SettingsIcon />}
        />
      </div>
    );

    return (
      <div className="room-bar">
        <input
          className="room-name"
          type="text"
          value={this.props.roomName}
          onChange={this.props.onChangeTitle}
          // placeholder={this.props.roomName}
          // onkeypress="this.style.width = ((this.value.length + 1) * 8) + 'px';"
        />
        {/* <div
          className="room-name"
          // onClick={() => this.setState({ showTags: !this.state.showTags })}
          //   onMouseMove={() => this.setState({ showTags: true })}
          //   onMouseLeave={() => this.setState({ showTags: false })}
        >
          {this.props.roomName}
        </div> */}
        {/* {this.state.showTags ? <div className="room-tags">{tags}</div> : null} */}
        <CircleBtn
          className="refresh-button room-bar-btn"
          icon={<RefreshIcon />}
        />
        <CircleBtn
          onClick={() =>
            this.setState({ showOptions: !this.state.showOptions })
          }
          className="more-button room-bar-btn"
          icon={<MoreIcon />}
        />
        {this.state.showOptions ? options : null}
      </div>
    );
  }
}

export default RoomBar;
