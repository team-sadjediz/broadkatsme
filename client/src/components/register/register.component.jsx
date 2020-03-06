import React from "react";
import axios from "axios";
import { auth } from "../../firebase/firebase.utils";
import { BASE_API_URL } from "../../utils";

// components:
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./register.style.scss";
class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  }

  componentDidMount() {
    console.log("reigster has mounted");
  }

  componentWillUnmount() {
    console.log("bye im unmounting");
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { username, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // validation for username:
    let usernameValid = await axios
      .get(`${BASE_API_URL}/userprofile/validate-username`, {
        params: { requestedUsername: username }
      })
      .then(res => {
        console.log(res);
        return true; // username is valid
      })
      .catch(error => {
        console.error(error);

        if (error.response) {
          console.error("HINT", error.response.data);
          alert(error.response.data.msg);
        }

        return false; // not neccessary but whatever
      });

    console.log("username", usernameValid);

    // firebase register:
    let newUserAuth;
    if (usernameValid) {
      newUserAuth = await auth
        .createUserWithEmailAndPassword(email, password)
        .then(async userAuth => {
          // mongodb register:
          await axios
            .post(`${BASE_API_URL}/register/new-user`, {
              "uid": newUserAuth.user.uid,
              "username": username
            })
            .then(res => console.log("User successfully created."))
            // if we get to this point, it means that someone finished inserting another UserProfile
            // with values that
            .catch(error => {
              if (error.response) {
                console.error("MONGODB ERROR:", error.response.data.message);
                console.error(error);
                newUserAuth.user.delete(); // deletes the firebase user if
              }
            });
        })
        .catch(error => {
          console.error(error);
          return null;
        });
    }

    this.setState({
      uid: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
  };

  handleChange = event => {
    const { value, name } = event.target;
    console.log("reg:", event.target.name);
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
            maxLength="16"
            required
          />

          <FormInput
            className="email-field"
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            // pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
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
            // pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
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
            name="confirmPassword"
            type="password"
            handleChange={this.handleChange}
            value={this.state.confirmPassword}
            label="confirm password"
            // pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
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
