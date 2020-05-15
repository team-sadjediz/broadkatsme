import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_API_URL, CHAT_SERVER } from "../../utils";
import { connect } from "react-redux";
// import { useHistory } from "react-router-dom";
// import { useLocation } from "react-router-dom";

import {
  setSubscribedRooms,
  setSelectedRoom,
  updateSubscribedRooms,
} from "../../redux/room/room.actions";

// custom components:
import Tag from "../../components/tag/tag.component";
import RoomTitle from "../../components/room-title/room-title.component";
import RoomBar from "../../components/room-bar/room-bar.component";
import BrowserOverlay from "../../components/browser-overlay/browser-overlay.component";
import BrowserInit from "../../components/browser-init/browser-init.component";
import RoomSettings from "../../components/room-settings/room-settings.component";
import Divider from "@material-ui/core/Divider";
import CircleButton from "../../components/circle-btn/circle-btn.component";
import PopUpFade from "../../components/pop-up-fade/pop-up-fade.component";

// mui icons:
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import SettingsRemoteIcon from "@material-ui/icons/SettingsRemote";
import CancelIcon from "@material-ui/icons/Cancel";
import RefreshIcon from "@material-ui/icons/Refresh";

// custom style sheet:
import "./room-page-v2.styles.scss";

const RoomPage = ({
  socket,
  userAuth,
  currentUser,
  selectedRoom,
  setSelectedRoom,
  match,
  ...props
}) => {
  const [access, setAccess] = useState(false);
  const [blockControl, setBlockControl] = useState(false); // should be set to true
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [showInitial, setShowInitial] = useState(true);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showControlOverlay, setShowControlOverlay] = useState(false);
  const [vbPort, setVbPort] = useState(null);
  const [refresh, setRefresh] = useState(false);

  let timer = null;

  // const browserHistory = useHistory();
  // const browserLocation = useLocation();

  useEffect(() => {
    if (socket.id) {
      socket.on("pushBlockControl", (message) => {
        setBlockControl(true);
      });

      socket.on("receiveVbPort", (vbInfo) => {
        setShowInitial(false);
        console.log("you can connect to", vbInfo.vbPort);
        setVbPort(vbInfo.vbPort);
      });
    }
  }, [socket.id]);

  useEffect(() => {
    let source = axios.CancelToken.source();
    const validateAcess = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_API_URL}/room/find/${match.params.id}`,
          {
            cancelToken: source.token,
          }
        );
        setLoading(false);
        if (res.data.subscribers.includes(userAuth.uid)) {
          setAccess(true);
          setSelectedRoom(match.params.id);
        } else setAccess(false);
      } catch (e) {
        if (axios.isCancel(e)) {
        } else {
          console.error(e);
        }
      }
    };

    validateAcess();

    return () => {
      setLoading(false);
      source.cancel();
    };
  }, [match.params.id]);

  useEffect(() => {
    setShowInitial(true);
    if (socket.id) {
      const roomObj = {
        id: userAuth.uid,
        name: currentUser.username,
        chatColor: currentUser.chatColor,
        room: selectedRoom.roomID,
        date: new Date(),
      };

      socket.emit("join", roomObj, (error) => {
        if (error) {
          console.log("ERROR", error);
        }
      });
    }

    return () => {
      socket.emit("leaveRoom");
    };
  }, [socket, selectedRoom.roomID]);

  const toggleSettingsModal = () => {
    setShowSettings(!showSettings);
  };

  const unsubscribe = async () => {
    await axios
      .put(
        `${BASE_API_URL}/userprops/subscribe/${match.params.id}/${userAuth.uid}`,
        null,
        { params: { action: "unsubscribe" } }
      )
      .then((res) => console.log("Unsubscribed from " + match.params.id))
      .catch((error) => console.error(error));
  };

  const onChangeTag = (tags) => {
    this.setState({ tags: tags });
  };

  const onChangeTitle = (e) => {
    setRoomName(e.target.value);
    // this.setState({ roomName: e.target.value });
    //axios call to save title changes here & return true -> flashes when saved/true is returned?
  };

  const onSubmitTitle = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${BASE_API_URL}/roomsettings/change-name/${match.params.id}/${userAuth.uid}`,
        null,
        { params: { name: roomName } }
        // { cancelToken: this.source.token }
      )
      .then((res) => console.log("Changed name to " + res.data))
      .catch((error) => console.error(error));
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    // this.setState({ isMouseMoving: true });
    setIsMouseMoving(true);
    (() => {
      clearTimeout(timer);
      timer = setTimeout(() => setIsMouseMoving(false), 3000);
    })();
  };

  const handleVolume = (volume) => {
    // this.setState({ volume: volume });
    setVolume(volume);
  };

  const closeInit = () => {
    setShowInitial(false);
    // this.setState({ showInitial: false });
  };

  const takeControl = (e) => {
    socket.emit("updateBlockControl", true, () => {
      console.log("updating this users controls");
      setBlockControl(false);
    });
  };

  const toggleControlOverlay = (e) => {
    setShowControlOverlay(!showControlOverlay);
  };

  const handleBrowserControlOverlay = (e) => {
    clearTimeout(timer);
    timer = setTimeout(toggleControlOverlay(), 1000);
  };

  const requestVb = () => {
    socket.emit("requestVirtualBrowser");
  };

  return (
    <React.Fragment>
      {access ? (
        <div className="main-container">
          {showSettings ? (
            <div className="room-settings-container">
              <RoomSettings
                toggleSettingsModal={toggleSettingsModal}
                roomID={match.params.id}
                owned={true}
                // tags={tags}
                // addTag={addTag}
                uid={userAuth.uid}
                onChangeTitle={onChangeTitle}
              ></RoomSettings>
            </div>
          ) : null}

          <div className="room-page-container">
            <div className="room-page">
              <div className="room-title-area">
                <RoomTitle
                  roomName={selectedRoom.name} // needs change
                  onChangeTitle={onChangeTitle}
                  onSubmit={onSubmitTitle}
                />
              </div>
              {showInitial ? (
                <div className="room-screen-init">
                  <BrowserInit
                    closeInit={closeInit}
                    requestVb={requestVb}
                    roomName={selectedRoom.name} // needs change
                  ></BrowserInit>
                </div>
              ) : null}
              <div
                className="room-screen-area"
                // onMouseMove={(e) => handleMouseMove(e)}
                onMouseEnter={(e) => {
                  setShowControlOverlay(true);
                }}
                onMouseLeave={(e) => {
                  setShowControlOverlay(false);
                }}
              >
                <iframe
                  // src="http://3.22.254.199:5800/"
                  key={refresh}
                  src={vbPort ? `http://3.22.254.199:${vbPort}/` : null}
                  allowFullscreen
                ></iframe>

                {/* {isMouseMoving ? (
                  <BrowserOverlay
                    className="browser-overlay"
                    volume={volume}
                    handleVolume={handleVolume}
                  />
                ) : (
                  <div className="hide" />
                )} */}
                {blockControl ? (
                  <div className="remote-control-blocked">
                    <PopUpFade
                      className="room-screen-center"
                      text="You no longer have control!"
                    />
                  </div>
                ) : (
                  <PopUpFade
                    className="room-screen-center"
                    text="You now have control!"
                  />
                )}

                {showControlOverlay && (
                  <div className="control-overlay">
                    <div className="volume-slider-container">
                      {/* {[...Array(10)].map(() => (
                        <div className="volume-segment"></div>
                      ))} */}
                    </div>
                    <CircleButton
                      onClick={takeControl}
                      icon={<SettingsRemoteIcon />}
                    />
                    <CircleButton
                      // onClick={takeControl}
                      icon={<FullscreenIcon />}
                    />
                    <CircleButton
                      onClick={(e) => {
                        setShowControlOverlay(false);
                      }}
                      icon={<CancelIcon />}
                    />
                    <CircleButton
                      icon={<RefreshIcon />}
                      onClick={(e) => {
                        setRefresh(!refresh);
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="room-bar-area">
                <RoomBar
                  toggleSettingsModal={toggleSettingsModal}
                  // favoriteRoom={this.favoriteRoom}
                  // isFavorited={this.state.isFavorited}
                  unsubscribe={unsubscribe}
                />
                {/* {addTag} */}
              </div>
              <div className="room-tags-area">
                <Divider className="room-tag-divider" variant="fullWidth" />

                {/* {tags} */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // <div className={`socket-main ${socketOverlay ? "socket-overlay" : ""}`}>
        //   <p>{selectedRoom.roomID}</p>
        //   <div className="actual-browser"></div>
        //   <div className="socket-overlay"></div>
        //   {blockControl && <div className="remote-control-blocked"></div>}
        //   <CircleButton onClick={takeControl} />
        // </div>
        "you do not have access"
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  subscribedRooms: state.room.subscribedRooms,
  selectedRoom: state.room.selectedRoom,
  currentUser: state.user.currentUser,
  socket: state.user.socket,
});

const mapDispatchToProps = (dispatch) => ({
  updateSubscribedRooms: (uid) => dispatch(updateSubscribedRooms(uid)),
  setSelectedRoom: (roomID) => dispatch(setSelectedRoom(roomID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
