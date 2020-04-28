import React, { useEffect } from "react";
import { ReactComponent as Live } from "../../../assets/icons/live.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "../../../utils";

//svgs, icons, button
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClearIcon from '@material-ui/icons/Clear';
import CircleBtn from "../../circle-btn/circle-btn.component";
import ChatIcon from '@material-ui/icons/Chat';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import Tag from "../../../components/tag/tag.component";
import "./search-card.style.scss";
import { makeStyles } from '@material-ui/core/styles';

import {
    updateSubscribedRooms,
    setSelectedRoom,
  } from "../../../redux/room/room.actions";

  function tagCheck(roomTags) {
  if (roomTags.length != 0) {
    const allTags = roomTags.map((value, index) => {
      return <Tag type="label" text={value} />;
    });
    return allTags;
  } else {
    return <Tag type="label" text="No tags" />;
  }
}

const SearchCard = ({userAuth, ...props}) => {
    const [hover, setHover] = React.useState(false);
    const [active, setActive] = React.useState(false);
    const [owner, setOwner] = React.useState([]);

  const handleMouseEnter = (event) => {
    // console.log(props);
    setHover(true);
  };

  const handleMouseLeave = (event) => {
    setHover(false);

  };

  const handleUnsubscribe = async (event) => {
    if (props.roomID) {
      console.log(props.roomID, userAuth.uid);
      // await axios.put(`${BASE_API_URL}/userprops/subscribed-rooms/subscribe`, {
      //   roomID: roomId,
      //   uid: currentUser.uid
      // });
      console.log("card unsub", props.roomID);
      console.log("card userAuth", userAuth.uid);
      await axios
        .put(
          `${BASE_API_URL}/userprops/subscribe/${props.roomID}/${userAuth.uid}`,
          null,
          { params: { action: "unsubscribe" } }
        )
        .then((res) => {
          updateSubscribedRooms(userAuth.uid);
        })
        .catch((err) => {
          console.log("card unsubbbb", err);
        });

      // let results = await axios.get(
      //   `${BASE_API_URL}/userprops/rooms/${userAuth.uid}`
      // );

      // setSelectedRoom(roomId);
    }
  };

  const handleSubscribe = async (event) => {
    if (props.roomID) {
      await axios
        .put(
          `${BASE_API_URL}/userprops/subscribe/${props.roomID}/${userAuth.uid}`,
          null,
          { params: { action: "subscribe" } }
        )
        .then((res) => {
          updateSubscribedRooms(userAuth.uid);
        })
        .catch((err) => {
          console.log("card subbbb", err);
        });

    }
  };

  useEffect(() => {
    // getUserInfo();
  }, [owner]);

  const getUserInfo = async (event) => {
      // console.log(props.roomID);
      if (props.ownerID) {
        await axios
        .get(`${BASE_API_URL}/userprofile/details/${props.ownerID}`)
        .then((result) => {
          // console.log("owner: ", result.data);
          setOwner(result.data);
          // return result.data
        })
        .catch((error) => {
          console.log("error: " + error);
        });
      }
      // return [];
  }

  let avatar = BASE_API_URL + "/userprofile/get-photo?photoUrl=" + owner.photoURL;
  let thumbnail = props.thumbnail;
  let username = owner.username;
  // console.log(owner);
  
  return (

   <div
    className="search-card"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    href="www.google.com"
    >
        {hover && (
          <div className="buttons-container">
            {props.unsubscribe && (
              <Tooltip title="Unsubscribe" placement="left">
                <Fab
                  className="room-card-buttons"
                  color="primary"
                  aria-label="unsubscribe"
                  onClick={handleUnsubscribe}
                >
                  <ClearIcon />
                </Fab>
              </Tooltip>
            )}
            {props.subscribe && (
              <Tooltip title="Subscribe" placement="left">
                <Fab
                  className="room-card-buttons"
                  color="primary"
                  aria-label="subscribe"
                  onClick={handleSubscribe}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            )}
           {/* add favorite? */}
          </div>
        )}

      <div className="room-thumbnail">
      <Link to={`/room/id=${props.roomID}`}>
          <img
              src={thumbnail}
          />
      </Link>
      </div>

      <div className="content">
          <div className="room-name-title">
              {props.roomName}
          </div>
          <div className="owner">
            <div className="user-thumbnail">
              {/* <img
                src={avatar}
              /> */}
              <AccountCircleIcon />
            </div>
            <div className="username">
              username {username}
            </div>
          </div>
          <div className="people">
              {/* {props.occupancy.roomSize} */}
              { 5 } subscribers
          </div>
          <div className="tags">
              {tagCheck(props.tags)}
          </div>
      </div>

   </div>
  );
};


const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  userAuth: state.user.userAuth
});

const mapDispatchToProps = (dispatch) => ({
    updateSubscribedRooms: (userID) => dispatch(updateSubscribedRooms(userID)),
    setSelectedRoom: (roomID) => dispatch(setSelectedRoom(roomID)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(SearchCard);
