import React from "react";
import { Link } from "react-router-dom";
import "./page-dropdown.styles.scss";

const PageDropdown = ({ className, ...otherProps }) => (
  <div className={`page-dropdown-container ${className ? className : ""}`}>
    <Link to="/about">
      <div className="text gap">About</div>
    </Link>
    <Link to="/contact">
      <div className="text gap">Contact</div>
    </Link>

    <Link to="/codeofconduct">
      <div className="text">Code of Conduct</div>
    </Link>
  </div>
);

export default PageDropdown;
