import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { BASE_API_URL } from "../../utils";
import PropTypes from "prop-types";

//components
import Card from "../../components/card/card.component";
import CardTwo from "../../components/card/card-two.component";
import UserCard from "../../components/card/user-card.component";
import SearchCard from "../../components/card/search-card/search-card.component";
import FormInput from "../../components/form-input/form-input.component";
import Divider from '@material-ui/core/Divider';
import CircleBtn from "../../components/circle-btn/circle-btn.component";
// import Poppity from "../../components/poppity/poppity-v2.component";
// import NewRoom from "../../components/new-room/new-room.component";
import Popper from '@material-ui/core/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';

//svg and styling
import "./search-page.style.scss";

// for filter
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilterListIcon from '@material-ui/icons/FilterList';

//////////TO DO//////////
// - styling issues with the app bar not staying the same size... not dynamic to window size either
// need media query container
// - fix the grid... (idk not a priority either)

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.userAuth.uid,
      // uid: "h2pO0PwXsycrNuOHKenZSAaKRl42",
      featureRooms: [],
      featureSize: 8,
      userRooms: [],
      activeRooms: [],
      search: "",
      filterBy: "",
      selectedRoom: "",
      tabValue: 1,
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
    // Get User Rooms
    axios
      .get(`${BASE_API_URL}/search/rooms`)
      .then(rooms => {
        // console.log("user rooms: " + rooms);
        this.setState({ userRooms: rooms.data });
        // console.log(rooms.data);
      })
      .catch(error => {
        console.error(error);
        // console.log("oof");
      });
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

  render() {

    let filteredUsers = this.findUsers();

    let filteredUserRooms = this.state.userRooms.filter(
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
        if (this.state.filterBy === "") {
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
        {/* <Poppity
          // triggerType="click"
          triggerComponent={
            <CircleBtn
            className="filter-button"
            icon={<FilterListIcon />}
            />
          }
          spacingTop="1rem"
          contentAnchorPoint="top middle"
          childrenAnchorPoint="bottom middle"
        > */}

        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <div>
              {/* <Button variant="contained" color="primary" {...bindToggle(popupState)}>
                Toggle Popper
              </Button> */}
              <CircleBtn
              className="filter-button"
              icon={<FilterListIcon />}
              {...bindToggle(popupState)}
              />
              <Popper {...bindPopper(popupState)} transition>
                {({ TransitionProps }) => (
                          <div className="filter-popup">
                  <FormControl variant="outlined" >
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
                  </FormControl>
                            </div>
                )}
              </Popper>
            </div>
          )}
        </PopupState>



        {/* </Poppity> */}
                  <FormInput className="search-input" label="search" value={this.state.search} handleChange={this.handleFilter.bind(this)}></FormInput>

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
                <div>
                <div className="search-results">
                  {!this.state.isSearchingUsers &&
                      filteredUserRooms.map(property=> 
                        
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
                  {
                    this.state.isSearchingUsers &&
                    <div className='search-users'>
                      {
                      filteredUsers.map(property=> 
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
                  </div>
                  </div>
                </div>
        </div>

        {/* <BackBtn className="back-btn" onClick={() => this.prevProperty()} />
        <NextBtn className="next-btn" onClick={() => this.nextProperty()} /> */}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  // currentUser: state.user.currentUser,
  userAuth: state.user.userAuth
});

export default connect(mapStateToProps)(SearchPage);
