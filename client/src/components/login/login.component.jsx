import React from "react";
import axios from "axios";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

// components:
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import CircleBtn from "../circle-btn/circle-btn.component";
import "./login.style.scss";
//icons
import { ReactComponent as EyeDefault } from "../../assets/icons/eye-solid.svg";
import { ReactComponent as EyeHidden } from "../../assets/icons/eye-slash-solid.svg";
import { ReactComponent as GoogleLogoColorful } from "../../assets/icons/google-logo-colorful.svg";
class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      text: "",
      hidden: true,
      button: <EyeDefault />
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
    this.setState({ [name]: value });
  };

  handleShowHide = event => {
    this.setState({ text: event.target.value });
    this.setState({ password: event.target.password });
    this.handleChange(event);
  };

  //To-Do: On the first click, there is a button change delay
  toggleShow = () => {
    console.log(this.state.hidden);
    this.setState({ hidden: !this.state.hidden });
    if (!this.state.hidden) {
      this.setState({ button: <EyeHidden /> });
    } else {
      this.setState({ button: <EyeDefault /> });
    }
    console.log("click:" + this.state.hidden);
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
              type={this.state.hidden ? "password" : "text"}
              handleChange={this.handleShowHide}
              value={this.state.password}
              label="password"
              required
            />
            <CircleBtn
              type="button"
              onClick={this.toggleShow}
              icon={this.state.button}
            />
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
