import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "white",
    display: "flex",
    // position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 2000
  },
  tabs: {
    borderRight: "1px solid aquamarine"
  },
  container: {
    flex: "1 1 100%",
    display: "flex",
    flexDirection: "column",
    overflow: "auto"
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

export default function RoomSettings() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        // contentContainerStyle={classes.container}
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        className={classes.tabs}
      >
        <Tab label="Settings 0" id="vertical-tab-0" />
        <Tab label="Settings 1" id="vertical-tab-1" />
        <Tab label="Settings 2" id="vertical-tab-2" />
        <Tab label="Settings 3" id="vertical-tab-31" />
        <Tab label="Settings 4" id="vertical-tab-4" />
        <Tab label="Settings 5" id="vertical-tab-5" />
        <Tab label="Settings 6" id="vertical-tab-6" />
        <Tab label="Settings 7" id="vertical-tab-7" />
        <Tab label="Settings 8" id="vertical-tab-8" />
        <Tab label="Settings 9" id="vertical-tab-9" />
        <Tab label="Settings 10" id="vertical-tab-10" />
        <Tab label="Settings 11" id="vertical-tab-11" />
        <Tab label="Settings 12" id="vertical-tab-12" />
        <Tab label="Settings 13" id="vertical-tab-13" />
        <Tab label="Settings 14" id="vertical-tab-14" />
        <Tab label="Settings 15" id="vertical-tab-15" />
        <Tab label="Settings 16" id="vertical-tab-16" />
        <Tab label="Settings 17" id="vertical-tab-17" />
        <Tab label="Settings 18" id="vertical-tab-18" />
        <Tab label="Settings 19" id="vertical-tab-19" />
        <Tab label="Settings 20" id="vertical-tab-20" />
      </Tabs>
      <TabPanel value={value} index={0}>
        Settings 0 Here
      </TabPanel>
      <TabPanel value={value} index={1}>
        Settings 1 Here
      </TabPanel>
      <TabPanel value={value} index={2}>
        Settings 2 Here
      </TabPanel>
      <TabPanel value={value} index={3}>
        Settings 3 Here
      </TabPanel>
      <TabPanel value={value} index={4}>
        Settings 4 Here
      </TabPanel>
      <TabPanel value={value} index={5}>
        Settings 5 Here
      </TabPanel>
      <TabPanel value={value} index={6}>
        Settings 6 Here
      </TabPanel>
      <TabPanel value={value} index={7}>
        Settings 7 Here
      </TabPanel>
      <TabPanel value={value} index={8}>
        Settings 8 Here
      </TabPanel>
      <TabPanel value={value} index={9}>
        Settings 9 Here
      </TabPanel>
      <TabPanel value={value} index={10}>
        Settings 10 Here
      </TabPanel>
      <TabPanel value={value} index={11}>
        Settings 11 Here
      </TabPanel>
      <TabPanel value={value} index={12}>
        Settings 12 Here
      </TabPanel>
      <TabPanel value={value} index={13}>
        Settings 13 Here
      </TabPanel>
      <TabPanel value={value} index={14}>
        Settings 14 Here
      </TabPanel>
      <TabPanel value={value} index={15}>
        Settings 15 Here
      </TabPanel>
      <TabPanel value={value} index={16}>
        Settings 16 Here
      </TabPanel>
      <TabPanel value={value} index={17}>
        Settings 17 Here
      </TabPanel>
      <TabPanel value={value} index={18}>
        Settings 18 Here
      </TabPanel>
      <TabPanel value={value} index={19}>
        Settings 19 Here
      </TabPanel>
      <TabPanel value={value} index={20}>
        Settings 20 Here
      </TabPanel>
    </div>
  );
}
