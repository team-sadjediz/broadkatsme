import React from "react";

import "./poppity.style.scss";
import { ReactComponent as CaretUp } from "../../assets/icons/caret-up-solid-flush.svg";


// const Poppity = ({ children, arrowGap = 0, alignArrow }) => (

// );

class Poppity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: false
    };
  }

  togglePoppity = event => {
    // const { value, name } = event.target;
    this.setState({ enabled: !this.state.enabled });
  };

  setAlignment = () => {
    if (this.props.alignArrow === "right") {
      return "align-right";
    } else if (this.props.alignArrow === "left") {
      return "align-left";
    } else {
      return "align-center";
    }
  };

  render() {
    let newChildWithOnClick = React.cloneElement(this.props.children, {
      onClick: this.togglePoppity
    });

    console.log(this.props.content);
    return (
      <div className="poppity-container">
        {newChildWithOnClick}

        <div className="pop-up-container">
          <div
            className={`triangle ${this.state.enabled ? "" : "disabled"}`}
          >
            <CaretUp></CaretUp>
          </div>
          <div className={`dropdown-container ${this.setAlignment()} ${this.state.enabled ? "" : "disabled"}`}>
              {this.props.content}
            </div>
        </div>
      </div>
    );
  }
}

export default Poppity;
