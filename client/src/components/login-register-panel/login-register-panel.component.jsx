import React from "react";

import LogIn from "../login/login.component";
import Register from "../register/register.component";

import CustomButton from "../custom-button/custom-button.component";
import "./login-register-panel.style.scss";

let LoginComponent = <LogIn className="fields" />;
let RegisterComponent = <Register className="fields"></Register>;

class LoginRegisterPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tabSelected: "login",
      panelRendered: LoginComponent
    };
  }

  switchTab = event => {
    let componentToUse = "";
    let selectedTab = "";

    if (event.target.className.includes("login-tab-btn")) {
      selectedTab = "login";
      componentToUse = LoginComponent;
    } else {
      selectedTab = "register";
      componentToUse = RegisterComponent;
    }

    this.setState({
      tabSelected: selectedTab,
      panelRendered: componentToUse
    });
  };

  render() {
    return (
      <div className="login-register-panel">
        <div className="tab-options">
          <CustomButton
            className={`login-tab-btn ${
              this.state.tabSelected === "login" ? "tabselected" : ""
            }`}
            onClick={this.switchTab}
          >
            Login
          </CustomButton>
          <CustomButton
            className={`register-tab-btn ${
              this.state.tabSelected === "register" ? "tabselected" : ""
            }`}
            onClick={this.switchTab}
          >
            Register
          </CustomButton>
        </div>
        {this.state.panelRendered}
      </div>
    );
  }
}

export default LoginRegisterPanel;
