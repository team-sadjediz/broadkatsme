import React from "react";
import PropTypes from "prop-types";

// components:
import NewRoom from "../new-room/new-room.component";
import Chat from "../chat/chat.component";
import RoomSubscribe from "../room-subscribe/room-subscribe.component";
import HeaderInfo from "../header-info/header-info.component";

// mui components:
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

// icons:
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

// custom style sheet:
import "./custom-tab-nav.styles.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{
        flexGrow: 1,
        margin: "0.2em",
        whiteSpace: "pre-wrap",
        width: 200
      }}
      hidden={value !== index}
    >
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        {children}
      </div>
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "row",
    minWidth: "192px",
    maxWidth: "100%",
    width: "100%",
    height: "auto"
  }
}));

const TabNav = withStyles(theme => ({
  root: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: theme.palette.primary.main,
    minWidth: "53px",
    width: "53px",
    borderRight: `1px solid ${theme.palette.divider}`
  },
  indicator: {
    width: 3,
    left: 0,
    zIndex: 2001
    // width: "100%",
    // opacity: 0.8,
    // backgroundColor: "black"
  }
}))(Tabs);

const TabNavIconButton = withStyles(theme => ({
  root: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: theme.palette.primary.main,
    minWidth: "53px",
    width: "53px"
  },
  selected: {
    color: theme.palette.secondary.main
  },
  textColorInherit: {
    opacity: 1
  }
}))(Tab);

const NavItemDetails = [
  { index: 0, title: "Notification" },
  { index: 1, title: "Friends List" },
  { index: 2, title: "Chat" }
];

// class VerticalTabs extends React.Component {
export default function DrawerTabs({ drawerOpen }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="custom-tab-nav-container">
      <div
        className={`drawer-header-container ${
          !drawerOpen ? "bg-close" : "bg-open"
        }`}
      >
        {drawerOpen ? (
          <div className={`drawer-header`}>{NavItemDetails[value].title}</div>
        ) : null}
      </div>

      <div className={classes.root}>
        <TabNav
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="vertical tab"
        >
          <TabNavIconButton icon={<NotificationsIcon />}></TabNavIconButton>
          <TabNavIconButton
            icon={<SupervisedUserCircleIcon />}
          ></TabNavIconButton>
          <TabNavIconButton icon={<ChatIcon />}></TabNavIconButton>
        </TabNav>

        <TabPanel value={value} index={0}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <HeaderInfo />
            <RoomSubscribe />
          </div>

          {/* <Chat drawerOpen={drawerOpen} /> */}
          {/* yellowyyyoysoydfsjldfjs */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <NewRoom />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Chat drawerOpen={drawerOpen} />
        </TabPanel>
      </div>
    </div>
  );
}
