import React from "react";
import clsx from "clsx";

// icons:
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

// mui components:
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

// components:
import VerticalTabs from "../custom-tab-nav/custom-tab-nav.component";

import "./custom-drawer.styles.scss";

const drawerWidth = 350;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100%",
    zIndex: 0
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
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
  // paper: {
  //   variant: "outlined"
  // },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    position: "relative",
    backgroundColor: "#eceff1"
  },
  drawerClose: {
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
    backgroundColor: "#eceff1"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
    }),
    marginLeft: 0
  }
}));

const ToggleDrawerButton = withStyles(theme => ({
  root: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "white",
    backgroundColor: theme.palette.primary.main,
    width: "48px",
    height: "48px",
    margin: "9px 3px",
    // margin: "0.5em",
    "&:hover": { backgroundColor: theme.palette.secondary.main },
    position: "absolute",
    right: 0,
    zIndex: 2002
  },
  selected: {
    color: theme.palette.secondary.main
  },
  textColorInherit: {
    opacity: 1
  }
}))(IconButton);

const PersistentDrawerLeft = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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
      {/* <div
        className={`half-circle-btn ${open ? "hidden" : ""}`}
        onClick={toggleDrawer}
      >
        <ChevronRightIcon />
      </div> */}

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
        <ToggleDrawerButton onClick={toggleDrawer}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </ToggleDrawerButton>
        {/* <div className="drawer-header-container">
          <div className={`drawer-header ${open ? "" : "hidden"}`}>
            my title
          </div>
          <IconButton
            className={`close-btn outflow-top-right ${
              open ? "position-right" : "position-center"
            }`}
            // className="close-btn position-right"
            onClick={toggleDrawer}
          >
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div> */}
        {/* <div onClick={toggleDrawer} className={`${classes.drawerHeader}`}>
          <IconButton onClick={toggleDrawer} className="close-btn">
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div> */}
        {/* <Divider /> */}
        {/* <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
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
