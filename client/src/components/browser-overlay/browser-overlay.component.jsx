import React, { Component } from "react";
// import axios from "axios";

import VolumeSlider from "./volume-slider/volume-slider.component";

import { makeStyles, withStyles } from "@material-ui/core/styles";

import "./browser-overlay.style.scss";

const useStyles = theme => ({});

const BrowserOverlay = ({ volume, handleVolume, className, ...otherProps }) => {
  const classes = useStyles();

  //   const handleChange = (e, newValue) => {
  //     setValue(newValue);
  //   };
  return (
    // <div className="volume-bar">
    //   <VolumeSlider />
    // </div>
    <div className={`overlay ${className ? className : ""}`}>
      <div className="volume-bar">
        <VolumeSlider handleVolume={handleVolume} volume={volume} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(BrowserOverlay);
