import React from "react";

import LoginRegisterPanel from "../../components/login-register-panel/login-register-panel.component";
import Modal from "../../components/modal/modal.component";
import "./login-register-page.styles.scss";
// backdropStyle={{
//   background:
//     "linear-gradient(45deg, rgba(28, 73, 219, 0.2) 0%, rgb(191, 96, 255, 0.2) 100%)",
// }}

const LoginRegisterPage = () => (
  <div className="login-register-page">
    <Modal
      defaultShow={true}
      backdrop
      backdropStyle={{
        background:
          "linear-gradient(45deg, rgba(28, 73, 219, 0.2) 0%, rgb(191, 96, 255, 0.2) 100%)",
      }}
    >
      <LoginRegisterPanel />
    </Modal>
  </div>
);

export default LoginRegisterPage;
