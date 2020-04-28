import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { BASE_API_URL } from "../../utils";
import PropTypes from "prop-types";

//components
import UserCard from "../../components/card/user-card.component";
import SearchCard from "../../components/card/search-card/search-card.component";
import FormInput from "../../components/form-input/form-input.component";
import Divider from '@material-ui/core/Divider';
import CircleBtn from "../../components/circle-btn/circle-btn.component";
import CustomButton from "../../components/custom-button/custom-button.component";
// import Poppity from "../../components/poppity/poppity-v2.component";
// import NewRoom from "../../components/new-room/new-room.component";
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import FilterSearch from "../../components/filter-search/filter-search.component";

//svg and styling
import "./search-page.style.scss";

// for filter
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilterListIcon from '@material-ui/icons/FilterList';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.userAuth.uid,
      roomResults: [],
      userResults: [],
      search: "",
      filterBy: "none",
      selectedRoom: "",
      isSearchingUsers: false,
      users: [],
    };
  }

  handleFilter(e) {
    this.setState({search: e.target.value});
  }

  handleSelect(e) {
    this.setState({filterBy: e.target.value});
    if (e.target.value == 'users') {
      this.state.isSearchingUsers = true;
      }
    else {
      this.state.isSearchingUsers = false;
    }
  }

  handleSelectRoom = e => {
    // this.setState({selectedRoom: e.target.value});
    // console.log(e.target.value);
  }

  componentDidMount() {
    // // Get User Rooms
    // axios
    //   .get(`${BASE_API_URL}/search/rooms`)
    //   .then(rooms => {
    //     // console.log("user rooms: " + rooms);
    //     this.setState({ roomResults: rooms.data });
    //     // console.log(rooms.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     // console.log("oof");
    //   });
    //   axios
    //   .get(`${BASE_API_URL}/search/rooms`)
    //   .then(rooms => {
    //     // console.log("user rooms: " + rooms);
    //     this.setState({ roomResults: rooms.data });
    //     // console.log(rooms.data);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     // console.log("oof");
    //   });
  }

  handleChange = (event, newValue) => {
    this.setState({tabValue: newValue});
  }

  findUsers = e => {
      if (this.state.isSearchingUsers) {
        axios
        .get(`${BASE_API_URL}/search/user/${this.state.search}`)
        .then(user => {
          // console.log("user rooms: " + rooms);
          this.setState({ users: user.data });
          // console.log(rooms.data);
        })
        .catch(error => {
          console.error(error);
          // console.log("oof");
        });
      }
      return this.state.users;
  }

  submitSearch = async (e) => {
    // const data = {
    //   query: {
    //     "name" : this.state.search,
    //     "tags" : this.state.search,
    //   },
    // }

    axios
    .get(`${BASE_API_URL}/search/queries?search=${this.state.search}&filter=${this.state.filterBy}`)
    .then(response => {
      console.log("users: ", response.data.users);
      // console.log("rooms: ",response.data.rooms);
      // console.log("tags: ",response.data.tags);
      this.setState({userResults: response.data.users});
      this.setState({roomResults: Object.assign(response.data.rooms, response.data.tags)})

    })
    .catch(error => {
      console.error(error);
      // console.log("oof");
    });

    return this.state.users;
  }

  render() {

    let results = this.state.roomResults;
    let resultsUser = this.state.userResults;
    let filteredRoomResults = this.state.roomResults.filter(
      (room) => {
        if (this.state.filterBy === "tags") {
          let found = false;
          for (let tag = 0; tag < room.tags.length; tag++){
            if (room.tags[tag].toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1){
              found = true;
            }
          }
          return found;
        }
        if (this.state.filterBy === "roomName") {
          return room.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        }
        if (this.state.filterBy === "none") {
          let found = false;
          for (let tag = 0; tag < room.tags.length; tag++){
            if (room.tags[tag].toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1){
              found = true;
            }
          }
          if (room.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1){
            found = true;
          }
          return found;
        }
        return -1;
      }
    );

    return (
      <div className="container">
        <div className="display-view">

          <PopupState variant="popper" popupId="demo-popup-popper">
            {(popupState) => (
              <div>
                <CircleBtn
                className="filter-button"
                icon={<FilterListIcon />}
                {...bindToggle(popupState)}
                />
                <Popper {...bindPopper(popupState)} transition>
                  {({ TransitionProps }) => (
                    <FilterSearch />
                  )}
                </Popper>
              </div>
            )}
          </PopupState>
          {/* <FormControl variant="outlined" >
            <InputLabel id="demo-simple-select-outlined-label">
              Filter
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={this.state.filterBy}
              onChange={this.handleSelect.bind(this)}
            >
              <MenuItem value={"roomName"}>room name</MenuItem>
              <MenuItem value={"tags"}>tags</MenuItem>
              <MenuItem value={"users"}>users</MenuItem>
            </Select>
          </FormControl> */}

          <div className="search-page">
            {/* <div className="search-bar"> */}
              <FormInput className="search-input" label="search" value={this.state.search} handleChange={this.handleFilter.bind(this)}></FormInput>
              <CustomButton className="search-submit" label="search-button" onClick={this.submitSearch}>
                Enter
              </CustomButton>
            {/* </div> */}
          <div>
          <div className="search-results">
            {/* {!this.state.isSearchingUsers &&
                filteredRoomResults.map(property=> 
                  
                    <SearchCard
                      uid={ this.state.uid }
                      roomID={ property.roomID }
                      ownerID={ property.ownerID }
                      roomName={ property.name }  
                      tags={ property.tags } 
                      occupancy={ property.settings }
                      thumbnail={ `${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=${property.thumbnailUrl}` }
                      onMouseEnter={this.handleSelectRoom.bind(property.roomID)}
                      subscribe
                    />
                  
                )
            } */}
            {
              <div className='search-users'>
                {(this.state.filterBy == "none" || this.state.filterBy == "user") &&
                results.map(property=> 
                  <div>
                    <UserCard
                    username={property.username}
                    avatar={property.photoURL}
                    bio={property.biography}
                    uid={property.userID}
                    />
                    <Divider variant="middle" />
                  </div>
                    )
                  }
              </div>
            }
            {(this.state.filterBy == "none" || this.state.filterBy == "room" || this.state.filterBy == "tags" ) &&
                results.map(property=> 
                    <SearchCard
                      uid={ this.state.uid }
                      roomID={ property.roomID }
                      ownerID={ property.ownerID }
                      roomName={ property.name }  
                      tags={ property.tags } 
                      occupancy={ property.settings }
                      thumbnail={ `${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=${property.thumbnailUrl}` }
                      onMouseEnter={this.handleSelectRoom.bind(property.roomID)}
                      subscribe
                    />
                )
            }
            </div>
          </div>
        </div>
      </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  // currentUser: state.user.currentUser,
  userAuth: state.user.userAuth
});

export default connect(mapStateToProps)(SearchPage);
