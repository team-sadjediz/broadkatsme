import React from "react";
// import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
// import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import BlockIcon from "@material-ui/icons/Block";
import LockOpenIcon from "@material-ui/icons/LockOpen";

// import { BASE_API_URL } from "../../../utils";

import "./role-management-panel.styles.scss";

const useStyles = makeStyles(theme => ({
  list: {
    width: "100%",
    height: "100%"
  }
  //   banned: {
  //     "& svg": {
  //       fill: "#ef5350 !important"
  //     }
  //   }
}));

export default function RoleManagementPanel(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const generate = (items, owned) => {
    let list = items.map(item => {
      return (
        <ListItem>
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
            {owned ? (
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
        <ListItem>
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
      Role Management
      <div className="role-management-boxes">
        <ExpansionPanel
          expanded={expanded === "RoomAdmins"}
          onChange={handleChange("RoomAdmins")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id="RoomAdmins"
          >
            <div className="room-heading">Room Administrators</div>
            <div className="room-secondary-heading">Room Administrators</div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.list}>
              {generate(props.admins, props.owned)}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/*  */}
        <ExpansionPanel
          expanded={expanded === "Operators"}
          onChange={handleChange("Operators")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} id="Operators">
            <div className="room-heading">Operators</div>
            <div className="room-secondary-heading">Operators</div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.list}>
              {generate(props.operators, props.owned)}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/*  */}
        <ExpansionPanel
          expanded={expanded === "Invitations"}
          onChange={handleChange("Invitations")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id="Invitations"
          >
            <div className="room-heading">Invitations</div>
            <div className="room-secondary-heading">Invitations</div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.list}>
              {generate(props.invitations, props.owned)}
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <div className="role-management-boxes">
        <ExpansionPanel
          expanded={expanded === "BannedUsers"}
          onChange={handleChange("BannedUsers")}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            id="BannedUsers"
          >
            <div className="room-heading">Banned Users</div>
            <div className="room-secondary-heading">Banned Users</div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.list}>{generateBannedUsers()}</List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
}
