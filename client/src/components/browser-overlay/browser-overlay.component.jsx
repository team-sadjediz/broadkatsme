import React from "react";
// import axios from "axios";

import VolumeSlider from "./volume-slider/volume-slider.component";

import { withStyles } from "@material-ui/core/styles";

import "./browser-overlay.style.scss";

const useStyles = theme => ({});

const BrowserOverlay = ({ volume, handleVolume, className, ...otherProps }) => {
  const classes = useStyles();

  return (
    <div className={`overlay ${className ? className : ""}`}>
      <div className="volume-bar">
        <VolumeSlider handleVolume={handleVolume} volume={volume} />
      </div>
    </div>
  );
};

export default withStyles(useStyles)(BrowserOverlay);
