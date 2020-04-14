import React from "react";
import { connect } from "react-redux";
import {
  setSubscribedRooms,
  setSelectedRoom,
  updateSubscribedRooms,
} from "../../../redux/room/room.actions";
import axios from "axios";
import { BASE_API_URL } from "../../../utils";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
// import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import BlockIcon from "@material-ui/icons/Block";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import SettingsRemoteIcon from "@material-ui/icons/SettingsRemote";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ContactMailIcon from "@material-ui/icons/ContactMail";

import "./role-management-panel.styles.scss";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
    height: "100%",
  },
  listItem: {
    borderBottom: "1px solid #efefef",
  },
  summary: {
    borderBottom: "1px solid #e0e0e0",
  },
}));

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  subscribedRooms: state.room.subscribedRooms,
  selectedRoom: state.room.selectedRoom,
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateSubscribedRooms: (uid) => dispatch(updateSubscribedRooms(uid)),
  setSelectedRoom: (roomID) => dispatch(setSelectedRoom(roomID)),
});

// FIX CANCEL TOKENS!!!

function RoleManagementPanel(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const cancelToken = axios.CancelToken;
  const source = cancelToken.source();

  const handleChange = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const temp = (temp) => {
    console.log(`clicked with ${temp}`);
  };

  const onBan = async (uid) => {
    await axios
      .put(
        `${BASE_API_URL}/roomsettings/ban/${props.roomID}/${uid}/${props.userAuth.uid}`,
        null,
        { params: { action: "ban" } },
        { cancelToken: source.token }
      )
      .then((banResult) => {
        props.updateSubscribedRooms(props.roomID);
        props.setSelectedRoom(props.roomID);
        let updatedResults = banResult.data.updatedRoomAccess;
        updatedResults.subscribers = banResult.data.updatedSubscribers;
        props.updateAll(updatedResults);
      });
  };

  const onUnban = async (uid) => {
    await axios
      .put(
        `${BASE_API_URL}/roomsettings/ban/${props.roomID}/${uid}/${props.userAuth.uid}`,
        null,
        { params: { action: "unban" } },
        { cancelToken: source.token }
      )
      .then((banResult) => {
        props.updateSubscribedRooms(props.roomID);
        props.setSelectedRoom(props.roomID);
        props.updateBans(banResult.data);
      });
  };

  const addAdmin = async (uid) => {
    await axios
      .put(
        `${BASE_API_URL}/roomsettings/admins/${props.roomID}/${uid}/${props.userAuth.uid}`,
        null,
        { params: { action: "add" } },
        { cancelToken: source.token }
      )
      .then((roomAccess) => {
        props.updateSubscribedRooms(props.roomID);
        props.setSelectedRoom(props.roomID);
        props.updateAll(roomAccess.data);
      })
      .catch((error) => console.error(error));
  };

  const removeAdmin = async (uid) => {
    await axios
      .put(
        `${BASE_API_URL}/roomsettings/admins/${props.roomID}/${uid}/${props.userAuth.uid}`,
        null,
        { params: { action: "delete" } },
        { cancelToken: source.token }
      )
      .then((roomAdmins) => {
        props.updateSubscribedRooms(props.roomID);
        props.setSelectedRoom(props.roomID);
        props.updateAdmins(roomAdmins.data);
      })
      .catch((error) => console.error(error));
  };

  const addOperator = async (uid) => {
    await axios
      .put(
        `${BASE_API_URL}/roomsettings/operators/${props.roomID}/${uid}/${props.userAuth.uid}`,
        null,
        { params: { action: "add" } },
        { cancelToken: source.token }
      )
      .then((operators) => {
        props.updateSubscribedRooms(props.roomID);
        props.setSelectedRoom(props.roomID);
        props.updateOperators(operators.data);
      })
      .catch((error) => console.error(error));
  };

  const removeOperator = async (uid) => {
    await axios
      .put(
        `${BASE_API_URL}/roomsettings/operators/${props.roomID}/${uid}/${props.userAuth.uid}`,
        null,
        { params: { action: "delete" } },
        { cancelToken: source.token }
      )
      .then((operators) => {
        props.updateSubscribedRooms(props.roomID);
        props.setSelectedRoom(props.roomID);
        props.updateOperators(operators.data);
      })
      .catch((error) => console.error(error));
  };

  const addInvitation = async (uid) => {
    await axios
      .put(
        `${BASE_API_URL}/roomsettings/inviters/${props.roomID}/${uid}/${props.userAuth.uid}`,
        null,
        { params: { action: "add" } },
        { cancelToken: source.token }
      )
      .then((inviters) => {
        props.updateSubscribedRooms(props.roomID);
        props.setSelectedRoom(props.roomID);
        props.updateInvitations(inviters.data);
      })
      .catch((error) => console.error(error));
  };

  const removeInvitation = async (uid) => {
    await axios
      .put(
        `${BASE_API_URL}/roomsettings/inviters/${props.roomID}/${uid}/${props.userAuth.uid}`,
        null,
        { params: { action: "delete" } },
        { cancelToken: source.token }
      )
      .then((inviters) => {
        props.updateSubscribedRooms(props.roomID);
        props.setSelectedRoom(props.roomID);
        props.updateInvitations(inviters.data);
      })
      .catch((error) => console.error(error));
  };

  const report = async (uid) => {};

  const generate = (
    items,
    key,
    owned,
    roomAdmin,
    onRemove,
    onBan,
    onReport
  ) => {
    let list = items.map((item) => {
      let itemIsAdmin = props.admins.some(
        (admin) => admin.userID == item.userID
      );
      let itemIsOwner = props.ownerID == item.userID;
      return (
        <ListItem className={classes.listItem} key={`${key} ${item.userID}`}>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.username}
            secondary={owned ? "View Reports" : null}
          ></ListItemText>
          <ListItemSecondaryAction>
            {roomAdmin && !itemIsAdmin && !itemIsOwner ? (
              <IconButton onClick={() => onRemove(item.userID)}>
                <RemoveCircleIcon></RemoveCircleIcon>
              </IconButton>
            ) : null}
            {roomAdmin && (!itemIsAdmin || owned) && !itemIsOwner ? (
              <IconButton onClick={() => onBan(item.userID)}>
                <BlockIcon></BlockIcon>
              </IconButton>
            ) : null}
            {props.userAuth.uid != item.userID ? (
              <IconButton onClick={() => onReport(item.userID)}>
                <FlagOutlinedIcon></FlagOutlinedIcon>
              </IconButton>
            ) : null}
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return list;
  };

  const generateAdmins = (
    items,
    owned,
    roomAdmin,
    onRemove,
    onBan,
    onReport
  ) => {
    let list = items.map((item) => {
      let itemIsOwner = props.ownerID == item.userID;
      return (
        <ListItem
          className={classes.listItem}
          key={`administrators ${item.userID}`}
        >
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.username}
            secondary={owned ? "View Reports" : null}
          ></ListItemText>
          <ListItemSecondaryAction>
            {owned && !itemIsOwner ? (
              <IconButton onClick={() => onRemove(item.userID)}>
                <RemoveCircleIcon></RemoveCircleIcon>
              </IconButton>
            ) : null}
            {owned && !itemIsOwner ? (
              <IconButton onClick={() => onBan(item.userID)}>
                <BlockIcon></BlockIcon>
              </IconButton>
            ) : null}
            {props.userAuth.uid != item.userID ? (
              <IconButton onClick={() => onReport(item.userID)}>
                <FlagOutlinedIcon></FlagOutlinedIcon>
              </IconButton>
            ) : null}
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return list;
  };

  const generateUsers = (
    items,
    owned,
    roomAdmin,
    addAdmin,
    addOperator,
    addInvitation,
    onBan,
    onReport
  ) => {
    let list = items.map((item) => {
      let itemIsAdmin = props.admins.some(
        (admin) => admin.userID == item.userID
      );
      let itemIsOperator = props.operators.some(
        (operator) => operator.userID == item.userID
      );
      let itemIsInviter = props.invitations.some(
        (inviter) => inviter.userID == item.userID
      );
      let itemOwner = props.ownerID == item.userID;
      return (
        <ListItem className={classes.listItem} key={`users ${item.userID}`}>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.username}
            secondary={owned ? "View Reports" : null}
          ></ListItemText>
          <ListItemSecondaryAction>
            {owned && !itemOwner && !itemIsAdmin ? (
              <IconButton onClick={() => addAdmin(item.userID)}>
                <SupervisorAccountIcon></SupervisorAccountIcon>
              </IconButton>
            ) : null}
            {roomAdmin && !itemIsAdmin && !itemIsOperator ? (
              <IconButton onClick={() => addOperator(item.userID)}>
                <SettingsRemoteIcon></SettingsRemoteIcon>
              </IconButton>
            ) : null}
            {roomAdmin && !itemIsAdmin && !itemIsInviter ? (
              <IconButton onClick={() => addInvitation(item.userID)}>
                <ContactMailIcon></ContactMailIcon>
              </IconButton>
            ) : null}
            {roomAdmin && !itemIsAdmin ? (
              <IconButton onClick={() => onBan(item.userID)}>
                <BlockIcon></BlockIcon>
              </IconButton>
            ) : null}
            {props.userAuth.uid != item.userID ? (
              <IconButton onClick={() => onReport(item.userID)}>
                <FlagOutlinedIcon></FlagOutlinedIcon>
              </IconButton>
            ) : null}
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return list;
  };

  const generateBannedUsers = (items, owned, roomAdmin, onUnban) => {
    let bannedList = props.bannedUsers.map((banned) => {
      return (
        <ListItem className={classes.listItem} key={`banned ${banned.userID}`}>
          <ListItemAvatar>
            <Avatar>
              <AccountCircleIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={banned.username}
            secondary={props.owned ? "View Reports" : null}
          ></ListItemText>
          <ListItemSecondaryAction>
            {owned ? (
              <IconButton onClick={() => onUnban(banned.userID)}>
                <LockOpenIcon></LockOpenIcon>
              </IconButton>
            ) : null}
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return bannedList;
  };

  return (
    <div className="role-management-panel">
      <div className="role-management-panel-title">Role Management</div>
      <Divider variant="fullWidth" />
      <div className="role-management-boxes">
        <ExpansionPanel
          expanded={expanded === "RoomAdmins"}
          onChange={handleChange("RoomAdmins")}
        >
          <ExpansionPanelSummary
            className={classes.summary}
            expandIcon={<ExpandMoreIcon />}
            id="RoomAdmins"
          >
            <div className="role-management-boxes-title">
              Room Administrators
            </div>
            <div className="role-management-boxes-description">
              view users allowed to administrate room management
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.list}>
              {generateAdmins(
                props.admins,
                props.owned,
                props.roomAdmin,
                removeAdmin,
                onBan,
                temp
              )}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/*  */}
        <ExpansionPanel
          expanded={expanded === "Operators"}
          onChange={handleChange("Operators")}
        >
          <ExpansionPanelSummary
            className={classes.summary}
            expandIcon={<ExpandMoreIcon />}
            id="Operators"
          >
            <div className="role-management-boxes-title">Operators</div>
            <div className="role-management-boxes-description">
              view users allowed to operate room remote control
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.list}>
              {generate(
                props.operators,
                "operators",
                props.owned,
                props.roomAdmin,
                removeOperator,
                onBan,
                temp
              )}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/*  */}
        <ExpansionPanel
          expanded={expanded === "Invitations"}
          onChange={handleChange("Invitations")}
        >
          <ExpansionPanelSummary
            className={classes.summary}
            expandIcon={<ExpandMoreIcon />}
            id="Invitations"
          >
            <div className="role-management-boxes-title">Invitations</div>
            <div className="role-management-boxes-description">
              view users allowed to invite
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.list}>
              {generate(
                props.invitations,
                "invitations",
                props.owned,
                props.roomAdmin,
                removeInvitation,
                onBan,
                temp
              )}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <Divider variant="fullWidth" />
      <div className="role-management-boxes">
        <ExpansionPanel
          expanded={expanded === "Subscribers"}
          onChange={handleChange("Subscribers")}
        >
          <ExpansionPanelSummary
            className={classes.summary}
            expandIcon={<ExpandMoreIcon />}
            id="Subscribers"
          >
            <div className="role-management-boxes-title">Subscribers</div>
            <div className="role-management-boxes-description">
              view all users currently subscribed to room
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.list}>
              {generateUsers(
                props.users,
                props.owned,
                props.roomAdmin,
                addAdmin,
                addOperator,
                addInvitation,
                onBan,
                temp
              )}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      {props.owned || props.roomAdmin ? <Divider variant="fullWidth" /> : null}
      {props.owned || props.roomAdmin ? (
        <div className="role-management-boxes">
          <ExpansionPanel
            expanded={expanded === "BannedUsers"}
            onChange={handleChange("BannedUsers")}
          >
            <ExpansionPanelSummary
              className={classes.summary}
              expandIcon={<ExpandMoreIcon />}
              id="BannedUsers"
            >
              <div className="role-management-boxes-title">Banned Users</div>
              <div className="role-management-boxes-description">
                view users banned from room
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List className={classes.list}>
                {generateBannedUsers(
                  props.bannedUsers,
                  props.owned,
                  props.roomAdmin,
                  onUnban
                )}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      ) : null}
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoleManagementPanel);
