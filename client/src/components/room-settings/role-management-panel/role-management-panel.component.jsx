import React from "react";
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

export default function RoleManagementPanel(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const generate = (items, owned, roomAdmin) => {
    let list = items.map(item => {
      return (
        <ListItem className={classes.listItem}>
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
            {roomAdmin ? (
              <IconButton>
                <RemoveCircleIcon></RemoveCircleIcon>
              </IconButton>
            ) : null}
            {roomAdmin ? (
              <IconButton>
                <BlockIcon></BlockIcon>
              </IconButton>
            ) : null}
            <IconButton>
              <FlagOutlinedIcon></FlagOutlinedIcon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return list;
  };

  const generateAdmins = (items, owned, roomAdmin) => {
    let list = items.map(item => {
      return (
        <ListItem className={classes.listItem}>
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
            {owned ? (
              <IconButton>
                <RemoveCircleIcon></RemoveCircleIcon>
              </IconButton>
            ) : null}
            {roomAdmin ? (
              <IconButton>
                <BlockIcon></BlockIcon>
              </IconButton>
            ) : null}
            <IconButton>
              <FlagOutlinedIcon></FlagOutlinedIcon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return list;
  };

  const generateUsers = (items, owned, roomAdmin) => {
    let list = items.map(item => {
      return (
        <ListItem className={classes.listItem}>
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
            {owned ? (
              <IconButton>
                <SupervisorAccountIcon></SupervisorAccountIcon>
              </IconButton>
            ) : null}
            {roomAdmin ? (
              <IconButton>
                <SettingsRemoteIcon></SettingsRemoteIcon>
              </IconButton>
            ) : null}
            {roomAdmin ? (
              <IconButton>
                <BlockIcon></BlockIcon>
              </IconButton>
            ) : null}
            <IconButton>
              <FlagOutlinedIcon></FlagOutlinedIcon>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
    return list;
  };

  const generateBannedUsers = () => {
    let bannedList = props.bannedUsers.map(banned => {
      return (
        <ListItem className={classes.listItem}>
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
            {/* SET ON CLICK IF OWNED */}
            <IconButton>
              <LockOpenIcon></LockOpenIcon>
            </IconButton>
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
              {generateAdmins(props.admins, props.owned, props.roomAdmin)}
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
              {generate(props.operators, props.owned, props.roomAdmin)}
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
              {generate(props.invitations, props.owned, props.roomAdmin)}
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
              {generateUsers(props.users, props.owned, props.roomAdmin)}
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
              <List className={classes.list}>{generateBannedUsers()}</List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      ) : null}
    </div>
  );
}
