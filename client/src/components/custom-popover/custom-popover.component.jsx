import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import "./custom-popover.styles.scss";

const useStyles = makeStyles(theme => ({
  popover: {
    // pointerEvents: "none"
    fontSize: "1rem",
    fontWeight: "bold"
    // cursor: "pointer"
    // display: "none"
  },
  paper: {
    // padding: theme.spacing(1),

    borderRadius: "3px",
    margin: 0,
    padding: 0,
    borderTop: `8px solid ${theme.palette.primary.main}`,
    marginTop: "1em",
    zIndex: 5000
  }
}));

export default function MouseOverPopover({
  popoverMode = "default",
  anchorOrigin,
  transformOrigin,
  children,
  content
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const togglePopover = event => {
    if (anchorEl) {
      handlePopoverClose();
    } else {
      handlePopoverOpen(event);
    }
  };

  const open = Boolean(anchorEl);

  // console.log("child", children);
  let newChildWithOnClick;
  let newContent;

  if (popoverMode === "default") {
    newChildWithOnClick = React.cloneElement(children, {
      onClick: togglePopover
    });

    newContent = React.cloneElement(content, {
      onMouseLeave: handlePopoverClose,
      onClick: togglePopover
    });
  } else if (popoverMode === "hover") {
    newChildWithOnClick = React.cloneElement(children, {
      onMouseOver: handlePopoverOpen
    });

    newContent = React.cloneElement(content, {
      onMouseEnter: handlePopoverOpen,
      onMouseLeave: handlePopoverClose
    });
  }

  return (
    <div>
      <Typography
        aria-owns={open ? "mouse-over-popover" : undefined}
        aria-haspopup="true"
        // onMouseEnter={handlePopoverOpen}
        // onMouseLeave={handlePopoverClose}
      >
        {newChildWithOnClick}
        {/* {children} */}
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper
        }}
        open={open}
        anchorEl={anchorEl}
        // anchorOrigin={{
        //   vertical: "bottom",
        //   horizontal: "right"
        // }}
        // transformOrigin={{
        //   vertical: "top",
        //   horizontal: "right"
        // }}

        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {newContent}
      </Popover>
    </div>
  );
}
