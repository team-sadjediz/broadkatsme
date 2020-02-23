import React from "react";
import axios from "axios";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

// components:
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import ShowHide from "../show-hide-input/show-hide-input.component";

// icons:
import { ReactComponent as GoogleLogoColorful } from "../../assets/icons/google-logo-colorful.svg";
// import { ReactComponent as GoogleLogo } from "../../assets/icons/google-logo-solid.svg";

import "./login.style.scss";

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    console.log("email:", this.state.email, "pw:", this.state.password);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log("log in error:", error);
    }
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
        <form className="form-container">
          <FormInput
            className="email-field"
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />

          <FormInput
            className="password-field"
            name="password"
            type="password"
            handleChange={this.handleChange}
            value={this.state.password}
            label="password"
            required
          />

          {/* <ShowHide
            className="password-field"
            name="password"
            type="password"
            handleChange={this.handleChange}
            value={this.state.password}
            label="password"
            required
          /> */}

          <CustomButton
            className="login-btn"
            type="submit"
            onClick={this.handleSubmit}
          >
            login
          </CustomButton>
          <CustomButton className="google-login-btn" onClick={signInWithGoogle}>
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
