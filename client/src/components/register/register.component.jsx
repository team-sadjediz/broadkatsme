import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import ShowHide from "../show-hide-input/show-hide-input.component";
import axios from "axios";
import "./register.style.scss";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "s2A4hxdIP1WjqtwmCSsyDNBtvQA2",
      username: "",
      email: "",
      password: "",
      verf_password: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const user = {
      "uid": this.state.uid,
      "username": this.state.username,
      "email": this.state.email,
      "password": this.state.password,
      "vpassword": this.state.verf_password
  };

  axios
      .post("http://localhost:5000/register/new-user", user)
      .then(() => console.log("User posted to backend/created."))
      .catch(error => {
                  console.error(error);
      });
  };

  handleChange = event => {
    const { value, name } = event.target;
    // console.log("a:", event.target.name);
    this.setState({ [name]: value });
  };
 
  render() {
    return (
      <div
        className={`register-container ${
          this.props.className ? this.props.className : ""
        }`}
      >
        <form className="form-container">
          <FormInput
            className="username-field"
            name="username"
            type="username"
            handleChange={this.handleChange}
            value={this.state.username}
            label="username"
            required
          />

          <FormInput
            className="email-field"
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
            required
          />
          <FormInput
            className="password-field"
            name="password"
            type="password"
            handleChange={this.handleChange}
            value={this.state.password}
            label="password"
            minLength="8"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
            required
          />
          
          {/* <ShowHide
            className="password-field"
            name="password"
            handleChange={this.handleChange}
            value={this.state.password}
            label="password"
            minlength="8"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
            required
          /> */}

          <FormInput
            className="password-field2"
            name="verf_password"
            type="password"
            handleChange={this.handleChange}
            value={this.state.verf_password}
            label="confirm password"
            minLength="8"
            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
            required
          />

          <CustomButton className="register-btn" type="submit" onClick={this.handleSubmit}>
            register
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default Register;
