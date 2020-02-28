import React from "react";
import clsx from "clsx";

// icons:
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// mui components:
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";

// components:
import VerticalTabs from "../custom-tab-nav/custom-tab-nav.component";

import "./custom-drawer.styles.scss";

const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
    zIndex: 0
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap" //
  },
  drawerPaper: {
    width: drawerWidth,
    position: "relative"
    // variant: "outlined"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  drawerOpen: {
    backgroundColor: "#eceff1",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    position: "relative"
  },
  drawerClose: {
    backgroundColor: "white",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: "3em",
    // width: theme.spacing(7) + 1,
    // [theme.breakpoints.up("sm")]: {
    //   width: theme.spacing(9) + 1
    // },
    position: "relative",
    borderRight: `2px solid ${theme.palette.divider}`
  },
  content: {
    overflow: "auto",
    overflowY: "auto",
    // overflowX: "hidden", // will eventually have this option on
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    // padding: theme.spacing(3),
    padding: "0.5em",
    boxSizing: "border-box",
    // margin: "1em",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
    // marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  toggleBtnPositionOpened: {
    position: "absolute",
    right: 0,
    margin: `calc((48px - 32px) / 2)`
  },
  toggleBtnPositionClosed: {
    position: "absolute",
    marginTop: "calc((48px - 32px) / 2)",
    left: "50%",
    transform: "translate(-50%, 0)"
  }
}));

const ToggleDrawerButton = withStyles(theme => ({
  root: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "white",
    backgroundColor: theme.palette.primary.main,
    // width: "32px",
    // height: "32px",
    // margin: "0.5em",
    "&:hover": { backgroundColor: theme.palette.secondary.main },
    // position: "absolute",
    // right: 0,
    zIndex: 2001
  }
}))(IconButton);

const PersistentDrawerLeft = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        // variant="persistent"
        variant="permanent"
        anchor="left"
        open={open}
        // classes={{
        //   paper: classes.drawerPaper,
        //   className: "custom-drawer"
        // }}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
      >
        <ToggleDrawerButton
          // className={classes.toggleBtnPositionOpened}
          className={
            open
              ? classes.toggleBtnPositionOpened
              : classes.toggleBtnPositionClosed
          }
          size="small"
          onClick={toggleDrawer}
        >
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </ToggleDrawerButton>
        <VerticalTabs drawerOpen={open}></VerticalTabs>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        })}
      >
        {props.children}
      </main>
    </div>
  );
};

export default PersistentDrawerLeft;
