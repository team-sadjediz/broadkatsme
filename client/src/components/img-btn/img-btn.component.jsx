import React from "react";

import SlowMotionVideoIcon from "@material-ui/icons/SlowMotionVideo";
import "./img-btn.styles.scss";

const ImageButton = ({
  onClick,
  children,
  className,
  icon,
  bgImageUrl,
  iconHover,
  ...otherProps
}) => (
  <div
    {...otherProps}
    onMouseEnter={otherProps.onMouseEnter}
    onClick={onClick}
    className={`img-btn-container ${className ? className : ""}`}
  >
    <img className="image-fill" src={bgImageUrl} alt="" />
    <div className="icon-hover">{iconHover}</div>
  </div>
);

export default ImageButton;
