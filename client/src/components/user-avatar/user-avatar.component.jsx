import React, { useState, useEffect } from "react";
import "./user-avatar.styles.scss";

const defaultImageUrl =
  "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80";

const UserAvatar = ({
  className,
  imgUrl = defaultImageUrl,
  onlineStatus = null,
  square = false,
  ...otherProps
}) => {
  return (
    <div {...otherProps} className={`user-avatar-container ${className}`}>
      <img className={square ? "" : "circle"} src={imgUrl} alt=""></img>

      <div
        className={`online-status ${
          onlineStatus === null ? "" : onlineStatus ? "online" : "offline"
        }`}
      ></div>
    </div>
  );
};

export default UserAvatar;
