import React, { useState, useEffect } from "react";

// custom components:
// import LogIn from "../login/login.component";
// import Register from "../register/register.component";
import LoginRegisterPanel from "../login-register-panel/login-register-panel.component";

import "./modal.styles.scss";

const Modal = ({ className, content, button }) => {
  const [varA, setVarA] = useState("");
  const [varB, setVarB] = useState([]);

  useEffect(() => {
    // same as componentDidMount() (not really but sorta; read up on this)
  }, []);

  return (
    <div className="modal-container">
      <div className="modal-backdrop"></div>

      <div className="modal-content">
        <LoginRegisterPanel />
      </div>
    </div>
  );
};

export default Modal;
