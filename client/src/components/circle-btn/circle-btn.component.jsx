import React from "react";

import { ReactComponent as PlayIcon } from "../../assets/icons/play-solid.svg";

import "./circle-btn.style.scss";

const CircleBtn = ({
  onClick,
  children,
  className,
  icon,
  text,
  bgImageUrl,
  ...otherProps
}) => (
  <div
    onMouseEnter={otherProps.onMouseEnter}
    onClick={onClick}
    className={`circle-btn ${className ? className : ""}`}
  >
    {(() => {
      if (icon) {
        return icon;
      } else if (text) {
        return <div className="text">{text}</div>;
      } else if (bgImageUrl) {
        return (
          <div className="image-container">
            <img className="image-fill" src={bgImageUrl} alt="" />
            <div className="hover-overlay">{<PlayIcon />}</div>
          </div>
        );
      }
    })()}
  </div>
);

export default CircleBtn;
