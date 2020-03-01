import React from "react";
// import axios from "axios";

import "./delete-panel.styles.scss";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import DeleteIcon from "@material-ui/icons/Delete";

export default function DeletePanel(props) {
  const [confirm, checkConfirm] = React.useState("");

  const handleChange = e => {
    checkConfirm(e.target.value);
  };

  return (
    <div>
      Delete
      <TextField
        color="secondary"
        type="text"
        label="Confirm Delete"
        onChange={handleChange}
        placeholder="Type Room Name to confirm delete."
        variant="outlined"
        fullWidth={true}
      ></TextField>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        startIcon={<DeleteIcon />}
      >
        DELETE
      </Button>
    </div>
  );
}
