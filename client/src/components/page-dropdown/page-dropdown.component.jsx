import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";

// icons:
// import { ReactComponent as PeopleIcon } from "../../assets/icons/user-circle-solid.svg";
// import { ReactComponent as XIcon } from "../../assets/icons/times-solid.svg";

import "./page-dropdown.styles.scss";

const PageDropdown = ({ className, userAuth, ...otherProps }) => (
  <div
    {...otherProps}
    className={`page-dropdown-container ${className ? className : ""}`}
  >
    <Link to="/about">
      <div className="text gap">About</div>
    </Link>
    <Link to="/contact">
      <div className="text gap">Contact</div>
    </Link>
    <Link to="/codeofconduct">
      <div className="text gap">Code of Conduct</div>
    </Link>
    {/* <Link to="/userprofile"> */}
    <Link to={`/userprofile/id=${userAuth.uid}`}>
      <div className="text gap">User Profile</div>
    </Link>

    <div onClick={() => auth.signOut()} className="text">
      Logout
    </div>
  </div>
);

// export default PageDropdown;

const mapStateToProps = ({ user, room }) => ({
  userAuth: user.userAuth,
});

export default connect(mapStateToProps)(PageDropdown);
