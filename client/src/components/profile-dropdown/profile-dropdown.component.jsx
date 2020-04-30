import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";

// mui icons:
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import "./profile-dropdown.styles.scss";

const ProfileDropdown = ({
  className,
  userAuth,
  closeComponent = () => {
    return;
  },
  ...otherProps
}) => {
  return (
    <ul {...otherProps} className={`profile-dropdown-container ${className}`}>
      <li>
        <Link to={`/userprofile/id=${userAuth.uid}`} onClick={closeComponent}>
          <AccountCircleIcon />
          <p>Profile</p>
        </Link>
      </li>
      <li>
        <Link to="/settings" onClick={closeComponent}>
          <SettingsIcon />
          <p>Settings</p>
        </Link>
      </li>
      <li>
        <a
          onClick={() => {
            auth.signOut();
            closeComponent();
          }}
        >
          <ExitToAppIcon />
          <p>Logout</p>
        </a>
      </li>
    </ul>
  );
};

// export default ProfileDropdown;

const mapStateToProps = ({ user, room }) => ({
  userAuth: user.userAuth,
});

export default connect(mapStateToProps)(ProfileDropdown);
