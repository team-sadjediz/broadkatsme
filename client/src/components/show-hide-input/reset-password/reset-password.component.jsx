import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./reset-password.style.scss";
class ResetPassword extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            email: "",
            password: "",
            isCodeSent: false,
            isVerified: false, 
            verifyPassword: "",
            isVerifying: false,
            isCodeSending: false
        };
    }
    validateCodeForm() {
        return this.state.email.length > 0;
    }
    validateResetForm() {
        return (
            this.state.code.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.verifyPassword
        );
    }

    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    // handleSendCodeClick = async e => {
    //     e.preventDefault();
    //     this.setState({isCodeSending: true});

    //     try {
    //         await Auth.forgotPassword(this.state.email);
    //         this.setState({ isCodeSent: true});
    //     } catch (error) {
    //         alert(error.message);
    //         this.setState({ isCodeSending: false })
    //     }
    // };

    handleVerifyClick = async e => {
        e.preventDefault();
        this.setState({ isVerifying: true });

        // try {
        //     await Auth.forgotPasswordSubmit(
        //         this.state.email,
        //         this.state.code,
        //         this.state.password
        //     );
        //     this.setState({ isVerified: true });
        // }
        // catch (error) {
        //     alert(e.message);
        //     this.setState({ isVerifying: false });
        // }
    };

    // Ask user for their email information
    renderRequestCodeForm() {
        return (
            <form className="form-container">
                <FormInput
                className="email-field"
                name="email"
                type="email"
                value={this.state.email}
                handleChange={this.handleChange}
                label="forgot password"
                required
                />
                <CustomButton
                className="submit-btn"
                type="submit"
                isLoading={this.state.isCodeSending}
                disabled={!this.validateCodeForm}>
                submit
                </CustomButton>
            </form>
        );
    }

    renderConfirmationForm() {
        return(
        <form onSubmit={this.handleConfirmClick}>
            <FormInput
            className="confirmation-field"
            handleChange={this.handleChange}
            label="confirmation code"
            value={this.state.code}
            />
            <div>Please check your email ({this.state.email}) for the confirmation code.</div>
            <FormInput
            className="password-field"
            handleChange={this.handleChange}
            label="new password"
            value={this.state.password}
            />
            <FormInput
            className="password-field"
            handleChange={this.handleChange}
            label="confirm new password"
            value={this.state.verifyPassword}
            />
            <CustomButton
            className="submit-btn"
            type="submit"
            isLoading={this.state.isVerifying}
            disabled={!this.validateResetForm}>
            submit
            </CustomButton>
        </form>
        );
    }
    
    renderSuccessMessage(){
        return (
            <div className="success-msg">
                <p>Your password was reset.</p>
                <Link to="/login">Login</Link>
            </div>
        );
    }

    render() {
        return (
            <div className="reset-pw">
                {!this.state.isCodeSent
                ? this.renderRequestCodeForm()
                : !this.state.isVerified
                ? this.renderConfirmationForm()
                : this.renderSuccessMessage()}
            </div>
        )
    }
}

export default ResetPassword;