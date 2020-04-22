import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchbarValue } from "../../redux/ui/ui.actions";
// mui icons:
import SearchIcon from "@material-ui/icons/Search";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import AppsIcon from "@material-ui/icons/Apps";

import "./home-search-bar.styles.scss";

const HomeSearchBar = ({ setSearchbarValue }) => {
  const handleChange = (e) => {
    setSearchbarValue(e.target.value);
  };

  return (
    <div className="home-search-bar-container">
      <Link to="/lobby">
        <AppsIcon />
      </Link>

      <div className="search-input-container">
        {/* <label className="search-input-label">search</label> */}
        <input
          className="search-input"
          type="text"
          placeholder="search..."
          onChange={handleChange}
        />
      </div>
      <Link to="/search">
        <SearchIcon />
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchbarValue: state.ui.searchbarValue,
});

const mapDispatchToProps = (dispatch) => ({
  setSearchbarValue: (uid) => dispatch(setSearchbarValue(uid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeSearchBar);
