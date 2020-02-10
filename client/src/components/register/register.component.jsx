import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./register.style.scss";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      password2: ""
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
        className={`register-container ${
          this.props.className ? this.props.className : ""
        }`}
      >
        <form className="form-container" onSubmit={this.handleSubmit}>
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

          <FormInput
            className="password-field2"
            name="password2"
            type="password"
            handleChange={this.handleChange}
            value={this.state.password2}
            label="confirm password"
            required
          />

          <CustomButton className="register-btn" type="submit">
            register
          </CustomButton>
        </form>
      </div>
    );
  }
}

export default Register;
