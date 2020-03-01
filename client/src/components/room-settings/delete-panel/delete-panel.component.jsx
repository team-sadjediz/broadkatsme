import React from "react";
// import axios from "axios";

import "./delete-panel.styles.scss";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 15,
    width: "100%"
  }
}));

export default function DeletePanel(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    confirm: false,
    roomName: ""
  });

  const handleChange = e => {
    if (e.target.value === props.roomName) {
      setState({ roomName: e.target.value, confirm: true });
    } else {
      setState({ roomName: e.target.value, confirm: false });
    }
  };

  return (
    <div>
      <div className="delete-panel-title">Delete</div>
      <Divider variant="fullWidth" />
      <div className="delete-panel-contents">
        <div className="delete-panel-contents-title">Delete Room</div>
        <div className="delete-panel-contents-description">
          Type your room name to delete.
        </div>
        <TextField
          color="secondary"
          type="text"
          label="Confirm Delete"
          onChange={handleChange}
          placeholder="Type Room Name to confirm delete."
          variant="outlined"
          fullWidth={true}
        ></TextField>
        {state.confirm ? (
          <Button
            className={classes.root}
            // className="delete-panel-button"
            variant="contained"
            color="secondary"
            size="large"
            startIcon={<DeleteIcon />}
          >
            DELETE
          </Button>
        ) : null}
      </div>
      <Divider variant="fullWidth" />
    </div>
  );
}
