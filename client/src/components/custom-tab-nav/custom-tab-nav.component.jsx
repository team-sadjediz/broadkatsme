import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
// icons:
import NotificationsIcon from "@material-ui/icons/Notifications";
import ChatIcon from "@material-ui/icons/Chat";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

import "./custom-tab-nav.styles.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
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

// class VerticalTabs extends React.Component {
export default function VerticalTabs({ drawerOpen }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [title, setTitle] = "sdf";

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log("hello", value);
  };

  console.log("sdf", drawerOpen);
  return (
    <div className="custom-tab-nav-container">
      {drawerOpen}
      <div className="drawer-header-container">
        {drawerOpen ? <div className={`drawer-header`}>my title</div> : null}
      </div>
      <div className={classes.root}>
        <TabNav
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
        >
          {/* <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
          <TabNavIconButton icon={<NotificationsIcon />}></TabNavIconButton>
          <TabNavIconButton
            icon={<SupervisedUserCircleIcon />}
          ></TabNavIconButton>
          <TabNavIconButton icon={<ChatIcon />}></TabNavIconButton>
        </TabNav>

        <TabPanel value={value} index={0}>
          Item Odsfsdfsne
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
    </div>
  );
}
