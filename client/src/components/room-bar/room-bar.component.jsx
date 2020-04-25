import React, { Component } from "react";

import "./room-bar.style.scss";

import { makeStyles } from "@material-ui/core/styles";

import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

// import { ReactComponent as RefreshIcon } from "../../assets/icons/refresh.svg";
// import { ReactComponent as MoreIcon } from "../../assets/icons/three-dots.svg";
// import { ReactComponent as FavoriteIcon } from "../../assets/icons/heart.svg";
// import { ReactComponent as SettingsIcon } from "../../assets/icons/cog.svg";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import RefreshIcon from "@material-ui/icons/Refresh";
import FavoriteIcon from "@material-ui/icons/Favorite";
import SettingsIcon from "@material-ui/icons/Settings";

import CircleBtn from "../circle-btn/circle-btn.component";

const useStyles = makeStyles((theme) => ({
  root: {
    transform: "translateZ(0px)",
    // height: 36,
    // flexGrow: 1
  },
  fab: {
    height: 36,
    width: 36,
  },
  speedDial: {
    // height: 36,
    // width: "36px",
    // position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "& svg": {
      height: 20,
      width: 20,
    },
    // "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
    //   top: theme.spacing(2),
    //   left: theme.spacing(2)
    // }
  },
  activeBtn: {
    background: "#ef5350 !important",
    "& svg": {
      fill: "#fff !important",
    },
  },
}));

export default function RoomBar(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);

  const actions = [
    { icon: <RefreshIcon />, name: "Refresh", active: false },
    {
      icon: <PersonAddIcon />,
      name: "Invite",
    },
    // {
    //   icon: <FavoriteIcon />,
    //   name: "Favorite",
    //   active: props.isFavorited,
    //   onClick: props.favoriteRoom
    // },
    {
      icon: <SettingsIcon />,
      name: "Settings",
      active: false,
      onClick: props.toggleSettingsModal,
    },
    {
      icon: <DeleteForeverIcon />,
      name: "Unsubscribe",
      active: false,
      onClick: props.unsubscribe,
    },
  ];
  // const handleHiddenChange = e => {
  //   setHidden(e.target.checked);
  // };
  const check = () => {
    props.toggleSettingsModal();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={`${classes.root}`}>
      <div className={classes.exampleWrapper}>
        <SpeedDial
          className={`${classes.speedDial}`}
          classes={{ fab: classes.fab }}
          ariaLabel="More Room Buttons"
          // hidden={hidden}
          icon={<MoreHorizIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction="right"
        >
          {actions.map((action) => (
            <SpeedDialAction
              className={action.active ? classes.activeBtn : null}
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  );
}
