import React, { Component } from "react";
import axios from "axios";

import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";

import "./tag.style.scss";

import { ReactComponent as PlusIcon } from "../../assets/icons/plus-solid.svg";
import { ReactComponent as MinusIcon } from "../../assets/icons/minus.svg";

// If type = add -> onClick = addOnClick, icon = addIcon
// If type = remove -> onClick = removeOnClick, icon = removeIcon
// REQUIRED PROPS: RoomID, text (if type == remove), onChangeTag
// onChangeTag is a function from the parent tag (if you remove a tag, you want to setState to change which tags are being displayed)

// const useStyles = makeStyles(theme => ({ root: { color: } }));
class Tag extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.roomID);
    this.state = {
      type: this.props.type,
      roomID: this.props.roomID,
      input: null
    };
  }

  addOnClick = e => {
    e.preventDefault();
    let tag = this.state.input;
    let roomID = this.state.roomID;
    let request = { "new_tag": tag, "room_ID": roomID };
    axios
      .put("http://localhost:5000/api/room/add-tags", request)
      .then(res => this.props.onChangeTag(res.data))
      .catch(error => console.error(error));
  };

  removeOnClick = e => {
    e.preventDefault();
    let tag = this.props.text;
    let roomID = this.state.roomID;
    let request = { "del_tag": tag, "room_ID": roomID };
    console.log("removing " + tag);
    axios
      .put("http://localhost:5000/api/room/remove-tags", request)
      .then(res => this.props.onChangeTag(res.data))
      .catch(error => console.error(error));
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    if (this.state.type === "add") {
      return (
        <div
          className={`tag-properties ${
            this.props.className ? this.props.className : ""
          }`}
        >
          <form onSubmit={this.addOnClick}>
            {/* <div onClick={addOnClick()} className="tag-button">
              <PlusIcon />
            </div> */}
            <button className="tag-button" type="submit">
              <PlusIcon />
            </button>
            <input
              type="text"
              maxlength="8"
              value={this.state.input}
              required
              onChange={this.handleChange}
            ></input>
          </form>
        </div>
      );
    } else if (this.state.type === "remove") {
      return (
        // <div
        //   className={`tag-properties ${
        //     this.props.className ? this.props.className : ""
        //   }`}
        // >
        //   <div className="tag-properties-minus">
        //     <div onClick={this.removeOnClick} className="tag-button">
        //       <MinusIcon />
        //     </div>
        //     <div className="tag-label">{this.props.text}</div>
        //   </div>
        // </div>
        <Chip
          color="primary"
          onDelete={this.removeOnClick}
          label={this.props.text}
        />
      );
    }
  }
}

export default Tag;
