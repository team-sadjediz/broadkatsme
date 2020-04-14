import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import CircleButton from "../circle-btn/circle-btn.component";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

import { updateFriendslist } from "../../redux/user/user.actions";

import { BASE_API_URL } from "../../utils";

import "./add-friend.styles.scss";

const CustomTextField = withStyles((theme) => ({
  root: {
    // marginBottom: 2,
    flexGrow: 1,
    marginRight: "0.5rem",
    position: "relative",
    "& .MuiOutlinedInput-input": {
      borderRadius: "3px",
      backgroundColor: "white",
      padding: "0.6rem",
    },

    "& .MuiInputLabel-root": {
      // transform: "none",
      marginLeft: "0.7rem",
      padding: "0 3px",
      // backgroundColor: "#eceff1",
      position: "absolute",
      top: "30%",
      // top: 0.5,
      // bottom: 0,
      left: 0,
    },

    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      textTransform: "uppercase",
      fontSize: ".9rem",
      // transform: "scale(0.75)",
      transform: "translateY(-120%) scale(0.75)",
      fontWeight: "bold",
    },

    "& .MuiInputLabel-outlined": {
      transform: "none",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      // color: "red",
    },
  },
}))(TextField);

const AddFriend = ({ userAuth, updateFriendslist, className }) => {
  const [friendID, setFriendID] = useState("");

  const handleChange = (event) => {
    setFriendID(event.target.value);
  };

  const handleSubmit = (event) => {
    axios
      .put(`${BASE_API_URL}/friends/update/${userAuth.uid}/${friendID}`, null, {
        params: { action: "add" },
      })
      .then((res) => {
        updateFriendslist(userAuth.uid);
        setFriendID("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   // same as componentDidMount() (not really but sorta; read up on this)
  // }, []);

  return (
    <div className={`add-friend-container ${className}`}>
      {/* <CustomTextField
            id="filled-multiline-flexible"
            // className="grow-more"
            label="Friend's Username"
            // multiline
            rowsMax="4"
            // value={message}
            // onChange={handleChange}
            // onKeyPress={handleKeyPress}
            variant="filled"
          /> */}

      <CustomTextField
        id="outlined-basic"
        label="Friend's Username"
        variant="outlined"
        value={friendID}
        onChange={handleChange}
      />
      <CircleButton
        id="add-friend-btn"
        icon={<PersonAddIcon />}
        onClick={handleSubmit}
      />
    </div>

    // <div>
    //   <TextField
    //     required
    //     id="filled-required"
    //     label="Add a friend (userID)"
    //     variant="filled"
    //     value={friendID}
    //     onChange={handleChange}
    //   />
    //   <Button variant="contained" color="primary" >
    //     Add Friend
    //   </Button>
    // </div>
  );
};

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
});

const mapDispatchToProps = (dispatch) => ({
  updateFriendslist: (subRoomList) => dispatch(updateFriendslist(subRoomList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFriend);
