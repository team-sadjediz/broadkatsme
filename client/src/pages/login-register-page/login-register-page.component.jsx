import React from "react";

// import LoginRegisterPanel from "../../components/login-register-panel/login-register-panel.component";
import LoginRegisterModal from "../../components/login-register-modal/login-register-modal.component";
import "./login-register-page.styles.scss";

const LoginRegisterPage = () => (
  <div className="login-register-page">
    {/* <LoginRegisterPanel /> */}
    <LoginRegisterModal />
  </div>
);

export default LoginRegisterPage;
