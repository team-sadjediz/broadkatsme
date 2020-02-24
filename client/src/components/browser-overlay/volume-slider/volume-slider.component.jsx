import React from "react";
// import axios from "axios";

import Slider from "@material-ui/core/Slider";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import { AutoScaling } from "aws-sdk";

const useStyles = makeStyles({
  //   overrides: {
  //     MuiSlider: {
  //       root: {
  //         // width: 100,
  //         height: 100,
  //         color: "#fff"
  //       }
  //     }
  //   }
  root: {
    // width: 100,
    height: "100px",
    color: "#fff"
    // "& svg": {
    //   fill: "#fff !important"
    // }
  },
  svg: {
    marginLeft: "auto",
    marginRight: "auto",
    fill: "#fff !important"
  }
});

const VolumeSlider = ({ volume, handleVolume, ...props }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(volume);
  const [prevValue, setPrevValue] = React.useState(0);

  const handleChange = (e, newValue) => {
    // console.log(value);
    setValue(newValue);
    handleVolume(newValue);
  };

  const mute = e => {
    console.log(value);
    console.log(prevValue);
    if (value > 0) {
      setPrevValue(value);
      setValue(0);
      handleVolume(0);
    } else if (value == 0) {
      setValue(prevValue);
      setPrevValue(0);
      handleVolume(prevValue);
    }
  };

  const slider = (
    <Slider
      className={classes.root}
      orientation="vertical"
      value={value}
      onChange={handleChange}
    />
  );

  if (value > 50) {
    return (
      <React.Fragment>
        {slider}
        <div onClick={mute}>
          <VolumeUpIcon onClick={mute} className={classes.svg} />
        </div>
      </React.Fragment>
    );
  } else if (value == 0) {
    return (
      <React.Fragment>
        {slider}
        <div onClick={mute}>
          <VolumeOffIcon onClick={mute} className={classes.svg} />
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {slider}
        <div onClick={mute}>
          <VolumeDownIcon className={classes.svg} />
        </div>
      </React.Fragment>
    );
  }
};

export default VolumeSlider;
