import React, { useState, useEffect } from "react";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

// custom components:
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
// import CircleBtn from "../circle-btn/circle-btn.component";

import "./login.style.scss";

// icons:
// import { ReactComponent as GoogleLogoColorful } from "../../assets/icons/google-logo-colorful.svg";
// import { ReactComponent as GoogleLogoIcon } from "../../assets/icons/google-logo-solid.svg";

const LogIn = ({ className, ...otherProps }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log("log in error:", error);
      if (error.code === "auth/user-not-found") {
        alert("wrong password");
      }
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className={`login-container ${className ? className : ""}`}>
      {/* <p className="login-title">account login</p> */}
      <form className="form-container">
        <FormInput
          className="email-field field-spacing-bottom"
          name="email"
          type="email"
          handleChange={handleEmailChange}
          value={email}
          label="email"
          required
        />

        <FormInput
          className="password-field field-spacing-bottom"
          name="password"
          type="password"
          handleChange={handlePasswordChange}
          value={password}
          label="password"
          required
        />

        <CustomButton
          className="login-btn field-spacing-top"
          type="submit"
          onClick={handleSubmit}
        >
          login
        </CustomButton>

        <a className="forgot-pw field-spacing-top" href="/reset">
          forgot password?
        </a>
      </form>
    </div>
  );
};

export default LogIn;
