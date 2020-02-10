import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { ReactComponent as GoogleLogoColorful } from "../../assets/icons/google-logo-colorful.svg";
import axios from "axios";
// import { ReactComponent as GoogleLogo } from "../../assets/icons/google-logo-solid.svg";

import "./login.style.scss";

class LogIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // hardcoded for testing
      uid: "s2A4hxdIP1WjqtwmCSsyDNBtvQA2",
      email: "test@test.com",
      password: "hello",
  }
  
  onSubmit = e => {
      e.preventDefault();
  
      const user = {
          "uid": this.state.uid,
          "email": this.state.email,
          "password": this.state.password
      };
    
      axios
          .post("http://localhost:5000/register/new-user", user)
          .then(() => console.log("User posted to backend/created."))
          .catch(error => {
                      console.error(error);
          });
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

          <FormInput
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
          
          {/* <CustomButton className="google-login-btn" type="submit">
            <GoogleLogoColorful />
            Google Login
          </CustomButton> */}

          <a className="forgot-pw" href="/login">
            forgot password?
          </a>
        </form>
      </div>
    );
  }
}

export default LogIn;
