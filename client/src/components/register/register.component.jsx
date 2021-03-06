import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { auth, createUserProfileMongoDB } from "../../firebase/firebase.utils";
import { BASE_API_URL } from "../../utils";
import { updateCurrentUser } from "../../redux/user/user.actions";

// custom components:
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

// custom stylesheet:
import "./register.style.scss";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  // componentDidMount() {
  //   console.log("Register has mounted");
  // }

  // componentWillUnmount() {
  //   console.log("Register will unmount");
  // }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { username, email, password, confirmPassword } = this.state;

    console.log("checking password match");
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log(BASE_API_URL);
    // 1. Validate username:
    await axios
      .get(`${BASE_API_URL}/userprofile/validate-username`, {
        params: { requestedUsername: username },
      })
      .then(async (res) => {
        // 2. Create a firebase user
        console.log("Username is VALID");
        console.log("Starting to create a FIREBASE user");
        await auth
          .createUserWithEmailAndPassword(email, password)
          .then(async (userAuth) => {
            // 3. Create a mongoDB user (UserProfile schema/model)
            console.log(
              "Successfully created a FIREBASE user:",
              userAuth.user.uid
            );
            console.log("Starting to create a MongoDB user (UserProfile)");
            await createUserProfileMongoDB(userAuth, {
              username: this.state.username,
            });

            this.props.updateCurrentUser(userAuth.user.uid);
          });
      })
      .then((res) => {
        // 4. Clear Register component state
        console.log("Clearing state info");
        this.setState({
          uid: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          console.error("HINT", error.response.data);
          alert(error.response.data.msg);
        }
      });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div
        className={`register-container ${
          this.props.className ? this.props.className : ""
        }`}
      >
        {/* <p className="register-title">account registration</p> */}
        <form className="form-container" onSubmit={this.handleSubmit}>
          <FormInput
            className="username-field field-spacing-bottom"
            name="username"
            type="username"
            handleChange={this.handleChange}
            value={this.state.username}
            label="username"
            maxLength="16"
            required
          />

          <FormInput
            className="email-field field-spacing-bottom"
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            // pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
            required
          />

          <FormInput
            className="password-field field-spacing-bottom"
            name="password"
            type="password"
            handleChange={this.handleChange}
            value={this.state.password}
            label="password"
            minLength="8"
            required
          />

          <FormInput
            className="confirm-password-field field-spacing-bottom"
            name="confirmPassword"
            type="password"
            handleChange={this.handleChange}
            value={this.state.confirmPassword}
            label="confirm password"
            // pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$"
            required
          />

          <CustomButton
            className="register-btn field-spacing-top"
            type="submit"
          >
            register
          </CustomButton>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  updateCurrentUser: (userID) => dispatch(updateCurrentUser(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
