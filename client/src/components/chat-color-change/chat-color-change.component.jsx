import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "../../utils";
import { BlockPicker } from "react-color";

import CustomButton from "../custom-button/custom-button.component";

// mui components:
import Button from "@material-ui/core/Button";

// custom style sheet:
import "./chat-color-change.styles.scss";
import { updateCurrentUser } from "../../redux/user/user.actions";

const ChatColorChange = ({
  userAuth,
  currentUser,
  updateCurrentUser,
  socket,
}) => {
  const [chatColor, setChatColor] = useState("");

  // useEffect(async () => {}, []);

  const handleSubmit = async (event) => {
    // console.log("whats my chat color input", chatColor);
    await axios
      .put(`${BASE_API_URL}/userprofile/setChatColor/${userAuth.uid}`, null, {
        params: { "color": chatColor },
      })
      .then((res) => {
        updateCurrentUser(userAuth.uid);
        // console.log("CHAT COLORRRR", chatColor);
        socket.emit("update", chatColor, () => {
          // setMessage("");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeComplete = (color, event) => {
    setChatColor(color.hex);
  };

  return (
    <div className={`chat-color-change-container`}>
      <BlockPicker
        color={chatColor}
        triangle="hide"
        colors={[
          "#D9E3F0",
          "#F47373",
          "#697689",
          "#37D67A",
          "#2CCCE4",
          "#555555",
          "#dce775",
          "#ff8a65",
          "#ba68c8",
          "#000000",
        ]}
        onChangeComplete={handleChangeComplete}
      />
      {/* <Button variant="contained" color="primary" onClick={handleSubmit}>
        Change Chat Color
      </Button> */}

      <CustomButton id="chat-color-btn" onClick={handleSubmit}>
        Change
      </CustomButton>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  currentUser: state.user.currentUser,
  socket: state.user.socket,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrentUser: (userID) => dispatch(updateCurrentUser(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatColorChange);
