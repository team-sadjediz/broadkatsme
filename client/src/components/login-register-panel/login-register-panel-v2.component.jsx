import React, { useState, useEffect } from "react";

// custom components:
import LogIn from "../login/login.component";
import Register from "../register/register.component";

import "./login-register-panel-v2.styles.scss";

const LoginRegisterPanel = ({ className, content, button }) => {
  const [expandRegister, setExpandRegister] = useState(false);
  const [varB, setVarB] = useState([]);

  useEffect(() => {
    // same as componentDidMount() (not really but sorta; read up on this)
  }, []);

  const toggleRegister = () => {
    setExpandRegister(!expandRegister);
  };

  return (
    <div className="login-register-panel-container">
      <div className="login-pane-container">
        <LogIn className="login-style-override" />
      </div>

      <div onClick={toggleRegister} className={`expand-register-btn`}></div>

      <div
        className={`register-pane-container ${
          expandRegister ? "expand-rg" : ""
        }`}
      >
        {/* <div onClick={toggleRegister} className={`expand-register-btn`}></div> */}
        <Register className="register-style-override" />
      </div>
    </div>
  );
};

export default LoginRegisterPanel;
