import React, { Component } from "react";
import axios from "axios";

import Chip from "@material-ui/core/Chip";
import {
  makeStyles,
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";

import "./tag.style.scss";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus-solid.svg";
import { ReactComponent as MinusIcon } from "../../assets/icons/minus.svg";

// If type = add -> onClick = addOnClick, icon = addIcon
// If type = remove -> onClick = removeOnClick, icon = removeIcon
// REQUIRED PROPS: RoomID, text (if type == remove), onChangeTag
// onChangeTag is a function from the parent tag (if you remove a tag, you want to setState to change which tags are being displayed)

const useStyles = theme => ({
  root: {
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 3,
    fontSize: "1rem",
    // fontWeight: "bold",
    color: "#3a4660",
    background: "#fff",
    "& svg": {
      fill: "#3a4660 !important"
    },
    "&:hover": {
      color: "#fff",
      background: "#ef5350",
      "& svg": {
        fill: "#fff !important"
      }
    },
    "&:focus": {
      backgroundColor: "#ef5350 !important",
      "& svg": {
        fill: "#fff !important"
      }
    }
  },
  input: {
    width: "4em",
    outline: "none",
    border: "none",
    backgroundColor: "transparent",
    fontFamily:
      "Karla, Roboto, sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI",
    fontSize: "1rem",
    "&:focus": {
      backgroundColor: "#ef5350 !important",
      "& svg": {
        fill: "#fff !important"
      }
    }
  },
  svg: {
    fill: "#3a4660 !important"
  },
  add: {
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 3,
    background: "#fff",
    "&:hover": {
      color: "#fff",
      background: "#ef5350",
      "& svg": {
        fill: "#fff !important"
      }
    }
  },
  label: {
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 3,
    fontSize: "1rem",
    // fontWeight: "bold",
    background: "#3a4660",
    color: "#fff",
    "&:hover": {
      color: "#fff",
      background: "#ef5350"
    }
  }
});

const themeTag = createMuiTheme({
  overrides: {
    MuiChip: {
      "&:active": {
        backgroundColor: "green"
      }
    }
  }
});
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
    console.log(this.state.input);
    let tag = this.state.input;
    let roomID = this.state.roomID;

    console.log("adding " + tag);
    console.log("to " + roomID);
    let request = { "new_tag": tag, "room_ID": roomID };
    axios
      // .put("http://localhost:5000/api/room/add-tags", request)
      .put("http://broadkatsme.herokuapp.com/api/room/add-tags", request)
      .then(res => {
        this.props.onChangeTag(res.data);
        this.setState({ input: "" });
      })
      .catch(error => console.error(error));
  };

  removeOnClick = e => {
    e.preventDefault();
    let tag = this.props.text;
    let roomID = this.state.roomID;
    let request = { "del_tag": tag, "room_ID": roomID };
    console.log("removing " + tag);
    axios
      // .put("http://localhost:5000/api/room/remove-tags", request)
      .put("http://broadkatsme.herokuapp.com/api/room/remove-tags", request)
      .then(res => this.props.onChangeTag(res.data))
      .catch(error => console.error(error));
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    const { classes } = this.props;
    if (this.state.type === "add") {
      return (
        <Chip
          className={classes.add}
          label={
            <input
              className={classes.input}
              // className="tag-add-input"
              id="add-tag"
              type="text"
              value={this.state.input}
              onChange={this.handleChange}
              placeholder="Add tag"
            />
          }
          // onDelete={null}
          // onDelete={this.addOnClick}
          // deleteIcon={
          //   <AddCircleIcon onClick={this.addOnClick} className={classes.svg} />
          // }
          icon={
            <AddCircleIcon onClick={this.addOnClick} className={classes.svg} />
          }
        ></Chip>
        // <div
        //   className={`tag-properties ${
        //     this.props.className ? this.props.className : ""
        //   }`}
        // >
        //   <form onSubmit={this.addOnClick}>
        //     {/* <div onClick={addOnClick()} className="tag-button">
        //       <PlusIcon />
        //     </div> */}
        //     <button className="tag-button" type="submit">
        //       <PlusIcon />
        //     </button>
        //     <input
        //       type="text"
        //       maxlength="8"
        //       value={this.state.input}
        //       required
        //       onChange={this.handleChange}
        //     ></input>
        //   </form>
        // </div>
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
          // do an if check to see if they have the permissions and if not, disable
          // disabled
          className={classes.root}
          onDelete={this.removeOnClick}
          label={this.props.text}
        />
      );
    } else if (this.state.type === "label") {
      return <Chip className={classes.label} label={this.props.text} />;
    }
  }
}

export default withStyles(useStyles)(Tag);
// const StyledTags = withStyles(useStyles)(Tag);
// export default (
//   <MuiThemeProvider theme={themeTag}>
//     {withStyles(useStyles)(Tag)}
//   </MuiThemeProvider>
// );
