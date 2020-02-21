import React from "react";

import "./poppity.style.scss";

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
        {/* <div className={`shadow ${this.state.enabled ? "" : "disabled"}`}></div> */}
        {newChildWithOnClick}

        <div className="pop-up-container">
          <div
            className={`triangle ${this.state.enabled ? "" : "disabled"}`}
            style={{ top: parseInt(this.props.arrowGap) }}
          >
            <div className={`dropdown-container ${this.setAlignment()}`}>
              {this.props.content}
            </div>
            {/* <div className="shadow"></div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Poppity;
