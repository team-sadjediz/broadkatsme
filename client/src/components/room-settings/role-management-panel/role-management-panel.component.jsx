import React from "react";
import { connect } from "react-redux";
// import axios from "axios";

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

// import { BASE_API_URL } from "../../../utils";

import "./role-management-panel.styles.scss";

const useStyles = makeStyles(theme => ({
  list: {
    width: "100%",
    height: "100%"
  },
  listItem: {
    borderBottom: "1px solid #efefef"
  },
  summary: {
    borderBottom: "1px solid #e0e0e0"
  }
}));

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  selectedRoom: state.room.selectedRoom
});

const mapDispatchToProps = dispatch => ({
  // setSubscribedRooms: subRoomList => dispatch(setSubscribedRooms(subRoomList)),
  // setSelectedRoom: roomID => dispatch(setSelectedRoom(roomID))
});

function RoleManagementPanel(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const temp = temp => {
    console.log(`clicked with ${temp}`);
  };

  const generate = (items, owned, roomAdmin, onRemove, onBan, onReport) => {
    let list = items.map(item => {
      let itemIsAdmin = props.admins.some(admin => admin.uid == item.uid);
      return (
        <ListItem className={classes.listItem} key={item}>
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
            {roomAdmin && !itemIsAdmin ? (
              <IconButton onClick={() => onRemove(item.uid)}>
                <RemoveCircleIcon></RemoveCircleIcon>
              </IconButton>
            ) : null}
            {roomAdmin && !itemIsAdmin ? (
              <IconButton onClick={() => onBan(item.uid)}>
                <BlockIcon></BlockIcon>
              </IconButton>
            ) : null}
            {props.currentUser.uid != item.uid ? (
              <IconButton onClick={() => onReport(item.uid)}>
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
    let list = items.map(item => {
      let itemOwner = props.ownerID == item.uid;
      return (
        <ListItem className={classes.listItem} key={item}>
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
            {owned && !itemOwner ? (
              <IconButton onClick={() => onRemove(item.uid)}>
                <RemoveCircleIcon></RemoveCircleIcon>
              </IconButton>
            ) : null}
            {owned && !itemOwner ? (
              <IconButton onClick={() => onBan(item.uid)}>
                <BlockIcon></BlockIcon>
              </IconButton>
            ) : null}
            {props.currentUser.uid != item.uid ? (
              <IconButton onClick={() => onReport(item.uid)}>
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
    onBan,
    onReport
  ) => {
    let list = items.map(item => {
      let itemIsAdmin = props.admins.some(admin => admin.uid == item.uid);
      let itemOwner = props.ownerID == item.uid;
      return (
        <ListItem className={classes.listItem} key={item}>
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
            {owned && !itemOwner ? (
              <IconButton onClick={() => addAdmin(item.uid)}>
                <SupervisorAccountIcon></SupervisorAccountIcon>
              </IconButton>
            ) : null}
            {roomAdmin && !itemIsAdmin ? (
              <IconButton onClick={() => addOperator(item.uid)}>
                <SettingsRemoteIcon></SettingsRemoteIcon>
              </IconButton>
            ) : null}
            {roomAdmin && !itemIsAdmin ? (
              <IconButton onClick={() => onBan(item.uid)}>
                <BlockIcon></BlockIcon>
              </IconButton>
            ) : null}
            {props.currentUser.uid != item.uid ? (
              <IconButton onClick={() => onReport(item.uid)}>
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
    let bannedList = props.bannedUsers.map(banned => {
      return (
        <ListItem className={classes.listItem} key={banned}>
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
              <IconButton onClick={() => onUnban(banned.uid)}>
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
                temp,
                temp,
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
                props.owned,
                props.roomAdmin,
                temp,
                temp,
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
                props.owned,
                props.roomAdmin,
                temp,
                temp,
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
                temp,
                temp,
                temp,
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
                  temp
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
