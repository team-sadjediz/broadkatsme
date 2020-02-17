import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import ShowHide from "../show-hide-input/show-hide-input.component";
import { ReactComponent as GoogleLogoColorful } from "../../assets/icons/google-logo-colorful.svg";
import axios from "axios";
import { ReactComponent as GoogleLogo } from "../../assets/icons/google-logo-solid.svg";

import "./login.style.scss";

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    this.setState({ email: "", password: "" });
  };

  handleChange = event => {
    const { value, name } = event.target;
    console.log("a:", event.target.name);
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div
        className={`login-container ${
          this.props.className ? this.props.className : ""
        }`}
      >
        <form className="form-container" onSubmit={this.handleSubmit}>
          <FormInput
            className="email-field"
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />

          <ShowHide
            className="password-field"
            name="password"
            type="password"
            handleChange={this.handleChange}
            value={this.state.password}
            label="password"
            required
          />

          <CustomButton className="login-btn" type="submit">
            login
          </CustomButton>
          
          <CustomButton className="google-login-btn" type="submit">
            <GoogleLogoColorful />
            Google Login
          </CustomButton>

          <a className="forgot-pw" href="/reset">
            forgot password?
          </a>
        </form>
      </div>
    );
  }
}

export default LogIn;
