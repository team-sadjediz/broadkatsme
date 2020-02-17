import React, { Component } from "react";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import CircleBtn from "../circle-btn/circle-btn.component";

import { ReactComponent as EyeDefault } from "../../assets/icons/eye-solid.svg";
import { ReactComponent as EyeHidden } from "../../assets/icons/eye-slash-solid.svg";

import "./show-hide-input.style.scss";
class ShowHideInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      button: <EyeDefault/>,
      text: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.buttonShow = this.buttonShow.bind(this);
  }

 handleChange(e) {
    this.setState({ text: e.target.value });
  }

 toggleShow() {
    this.setState({ hidden: !this.state.hidden });
    this.buttonShow();
  }

  buttonShow() {
    if (!this.state.hidden){
      this.setState({button: <EyeHidden/>});
    }
    else {
      this.setState({button: <EyeDefault/>});
    }
  }

  componentDidMount() {
    if (this.props.text) {
      this.setState({ text: this.props.text });
    }
  }

  render() {
    return (
      <div>
        <div className="show-hide-field">
        <FormInput
          className="password-field"
          type={this.state.hidden ? "password" : "text"}
          value={this.state.text}
          label="password"
          handleChange={this.handleChange}
        />
        </div>
        <div className="show-hide-button">
        <CircleBtn type="button" onClick={this.toggleShow} icon={this.state.button}></CircleBtn>
        </div>
      </div>
    );
  }
  
}

export default ShowHideInput;
