import React, { useState, useEffect } from "react";

// custom components:
import LogIn from "../login/login.component";
import Register from "../register/register.component";

import "./login-register-modal.styles.scss";

const LoginRegisterModal = ({ className, content, button }) => {
  const [varA, setVarA] = useState("");
  const [varB, setVarB] = useState([]);

  useEffect(() => {
    // same as componentDidMount() (not really but sorta; read up on this)
  }, []);

  return (
    <div className="login-register-modal">
      <div className="modal-backdrop"></div>

      <div className="modal-content">
        <LogIn />
        <Register />
      </div>
    </div>
  );
};

export default LoginRegisterModal;
