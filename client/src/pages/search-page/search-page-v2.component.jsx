import React, { useState, useEffect } from "react";

// misc:
import axios from "axios";
import { BASE_API_URL } from "../../utils";
import { connect } from "react-redux";
import NoResults from "../../assets/graphics/no_search_results.png";

// custom components:
import UserCard from "../../components/card/user-card.component";
import SearchCard from "../../components/card/search-card/search-card.component";
import CustomButton from "../../components/custom-button/custom-button.component";

// mui components:
import CircularProgress from "@material-ui/core/CircularProgress";
import FilterListIcon from "@material-ui/icons/FilterList";

// custom stylesheet:
import "./search-page-v2.styles.scss";

const SearchPage = ({ searchbarValue, userAuth }) => {
  const [results, setResults] = useState({ rooms: [], tags: [], users: [] });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("none");

  useEffect(() => {
    let source = axios.CancelToken.source();
    const fetchData = async () => {
      setLoading(true);

      try {
        // request to get ALL data for the search terms and THEN filter on client side
        // hence the filter = none
        const res = await axios.get(
          `${BASE_API_URL}/search/queries?search=${searchbarValue}&filter=none`,
          { cancelToken: source.token }
        );

        setResults(res.data);
        setLoading(false);
      } catch (e) {
        if (axios.isCancel(e)) {
          // console.log("canceled request");
        } else {
          console.error(e);
        }
      }
    };

    if (searchbarValue !== "") fetchData();

    return () => {
      // console.log("canceling axios request");
      setLoading(false);
      source.cancel();
    };
  }, [searchbarValue]);

  // when filter is changed, re-render.
  // this 2nd useEffect is to avoid an extra api call when the user changes the filter
  useEffect(() => {}, [filter]);

  return (

    <div
      className={`search-page-container`}
      onClick={() => {
        console.log(`SEARCH RESULTS for ${searchbarValue}`, results);
        console.log("loading:", loading);
      }}
    >
      {/* FILTER SELECTOR: PLEASE RESTYLE / REORGANIZE */}
      <div className="filter-selector-container">
        <FilterListIcon 
          className="filter-icon"
        />
        <CustomButton
          className={filter === "none" ? "filter-selector" : "filter-selector-off"}
          onClick={() => {
            setFilter("none");
          }}
        >
          none
        </CustomButton>
        <CustomButton
          className={filter === "room" ? "filter-selector" : "filter-selector-off"}
          onClick={() => {
            setFilter("room");
          }}
        >
          room
        </CustomButton>

        <CustomButton
          className={filter === "user" ? "filter-selector" : "filter-selector-off"}
          onClick={() => {
            setFilter("user");
          }}
        >
          user
        </CustomButton>

        <CustomButton
          className={filter === "tags" ? "filter-selector" : "filter-selector-off"}
          onClick={() => {
            setFilter("tags");
          }}
        >
          tags
        </CustomButton>
      </div>

      {loading && (
          <div className="filter-selector">
            <CircularProgress className="loader" />
            <div>LOADING...</div>
          </div>
        )}
        
      {(filter === "room" || filter === "none") && !loading
        ? results.rooms.map((room, i) => (
            <SearchCard
              key={i}
              uid={userAuth.uid}
              roomID={room._id}
              ownerID={room.ownerID}
              username={
                room.user_profile[0] ? room.user_profile[0].username : ""
              }
              avatar={room.user_profile[0] ? room.user_profile[0].photoURL : ""}
              roomName={room.name}
              tags={room.tags}
              occupancy={room.settings}
              thumbnail={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=${room.thumbnailUrl}`}
              subscribe
            />
          ))
        : null}

      {(filter === "user" || filter === "none") && !loading
        ? results.users.map((user, i) => (
            <UserCard
              key={i}
              username={user.username}
              avatar={user.photoURL}
              bio={user.biography}
              uid={user.userID}
            />
          ))
        : null}

      {(filter === "tags" || filter === "none") && !loading
        ? results.tags.map((room, i) => (
            <SearchCard
              key={i}
              uid={room.uid}
              roomID={room._id}
              ownerID={room.ownerID}
              username={
                room.user_profile[0] ? room.user_profile[0].username : ""
              }
              avatar={room.user_profile[0] ? room.user_profile[0].photoURL : ""}
              roomName={room.name}
              tags={room.tags}
              occupancy={room.settings}
              thumbnail={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=${room.thumbnailUrl}`}
              subscribe
            />
          ))
        : null}

        {results.tags.length === 0  && results.rooms.length === 0 && results.users.length === 0 && !loading ? 
          <div className="no-results-container">
            <img className="no-results-image" src={NoResults} />
            <div className="no-results">We couldn't find what you're looking for :(</div>
              {/* <div className="no-results">No Search Results</div> */}
          </div>
         : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  searchbarValue: state.ui.searchbarValue,
  userAuth: state.user.userAuth,
});

export default connect(mapStateToProps)(SearchPage);
