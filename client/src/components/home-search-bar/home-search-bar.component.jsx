import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const inputRef = React.createRef();

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
    // submitSearch();
  };

  const goHome = (e) => {
    browserHistory.push("/lobby");
  };

  // const submitSearch = async (e) => {
  //   // const data = {
  //   //   query: {
  //   //     "name" : this.state.search,
  //   //     "tags" : this.state.search,
  //   //   },
  //   // }
  //   this.setState({ roomResults: [] });
  //   this.setState({ userResults: [] });
  //   this.setState({ isLoading: true });

  //   await axios
  //     .get(
  //       `${BASE_API_URL}/search/queries?search=${this.props.searchbarValue}&filter=${this.state.filterBy}`
  //     )
  //     .then((response) => {
  //       // console.log("users: ", response.data.users);
  //       // console.log("rooms: ",response.data.rooms);
  //       // console.log("tags: ",response.data.tags);
  //       this.setState({ userResults: response.data.users });
  //       this.setState({
  //         roomResults: Object.assign(response.data.rooms, response.data.tags),
  //       });
  //       this.setState({ isLoading: false });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       this.setState({ isLoading: false });
  //       // console.log("oof");
  //     });

  //   return this.state.users;
  // };

  return (
    <div className="home-search-bar-container" onKeyDown={submitSearch}>
      <Link
        id="home-btn"
        to="/lobby"
        onMouseEnter={changePlaceHolderText}
        onMouseLeave={resetPlaceHolderText}
        onMouseDown={goHome}
      >
        <AppsIcon />
      </Link>

      <div className="search-input-container">
        {/* <label className="search-input-label">search</label> */}
        <input
          className="search-input-1"
          type="text"
          placeholder={searchbarPlaceholder}
          onChange={handleChange}
          ref={inputRef}
        />
      </div>
      <Link
        to="/search"
        onMouseDown={() => {
          setTimeout(() => {
            if (inputRef.current) inputRef.current.focus();
          }, 100);
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
