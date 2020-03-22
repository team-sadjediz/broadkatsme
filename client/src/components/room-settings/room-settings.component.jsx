import React, { Component } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import CancelIcon from "@material-ui/icons/Cancel";
import Modal from "@material-ui/core/Modal";

// import "./room-settings.styles.scss";
import { withRouter } from "react-router-dom";

import GeneralPanel from "./general-panel/general-panel.component";
import RoleManagementPanel from "./role-management-panel/role-management-panel.component";
import SettingsPanel from "./settings-panel/settings-panel.component";
import DeletePanel from "./delete-panel/delete-panel.component";
import NotificationsPanel from "./notifications-panel/notifications-panel.component";
import Tag from "../../components/tag/tag.component";

import axios from "axios";
import { BASE_API_URL } from "../../utils";
import { connect } from "react-redux";

const useStyles = theme => ({
  root: {
    backgroundColor: "white",
    display: "flex",
    width: "80%",
    height: "80%",
    maxHeight: "800px",
    maxWidth: "1280px",
    border: "none",
    outline: 0
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  tabs: {
    borderRight: "1px solid #e0e0e0",
    minWidth: "max-content",
    fontWeight: "bold"
  },
  indicator: {
    width: 5
  },
  activeTab: {
    background: "#efefef"
  },
  panelContainer: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 2em",
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 10,
    overflowY: "auto"
  },
  panel: {
    height: "100%",
    width: "100%",
    // backgroundColor: "black",
    gridColumn: 1
    // overflowY: "auto"
  },
  exit: {
    marginTop: 5,
    marginRight: 10,
    gridColumn: 2,
    cursor: "pointer",
    "&:hover": {
      color: "#ef5350"
      // background: "#ef5350",
      // "& svg": {
      //   fill: "#ef5350 !important"
      // }
    }
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

class RoomSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      value: 0,
      open: true,
      owned: false
    };
    this.cancelToken = axios.CancelToken;
    this.source = this.cancelToken.source();
  }

  componentDidMount() {
    this.fetchData();
  }

  componentWillUnmount() {
    this.source.cancel("Operations cancelled. Component unmounting.");
  }

  fetchData = async () => {
    await axios
      .get(`${BASE_API_URL}/room/find/${this.props.roomID}`, {
        cancelToken: this.source.token
      })
      .then(room => {
        console.log(room);
        let owned = room.data.ownerID == this.props.currentUser.uid;
        let roomAdmin = room.data.subscribers.includes(
          this.props.currentUser.uid
        );
        this.setState({ thumbnailUrl: room.data.thumbnailUrl });
        this.setState({ ownerID: room.data.ownerID });
        this.setState({ owned: owned });
        this.setState({ roomAdmin: roomAdmin });
        this.setState({ roomName: room.data.name });
        this.setState({ tags: room.data.tags });
        this.setState({ privacy: room.data.settings.privacy });
        this.setState({ roomSize: room.data.settings.roomSize });
        this.setState({ subscribers: room.data.subscribers });
        this.setState(room.data.settings.access);
      })
      .catch(error => {
        this.setState({ error: true });
        console.log(error);
      });
    this.setState({ loading: false });
    console.log(this.state);
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  handleClose = () => {
    this.props.toggleSettingsModal();
    this.setState({ open: false });
  };

  onChangeTag = tags => {
    this.setState({ tags: tags });
  };

  deleteRoom = async () => {
    console.log("called");
    await axios
      .delete(
        `${BASE_API_URL}/room/delete/${this.props.roomID}/${this.props.currentUser.uid}`,
        {
          cancelToken: this.source.token
        }
      )
      .then(res => {
        this.props.history.push("/lobby");
      })
      .catch(error => console.error(error));
  };

  getUserNames = uids => {
    // some call to get username
    let users = uids.map(uid => {
      return { username: uid, uid: uid };
    });
    return users;
  };

  onChangeTitle = e => {
    this.setState({ roomName: e.target.value });
  };

  onBlurTitle = async e => {
    await axios
      .put(
        `${BASE_API_URL}/roomsettings/change-name/${this.props.roomID}/${this.props.currentUser.uid}`,
        null,
        { params: { name: this.state.roomName } },
        {
          cancelToken: this.source.token
        }
      )
      .then(newName => {
        this.setState({ roomName: newName.data });
        this.props.onChangeTitle(this.state.roomName);
      })
      .catch(error => console.error(error));
    console.log(this.state.roomName);
  };

  onTogglePrivacy = async privacy => {
    await axios
      .put(
        `${BASE_API_URL}/roomsettings/change-privacy/${this.props.roomID}/${this.props.currentUser.uid}`,
        null,
        { params: { privacy: privacy } },
        {
          cancelToken: this.source.token
        }
      )
      .then(newPrivacy => {
        this.setState({ privacy: newPrivacy });
      })
      .catch(error => console.error(error));
  };

  onChangeSize = async size => {
    await axios
      .put(
        `${BASE_API_URL}/roomsettings/change-roomsize/${this.props.roomID}/${this.props.currentUser.uid}`,
        null,
        { params: { size: size } },
        {
          cancelToken: this.source.token
        }
      )
      .then(newSize => {
        this.setState({ roomSize: newSize });
      })
      .catch(error => console.error(error));
  };

  onChangeThumbnail = thumbnailUrl => {
    // console.log(this.state.thumbnailUrl);
    // console.log(thumbnailUrl);
    this.setState({ thumbnailUrl: thumbnailUrl });
  };

  render() {
    const { classes } = this.props;
    if (this.state.loading) {
      return <div> LOADING </div>;
    } else {
      if (this.state.error) {
        return <div> ERROR </div>;
      } else {
        let tags = this.state.tags.map(tag => {
          return (
            <Tag
              key={tag}
              type="remove"
              text={tag}
              onChangeTag={this.onChangeTag}
              roomID={this.props.roomID}
              uid={this.props.currentUser.uid}
            />
          );
        });
        return (
          <Modal
            className={classes.modal}
            open={this.state.open}
            onClose={this.handleClose}
            disablePortal
            keepMounted
            //   hideBackdrop
          >
            <div className={classes.root}>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={this.state.value}
                onChange={this.handleChange}
                className={`${classes.tabs}`}
                classes={{ indicator: classes.indicator }}
                textColor="secondary"
              >
                <Tab label="General" id={`vertical-tab-${0}`}></Tab>
                <Tab label="Notifications" id={`vertical-tab-${1}`}></Tab>
                <Tab label="Settings" id={`vertical-tab-${2}`}></Tab>
                <Tab label="Role Management" id={`vertical-tab-${3}`}></Tab>
                {this.state.owned ? (
                  <Tab label="Delete" id={`vertical-tab-${4}`}></Tab>
                ) : null}
              </Tabs>
              <div className={classes.panelContainer}>
                {/* {panels} */}
                <TabPanel
                  className={classes.panel}
                  value={this.state.value}
                  index={0}
                >
                  <GeneralPanel
                    thumbnailUrl={this.state.thumbnailUrl}
                    name={this.state.roomName}
                    onChangeTitle={this.onChangeTitle}
                    onBlurTitle={this.onBlurTitle}
                    owner={this.props.currentUser.displayName}
                    ownerID={this.props.currentUser.uid}
                    tags={tags}
                    roomID={this.props.roomID}
                    onChangeThumbnail={this.onChangeThumbnail}
                    addTag={
                      <Tag
                        type="add"
                        roomID={this.props.roomID}
                        onChangeTag={this.onChangeTag}
                        uid={this.props.currentUser.uid}
                      ></Tag>
                    }
                  />
                </TabPanel>
                <TabPanel
                  className={classes.panel}
                  value={this.state.value}
                  index={1}
                >
                  <NotificationsPanel
                    allowNotifications={true}
                  ></NotificationsPanel>
                </TabPanel>
                <TabPanel
                  className={classes.panel}
                  value={this.state.value}
                  index={2}
                >
                  <SettingsPanel
                    privacy={this.state.privacy}
                    onTogglePrivacy={this.onTogglePrivacy}
                    size={this.state.roomSize}
                    onChangeSize={this.onChangeSize}
                  ></SettingsPanel>
                </TabPanel>
                <TabPanel
                  className={classes.panel}
                  value={this.state.value}
                  index={3}
                >
                  <RoleManagementPanel
                    // owned={true}
                    ownerID={this.state.ownerID}
                    owned={this.state.owned}
                    roomAdmin={this.state.roomAdmin}
                    admins={this.getUserNames(this.state.roomAdmins)}
                    operators={this.getUserNames(this.state.operators)}
                    invitations={this.getUserNames(this.state.invitations)}
                    bannedUsers={this.getUserNames(this.state.bans)}
                    users={this.getUserNames(this.state.subscribers)}
                  />
                </TabPanel>
                {this.state.owned ? (
                  <TabPanel
                    className={classes.panel}
                    value={this.state.value}
                    index={4}
                  >
                    <DeletePanel
                      roomName={this.state.roomName}
                      delete={this.deleteRoom}
                    ></DeletePanel>
                  </TabPanel>
                ) : null}

                <CancelIcon
                  className={classes.exit}
                  onClick={this.handleClose}
                ></CancelIcon>
              </div>
            </div>
          </Modal>
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  selectedRoom: state.room.selectedRoom
});

const mapDispatchToProps = dispatch => ({
  // setSubscribedRooms: subRoomList => dispatch(setSubscribedRooms(subRoomList)),
  // setSelectedRoom: roomID => dispatch(setSelectedRoom(roomID))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withStyles(useStyles)(RoomSettings)));

// export default function RoomSettings(props) {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);
//   const [open, setOpen] = React.useState(true);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleClose = () => {
//     props.toggleSettingsModal();
//     setOpen(false);
//   };

//   return (
//     <Modal
//       className={classes.modal}
//       open={open}
//       onClose={handleClose}
//       disablePortal
//       keepMounted
//       //   hideBackdrop
//     >
//       <div className={classes.root}>
//         <Tabs
//           // contentContainerStyle={classes.container}
//           orientation="vertical"
//           variant="scrollable"
//           value={value}
//           onChange={handleChange}
//           className={`${classes.tabs}`}
//           classes={{ indicator: classes.indicator }}
//           // inkBarStyle={classes.activeTab}
//           textColor="secondary"
//         >
//           {/* {tabs} */}
//           <Tab label="General" id={`vertical-tab-${0}`}></Tab>
//           <Tab label="Notifications" id={`vertical-tab-${1}`}></Tab>
//           <Tab label="Settings" id={`vertical-tab-${2}`}></Tab>
//           <Tab label="Role Management" id={`vertical-tab-${3}`}></Tab>
//           {props.owned ? (
//             <Tab label="Delete" id={`vertical-tab-${4}`}></Tab>
//           ) : null}
//         </Tabs>
//         <div className={classes.panelContainer}>
//           {/* {panels} */}
//           <TabPanel className={classes.panel} value={value} index={0}>
//             <GeneralPanel
//               thumbnailUrl="default3.png"
//               name="Shokugeki"
//               owner="Julie"
//               // tags="Tags Tags Tags"
//               tags={props.tags}
//               addTag={props.addTag}
//             />
//           </TabPanel>
//           <TabPanel className={classes.panel} value={value} index={1}>
//             <NotificationsPanel allowNotifications={true}></NotificationsPanel>
//           </TabPanel>
//           <TabPanel className={classes.panel} value={value} index={2}>
//             <SettingsPanel privacy={true} size={2}></SettingsPanel>
//           </TabPanel>
//           <TabPanel className={classes.panel} value={value} index={3}>
//             <RoleManagementPanel
//               // owned={true}
//               owned={props.owned}
//               admins={[
//                 { username: "a", uid: "auid" },
//                 { username: "b", uid: "buid" },
//                 { username: "c", uid: "cuid" },
//                 { username: "d", uid: "duid" },
//                 { username: "e", uid: "euid" }
//               ]}
//               operators={[
//                 { username: "d", uid: "fuid" },
//                 { username: "e", uid: "guid" },
//                 { username: "f", uid: "huid" },
//                 { username: "g", uid: "iuid" },
//                 { username: "h", uid: "juid" }
//               ]}
//               invitations={[
//                 { username: "i", uid: "kuid" },
//                 { username: "j", uid: "luid" },
//                 { username: "k", uid: "muid" },
//                 { username: "l", uid: "nuid" },
//                 { username: "m", uid: "ouid" }
//               ]}
//               bannedUsers={[
//                 { username: "n", uid: "puid" },
//                 { username: "o", uid: "quid" },
//                 { username: "p", uid: "ruid" },
//                 { username: "q", uid: "suid" },
//                 { username: "r", uid: "tuid" }
//               ]}
//             />
//           </TabPanel>
//           {props.owned ? (
//             <TabPanel className={classes.panel} value={value} index={4}>
//               <DeletePanel
//                 roomName={props.roomName}
//                 delete={props.delete}
//               ></DeletePanel>
//             </TabPanel>
//           ) : null}

//           <CancelIcon
//             className={classes.exit}
//             onClick={handleClose}
//           ></CancelIcon>
//         </div>
//       </div>
//     </Modal>
//   );
// }
