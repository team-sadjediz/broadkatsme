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
  style,
  className,
  content,
  children,
  buttonEventTrigger = "click",
  childrenAnchorPoint,
  contentAnchorPoint,
  spacing = "0px",
  spacingClass = "",
  backdrop = false,
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

  const setChildrenAnchorPoint = () => {
    switch (childrenAnchorPoint) {
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

  const determineSpacingProperty = () => {
    return true;
  };

  const isValidAnchorPoint = () => {
    // contentAnchorPoint
    return false;
  };

  let newChild;
  let newContent;
  // let btnAction = btnAction;

  if (buttonEventTrigger === "hover") {
    newChild = React.cloneElement(children, {
      onMouseEnter: onMouseEnter,
      // onMouseLeave: onMouseLeave,
      onClick: togglePoppity,
    });

    newContent = React.cloneElement(content, {
      onMouseLeave: onMouseLeave,
    });
  } else {
    // also handles btnAction="click"
    newChild = React.cloneElement(children, {
      onClick: togglePoppity,
    });

    newContent = React.cloneElement(content, {
      onClick: togglePoppity,
      onMouseLeave: onMouseLeave,
    });
  }

  return (
    // <React.Fragment>
    <div className={`poppity-container`}>
      {/* <div className={`${enabled ? "custom-backdrop" : ""}`}></div> */}
      {newChild}
      <div className={`ch-anchor-point ${setChildrenAnchorPoint()}`}>
        <div className={`pop-up-container`}>
          {/* <div className={`triangle ${enabled ? "" : "disabled"}`}>
          <CaretUp />
        </div> */}

          <div
            style={style}
            // style={{ padding: `${spacing}` }}
            className={`dropdown-container ${setContentAnchorPoint()} ${
              enabled ? "" : "disabled"
            }`}
          >
            {newContent}
            {/* <div className="backdrop"></div> */}
          </div>
        </div>
      </div>
    </div>
    // </React.Fragment>
  );
};

export default Poppity;
