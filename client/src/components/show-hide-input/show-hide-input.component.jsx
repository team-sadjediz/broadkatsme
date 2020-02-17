import React, { Component } from "react";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import CircleBtn from "../circle-btn/circle-btn.component";
import "./show-hide-input.style.scss";
class ShowHideInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: true,
      button: "https://lh3.googleusercontent.com/proxy/ufHQeDW7nLWpUs-YcKJX9LnY3CtiMPBCatznGB18-j-UY64Ucf3DLbctaK75jMmGWlipGsXgt9zyTLXdkuyu0ckKzrp0064X9H0Y89dz15h9FDyyMlIakjEUfA",
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
      this.setState({button: "https://static.thenounproject.com/png/1159224-200.png"});
    }
    else {
      this.setState({button: "https://lh3.googleusercontent.com/proxy/ufHQeDW7nLWpUs-YcKJX9LnY3CtiMPBCatznGB18-j-UY64Ucf3DLbctaK75jMmGWlipGsXgt9zyTLXdkuyu0ckKzrp0064X9H0Y89dz15h9FDyyMlIakjEUfA"});
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
        <CircleBtn type="button" onClick={this.toggleShow} bgImageUrl={this.state.button}></CircleBtn>
        </div>
      </div>
    );
  }
  
}

export default ShowHideInput;
