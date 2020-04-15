import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { BASE_API_URL } from "../../utils";

// mui components:

// components:

// custom style sheet:
import "./room-info-preview.styles.scss";

const RoomInfoPreview = ({ roomInfo }) => {
  // const [roomInfo, setRoomInfo] = useState("");

  useEffect(() => {
    console.log("RoomInfoPreview MOUNTED for ", roomInfo.name, roomInfo.roomID);
    // axios
    //   .get(`${BASE_API_URL}/room/find/${roomID}`)
    //   .then(res => {
    //     console.log("data", res.data);
    //     setRoomInfo(res.data);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     console.log(err.response);
    //   });

    return () => {
      console.log(
        "RoomInfoPreview DISMOUNT for ",
        roomInfo.name,
        roomInfo.roomID
      );
    };
  });

  const shortenID = (id) => {
    return id.slice(0, 4) + id.slice(id.length - 4, id.length);
  };

  return (
    <div className="room-info-preview-container">
      <div className="room-info-item">{roomInfo.name}</div>
      {/* <div className="room-info-item room-owner">
        Owner: <span>{shortenID(roomInfo.ownerID)}</span>
      </div>
      <div className="room-info-item room-size">
        Room Size: <span>{roomInfo.settings.roomSize}</span>
      </div>
      <div className="room-info-item room-active">
        {roomInfo.active ? (
          <div>
            Room is <span>LIVE!</span>
          </div>
        ) : (
          "Not broadcasting at the moment.."
        )}
      </div> */}
    </div>
  );
};

// const mapStateToProps = state => ({
//   userAuth: state.user.userAuth
// });

// export default connect(mapStateToProps)(RoomInfoPreview);

export default RoomInfoPreview;
