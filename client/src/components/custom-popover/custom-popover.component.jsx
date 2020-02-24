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
    padding: theme.spacing(1),
    borderRadius: "3px",
    margin: 0,
    padding: 0,
    borderTop: `8px solid ${theme.palette.primary.main}`,
    marginTop: "1em"
  }
}));

export default function MouseOverPopover({
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

  console.log("child", children);
  let newChildWithOnClick = React.cloneElement(children, {
    onClick: togglePopover
  });

  let newContent = React.cloneElement(content, {
    onMouseLeave: handlePopoverClose,
    onClick: togglePopover
  });

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
