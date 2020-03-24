import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
import { updateFriendslist } from "../../redux/user/user.actions";
import { useSelector, useDispatch } from "react-redux";

import { BASE_API_URL } from "../../utils";

// mui components:
import { makeStyles, withStyles } from "@material-ui/core/styles";

// components:
import ImageButton from "../img-btn/img-btn.component";

// custom style sheet:
import "./friends-list.styles.scss";

import AirplayIcon from "@material-ui/icons/Airplay";

// const FriendsList = ({ userAuth, friendslist, updateFriendslist }) => {
const FriendsList = () => {
  // const [message, setMessage] = useState("");
  // const [messages, setMessages] = useState([]);

  const userAuth = useSelector(state => state.user.userAuth);
  const friendslist = useSelector(state => state.user.friendslist);
  const dispatch = useDispatch();

  useEffect(async () => {
    // console.log("BEFORE UE FL:", friendslist);
    await dispatch(updateFriendslist(userAuth.uid));
    // console.log("AFTER UE FL:", friendslist);

    return () => {};
  }, [userAuth.uid]);

  // const handleChange = event => {
  //   setMessage(event.target.value);
  // };

  return (
    <div className="friends-list-container">
      {console.log("FL", friendslist)}
      {friendslist.map((friend, i) => (
        <div key={i} className="friend-item">
          <ImageButton
            bgImageUrl={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=default2.jpg`}
          ></ImageButton>
          <span>{friend.username}</span>

          <div className="send-invitation">
            <AirplayIcon />
          </div>

          <div className="status">
            <div className={`circle ${i % 2 == 0 ? "green" : "red"}`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// const mapStateToProps = state => ({
//   userAuth: state.user.userAuth,
//   friendslist: state.user.friendslist
// });

// const mapDispatchToProps = dispatch => ({
//   updateFriendslist: userID => dispatch(updateFriendslist(userID))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);

export default FriendsList;
