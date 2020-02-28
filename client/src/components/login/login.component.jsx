import React from "react";
import axios from "axios";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

// components:
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import CircleBtn from "../circle-btn/circle-btn.component";

import "./login.style.scss";

//icons
import { ReactComponent as GoogleLogoColorful } from "../../assets/icons/google-logo-colorful.svg";
import { ReactComponent as GoogleLogoIcon } from "../../assets/icons/google-logo-solid.svg";

import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      passwordVisibility: true
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    // console.log("email:", this.state.email, "pw:", this.state.password);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log("log in error:", error);
      if (error.code === "auth/user-not-found") {
        alert("wrong password");
      }
    }
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  //To-Do: On the first click, there is a button change delay
  toggleShow = () => {
    // console.log(this.state.hidden);
    this.setState({ passwordVisibility: !this.state.passwordVisibility });
    // console.log("click:" + this.state.passwordVisibility);
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
          <div className="password-container">
            <FormInput
              className="password-field"
              name="password"
              type={this.state.passwordVisibility ? "password" : "text"}
              handleChange={this.handleChange}
              value={this.state.password}
              label="password"
              required
            />
            <div className="visibility-container" onClick={this.toggleShow}>
              {this.state.passwordVisibility ? (
                <VisibilityIcon />
              ) : (
                <VisibilityOffIcon />
              )}
            </div>
          </div>
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
