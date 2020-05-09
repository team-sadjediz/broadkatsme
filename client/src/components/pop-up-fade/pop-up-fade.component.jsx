import React, { useEffect, useState } from "react";

// custom style sheet:
import "./pop-up-fade.styles.scss";

const PopUpFade = ({ text, className, children, ...props }) => {
  // useEffect(()=>{},[])
  return (
    <div className={`pop-up-fade-container ${className ? className : ""}`}>
      {text}
    </div>
  );
};

export default PopUpFade;
