import React from "react";

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
  <div onClick={onClick} className={`circle-btn ${className ? className : ""}`}>
    {(() => {
      if (icon) {
        return icon;
      } else if (text) {
        return <div className="text">{text}</div>;
      } else if (bgImageUrl) {
        return (
          <div className="image-container">
            <img className="image-fill" src={bgImageUrl} alt="" />
            <div className="hover-overlay"></div>
          </div>
        );
      }
    })()}
  </div>
);

export default CircleBtn;
