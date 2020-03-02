import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import CancelIcon from "@material-ui/icons/Cancel";
import Modal from "@material-ui/core/Modal";

// import "./room-settings.styles.scss";

import GeneralPanel from "./general-panel/general-panel.component";
import RoleManagementPanel from "./role-management-panel/role-management-panel.component";
import SettingsPanel from "./settings-panel/settings-panel.component";
import DeletePanel from "./delete-panel/delete-panel.component";
import NotificationsPanel from "./notifications-panel/notifications-panel.component";

const useStyles = makeStyles(theme => ({
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
    minWidth: "max-content"
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
}));

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

export default function RoomSettings(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    props.toggleSettingsModal();
    setOpen(false);
  };

  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      disablePortal
      keepMounted
      //   hideBackdrop
    >
      <div className={classes.root}>
        <Tabs
          // contentContainerStyle={classes.container}
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          className={`${classes.tabs}`}
          classes={{ indicator: classes.indicator }}
          // inkBarStyle={classes.activeTab}
          textColor="secondary"
        >
          {/* {tabs} */}
          <Tab label="General" id={`vertical-tab-${0}`}></Tab>
          <Tab label="Notifications" id={`vertical-tab-${1}`}></Tab>
          <Tab label="Settings" id={`vertical-tab-${2}`}></Tab>
          <Tab label="Role Management" id={`vertical-tab-${3}`}></Tab>
          {props.owned ? (
            <Tab label="Delete" id={`vertical-tab-${4}`}></Tab>
          ) : null}
        </Tabs>
        <div className={classes.panelContainer}>
          {/* {panels} */}
          <TabPanel className={classes.panel} value={value} index={0}>
            <GeneralPanel
              thumbnailUrl="default3.png"
              name="Shokugeki"
              owner="Julie"
              // tags="Tags Tags Tags"
              tags={props.tags}
              addTag={props.addTag}
            />
          </TabPanel>
          <TabPanel className={classes.panel} value={value} index={1}>
            <NotificationsPanel allowNotifications={true}></NotificationsPanel>
          </TabPanel>
          <TabPanel className={classes.panel} value={value} index={2}>
            <SettingsPanel privacy={true} size={2}></SettingsPanel>
          </TabPanel>
          <TabPanel className={classes.panel} value={value} index={3}>
            <RoleManagementPanel
              // owned={true}
              owned={props.owned}
              admins={[
                { username: "a", uid: "auid" },
                { username: "b", uid: "buid" },
                { username: "c", uid: "cuid" },
                { username: "d", uid: "duid" },
                { username: "e", uid: "euid" }
              ]}
              operators={[
                { username: "d", uid: "fuid" },
                { username: "e", uid: "guid" },
                { username: "f", uid: "huid" },
                { username: "g", uid: "iuid" },
                { username: "h", uid: "juid" }
              ]}
              invitations={[
                { username: "i", uid: "kuid" },
                { username: "j", uid: "luid" },
                { username: "k", uid: "muid" },
                { username: "l", uid: "nuid" },
                { username: "m", uid: "ouid" }
              ]}
              bannedUsers={[
                { username: "n", uid: "puid" },
                { username: "o", uid: "quid" },
                { username: "p", uid: "ruid" },
                { username: "q", uid: "suid" },
                { username: "r", uid: "tuid" }
              ]}
            />
          </TabPanel>
          {props.owned ? (
            <TabPanel className={classes.panel} value={value} index={4}>
              <DeletePanel
                roomName={props.roomName}
                delete={props.delete}
              ></DeletePanel>
            </TabPanel>
          ) : null}

          <CancelIcon
            className={classes.exit}
            onClick={handleClose}
          ></CancelIcon>
        </div>
      </div>
    </Modal>
  );
}
