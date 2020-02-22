import React, { Component } from "react";

import "./tag.style.scss";

import { ReactComponent as PlusIcon } from "../../assets/icons/plus-solid.svg";
import { ReactComponent as MinusIcon } from "../../assets/icons/minus.svg";

// If type = add -> onClick = addOnClick, icon = addIcon
// If type = remove -> onClick = removeOnClick, icon = removeIcon
// If type = other -> onClick = onClick, icon = icon
class Tag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.type,
      input: null
    };
  }

  addOnClick = e => {
    e.preventDefault();
    console.log("added");
    return "Add";
    //add to db
  };

  removeOnClick = text => {
    console.log("removed");
    return "Remove";
    //remove from db
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
              onChange={this.handleChange}
            ></input>
          </form>
        </div>
      );
    } else if (this.state.type === "remove") {
      return (
        <div
          className={`tag-properties ${
            this.props.className ? this.props.className : ""
          }`}
        >
          <div className="tag-properties-minus">
            <div
              onClick={this.removeOnClick(this.props.text)}
              className="tag-button"
            >
              <MinusIcon />
            </div>
            <div className="tag-label">{this.props.text}</div>
          </div>
        </div>
      );
    }
  }
}

export default Tag;
