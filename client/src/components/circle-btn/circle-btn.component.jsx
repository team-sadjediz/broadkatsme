import React from "react";

import { ReactComponent as PlayIcon } from "../../assets/icons/play-solid.svg";

import "./circle-btn.style.scss";

const CircleButton = ({
  onClick,
  children,
  className,
  icon,
  text,
  bgImageUrl,
  ...otherProps
}) => (
  <button
    onMouseEnter={otherProps.onMouseEnter}
    onClick={onClick}
    className={`circle-btn-container ${className ? className : ""}`}
  >
    {(() => {
      if (icon) {
        return icon;
      } else if (text) {
        return <div className="text">{text}</div>;
      }
    })()}
  </button>
);

export default CircleButton;
