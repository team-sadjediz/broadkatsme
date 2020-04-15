import React from "react";

// import "./poppity.style.scss";
import { ReactComponent as CaretUp } from "../../assets/icons/caret-up-solid-flush.svg";

class Poppity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      enabled: false,
    };
  }

  togglePoppity = (event) => {
    // const { value, name } = event.target;
    this.setState({ enabled: !this.state.enabled });
  };

  onMouseEnter = (event) => {
    this.setState({ enabled: true });
  };

  onMouseLeave = (event) => {
    this.setState({ enabled: false });
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
    let newChildWithOnClick;
    let newContent;
    let btnAction = this.props.btnAction;

    if (btnAction === "hover") {
      newChildWithOnClick = React.cloneElement(this.props.children, {
        onMouseEnter: this.onMouseEnter,
        onMouseLeave: this.onMouseLeave,
        onClick: this.togglePoppity,
      });

      newContent = React.cloneElement(this.props.content, {
        onMouseLeave: this.onMouseLeave,
      });
    } else {
      // also handles btnAction="click"
      newChildWithOnClick = React.cloneElement(this.props.children, {
        onClick: this.togglePoppity,
      });

      newContent = React.cloneElement(this.props.content, {
        onClick: this.togglePoppity,
      });
    }

    return (
      <div className="poppity-container">
        {newChildWithOnClick}
        <div className="pop-up-container">
          <div className={`triangle ${this.state.enabled ? "" : "disabled"}`}>
            <CaretUp />
          </div>
          <div
            className={`dropdown-container ${this.setAlignment()} ${
              this.state.enabled ? "" : "disabled"
            }`}
          >
            {newContent}
          </div>
        </div>
      </div>
    );
  }
}

export default Poppity;
