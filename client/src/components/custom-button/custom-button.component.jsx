import React from "react";

import "./custom-button.style.scss";

const CustomButton = ({ children, onClick, ...otherProps }) => (
  <button
    {...otherProps}
    onClick={onClick}
    className={`custom-button ${
      otherProps.className ? otherProps.className : ""
    }`}
  >
    {children}
  </button>
);

export default CustomButton;
