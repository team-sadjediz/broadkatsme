import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import CancelIcon from "@material-ui/icons/Cancel";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "white",
    display: "flex",
    // displayContent: "center",
    width: "80%",
    height: "80%",
    maxHeight: "800px",
    maxWidth: "1280px",
    border: "none",
    outline: 0
    // margin: "auto"
    // Without Modal
    // marginTop: "1em",
    // maxHeight: "800px",
    // width: "1280px"
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
    // outline: 0
  },
  tabs: {
    borderRight: "1px solid grey",
    minWidth: "max-content"
  },
  panelContainer: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 2em",
    // display: "flex",
    paddingTop: 10,
    paddingBottom: 10
  },
  panel: {
    gridColumn: 1
    // flexGrow: 2
  },
  panelBorder: {
    marginRight: 10,
    gridColumn: 2
  }
  //   paper: {
  //     position: "absolute",
  //     width: "100vw",
  //     height: "100vh",
  //     backgroundColor: "pink",
  //     border: "2x solid #000"
  //   }
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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.toggleSettingsModal();
    setOpen(false);
  };

  const tabs = props.tabs.map((tab, index) => {
    return <Tab label={tab} id={`vertical-tab-${index}`}></Tab>;
  });

  const panels = props.panels.map((panel, index) => {
    return (
      <TabPanel className={classes.panel} value={value} index={index}>
        {panel}
      </TabPanel>
    );
  });

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
          className={classes.tabs}
        >
          {tabs}
        </Tabs>
        <div className={classes.panelContainer}>
          {panels}
          <CancelIcon className={classes.panelBorder}></CancelIcon>
        </div>
      </div>
    </Modal>
  );
}
