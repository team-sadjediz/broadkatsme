import React, { useState, useEffect } from "react";

import "./poppity-v2.style.scss";
import { ReactComponent as CaretUp } from "../../assets/icons/caret-up-solid-flush.svg";

const ANCHOR_POINTS = {
  TOP_LEFT: { engVersion: "top left", coordinate: { x: 0, y: 0 } },
  TOP_MIDDLE: { engVersion: "top middle", coordinate: { x: 1, y: 0 } },
  TOP_RIGHT: { engVersion: "top right", coordinate: { x: 2, y: 0 } },
  MIDDLE_LEFT: { engVersion: "middle left", coordinate: { x: 0, y: 1 } },
  MIDDLE_MIDDLE: { engVersion: "middle middle", coordinate: { x: 1, y: 1 } },
  MIDDLE_RIGHT: { engVersion: "middle right", coordinate: { x: 2, y: 1 } },
  BOTTOM_LEFT: { engVersion: "bottom left", coordinate: { x: 0, y: 2 } },
  BOTTOM_MIDDLE: { engVersion: "bottom middle", coordinate: { x: 1, y: 2 } },
  BOTTOM_RIGHT: { engVersion: "bottom right", coordinate: { x: 2, y: 2 } },
};

const Poppity = ({
  className,
  triggerComponent,
  children,
  triggerType = "click",
  contentAnchorPoint,
  triggerAnchorPoint,
  spacingRight = "0",
  spacingLeft = "0",
  spacingTop = "0",
  spacingBottom = "0",
  backdrop = false,
  dropdownStyles = "",
}) => {
  const [enabled, setEnabled] = useState(false);

  const togglePoppity = (e) => {
    setEnabled(!enabled);
  };

  const onMouseEnter = (e) => {
    setEnabled(true);
  };

  const onMouseLeave = (e) => {
    setEnabled(false);
  };

  const setTriggerAnchorPoint = () => {
    switch (triggerAnchorPoint) {
      case ANCHOR_POINTS.TOP_LEFT.engVersion:
        return "chap-top-left";
      case ANCHOR_POINTS.TOP_MIDDLE.engVersion:
        return "chap-top-middle";
      case ANCHOR_POINTS.TOP_RIGHT.engVersion:
        return "chap-top-right";
      case ANCHOR_POINTS.MIDDLE_LEFT.engVersion:
        return "chap-middle-left";
      case ANCHOR_POINTS.MIDDLE_MIDDLE.engVersion:
        return "chap-middle-middle";
      case ANCHOR_POINTS.MIDDLE_RIGHT.engVersion:
        return "chap-middle-right";
      case ANCHOR_POINTS.BOTTOM_LEFT.engVersion:
        return "chap-bottom-left";
      case ANCHOR_POINTS.BOTTOM_MIDDLE.engVersion:
        return "chap-bottom-middle";
      case ANCHOR_POINTS.BOTTOM_RIGHT.engVersion:
        return "chap-bottom-right";
      default:
        return "chap-bottom-middle";
    }
  };

  const setContentAnchorPoint = () => {
    switch (contentAnchorPoint) {
      case ANCHOR_POINTS.TOP_LEFT.engVersion:
        return "cap-top-left";
      case ANCHOR_POINTS.TOP_MIDDLE.engVersion:
        return "cap-top-middle";
      case ANCHOR_POINTS.TOP_RIGHT.engVersion:
        return "cap-top-right";
      case ANCHOR_POINTS.MIDDLE_LEFT.engVersion:
        return "cap-middle-left";
      case ANCHOR_POINTS.MIDDLE_MIDDLE.engVersion:
        return "cap-middle-middle";
      case ANCHOR_POINTS.MIDDLE_RIGHT.engVersion:
        return "cap-middle-right";
      case ANCHOR_POINTS.BOTTOM_LEFT.engVersion:
        return "cap-bottom-left";
      case ANCHOR_POINTS.BOTTOM_MIDDLE.engVersion:
        return "cap-bottom-middle";
      case ANCHOR_POINTS.BOTTOM_RIGHT.engVersion:
        return "cap-bottom-right";
      default:
        return "cap-top-middle";
    }
  };

  const getSpacingStyle = () => {
    return {
      margin: `${spacingTop} ${spacingRight} ${spacingBottom} ${spacingLeft}`,
    };
  };

  const isValidAnchorPoint = () => {
    // contentAnchorPoint
    return false;
  };

  const closeComponent = () => {
    setEnabled(false);
  };

  let NewTriggerComponent = null;
  if (React.isValidElement(triggerComponent)) {
    switch (triggerType) {
      case "hover":
        NewTriggerComponent = React.cloneElement(triggerComponent, {
          onMouseEnter: onMouseEnter,
          onClick: togglePoppity,
        });
        break;
      case "tooltip":
        NewTriggerComponent = React.cloneElement(triggerComponent, {
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave,
          onClick: togglePoppity,
        });
        break;
      default:
        NewTriggerComponent = React.cloneElement(triggerComponent, {
          onClick: togglePoppity,
        });
    }
  }

  let NewChildrenComponent = null;
  if (React.isValidElement(children)) {
    switch (triggerType) {
      case "hover":
        NewChildrenComponent = React.cloneElement(children, {
          onMouseLeave: onMouseLeave,
          closeComponent: closeComponent,
        });
        break;
      case "tooltip":
        NewChildrenComponent = children;
        break;
      default:
        NewChildrenComponent = React.cloneElement(children, {
          closeComponent: closeComponent,
        });
    }
  }

  return (
    // <React.Fragment>
    <div className={`poppity-container`}>
      {/* <div className={`${enabled ? "custom-backdrop" : ""}`}></div> */}
      {NewTriggerComponent}
      <div className={`children-anchor-point ${setTriggerAnchorPoint()}`}>
        <div className={`content-anchor-point`}>
          <div
            style={getSpacingStyle()}
            className={`dropdown-container ${setContentAnchorPoint()} ${
              enabled ? "" : "disabled"
            } ${dropdownStyles}`}
          >
            {NewChildrenComponent}
            {/* <div className="backdrop"></div> */}
          </div>
        </div>
      </div>
    </div>
    // </React.Fragment>
  );
};

export default Poppity;
