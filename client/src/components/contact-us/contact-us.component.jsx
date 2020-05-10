import React, { useState, useEffect } from "react";
import "./contact-us.styles.scss";

import FormInput from "../../components/form-input/form-input.component";
import Button from "@material-ui/core/Button";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

//   useEffect(() => {
//     // same as componentDidMount() (not really but sorta; read up on this)
//   }, []);

    const handleNameChange = (e) => {
        setName( e.target.value );
    };

    const handleEmailChange = (e) => {
        setEmail( e.target.value );
    };

    const handleMessageChange = (e) => {
        setMessage( e.target.value );
    };

  return(
    <div className="contact-form-container">
        <div className="contact-title">
        Questions?
        </div>
        <div className="contact-sub-title">
        Contact Us
        </div>
        <form className="contact-form" method="POST">
            <FormInput
              label="name"
              name="name"
              value={name}
              handleChange={handleNameChange}
            />

            <FormInput
              label="email"
              name="email"
              value={email}
              handleChange={handleEmailChange}
            />

            <FormInput
              label="message"
              name="message"
              value={message}
              handleChange={handleMessageChange}
            />
            <Button
            // type="submit"
            className="contact-submit-button">
                Submit
            </Button>
        </form>
    </div>
  );
};

export default ContactUs;