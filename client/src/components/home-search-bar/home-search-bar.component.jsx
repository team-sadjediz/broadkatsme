import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSearchbarValue } from "../../redux/ui/ui.actions";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
// mui icons:
import SearchIcon from "@material-ui/icons/Search";
import DashboardIcon from "@material-ui/icons/Dashboard";
import HomeIcon from "@material-ui/icons/Home";
import AppsIcon from "@material-ui/icons/Apps";

import "./home-search-bar.styles.scss";

const HomeSearchBar = ({ setSearchbarValue, location }) => {
  const [searchbarPlaceholder, setSearchbarPlaceholder] = useState("search...");
  const browserHistory = useHistory();
  const browserLocation = useLocation();

  const handleChange = (e) => {
    setSearchbarValue(e.target.value);
  };

  const changePlaceHolderText = (e) => {
    setSearchbarPlaceholder("to the dashboard!");
  };

  const resetPlaceHolderText = (e) => {
    setSearchbarPlaceholder("search...");
  };

  const submitSearch = (e) => {
    if (e.key === "Enter") {
      if (browserLocation.pathname !== "/search")
        browserHistory.push("/search");
    }
  };

  return (
    <div className="home-search-bar-container" onKeyDown={submitSearch}>
      <Link
        id="home-btn"
        to="/lobby"
        onMouseEnter={changePlaceHolderText}
        onMouseLeave={resetPlaceHolderText}
      >
        <AppsIcon />
      </Link>

      <div className="search-input-container">
        {/* <label className="search-input-label">search</label> */}
        <input
          className="search-input"
          type="text"
          placeholder={searchbarPlaceholder}
          onChange={handleChange}
        />
      </div>
      <Link
        to="/search"
        onKeyPress={() => {
          console.log("---------------");
        }}
      >
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
