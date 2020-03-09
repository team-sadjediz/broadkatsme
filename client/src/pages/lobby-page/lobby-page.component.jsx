import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { BASE_API_URL } from "../../utils";

//components
import Card from "../../components/card/card.component";
import Carousel from "../../components/carousel/carousel.component";

//svg and styling
import { ReactComponent as NextBtn } from "../../assets/icons/caret-right-solid.svg";
import { ReactComponent as BackBtn } from "../../assets/icons/caret-left-solid.svg";
import "./lobby-page.style.scss";

// for filter
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class LobbyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.currentUser.uid,
      featureRooms: [],
      featureSize: 8,
      userRooms: [],
      activeRooms: [],
      search: "",
      filterBy: "",
      selectedRoom: ""
    };
  }

  handleFilter(e) {
    this.setState({search: e.target.value});
  }

  handleSelect(e) {
    this.setState({filterBy: e.target.value});
  }

  handleSelectRoom = e => {
    // this.setState({selectedRoom: e.target.value});
    console.log(e.target.value);
  }
  componentDidMount() {
    // Get Random Rooms for Feature Rooms
    axios
      .get(`${BASE_API_URL}/home/get-random-rooms?size=${this.state.featureSize}`)
      .then(rooms => {
        // const properties = rooms.data;
        this.setState({ featureRooms: rooms.data });
        // console.log(rooms);
      })
      .catch(error => {
        console.error(error);
      });
    // Get User Rooms
    axios
      .get(`${BASE_API_URL}/userprops/users-rooms?uid=${this.state.uid}`)
      .then(rooms => {
        // console.log("user rooms: " + rooms);
        this.setState({ userRooms: rooms.data });
      })
      .catch(error => {
        console.error(error);
        // console.log("oof");
      });
  }
  // handleUnsubscribe(uid, roomID) {
  //   let request = {
  //     "uid": uid,
  //     // "roomID": this.state.roomID
  //     "roomID": roomID
  //   };
  //   console.log(request);
  //   axios
  //     .put(`${BASE_API_URL}/userprops/subscribed-rooms/unsubscribe`, request)
  //     .then(res => console.log(res))
  //     .catch(error => console.error(error));
  //   console.log("hello" + roomID);
  //   // console.log(this.state);
  //   // console.log(this.props);
  //   // console.log(e.target.value);
  // }
  render() {

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
        <div className="featured-container">
          <div id="featured_header" className="header">
            FEATURED ROOMS
          </div>
          <Carousel
              properties={this.state.featureRooms}
          />
        </div>
        {/* <BackBtn className="back-btn" onClick={() => this.prevProperty()} />
        <NextBtn className="next-btn" onClick={() => this.nextProperty()} /> */}

        <div className="active-container">
          <div id="active_header" className="header">
            ACTIVE ROOMS
            <input value={this.state.search} onChange={this.handleFilter.bind(this)}></input>

            <FormControl variant="outlined" >
              <InputLabel id="demo-simple-select-outlined-label">
                filter by
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.filterBy}
                onChange={this.handleSelect.bind(this)}
              >
                <MenuItem value={"roomName"}>room name</MenuItem>
                <MenuItem value={"tags"}>tags</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="cards-grid">
          {
              filteredUserRooms.map(property=> 
              <div className="card-grid-container" key={ property.roomID }>
                  <Card 
                  uid={ this.state.uid }
                  roomID={ property.roomID } 
                  name={ property.name } 
                  tags={ property.tags } 
                  thumbnailUrl={ `${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=${property.thumbnailUrl}` }
                  onMouseEnter={this.handleSelectRoom.bind(property.roomID)}
                  // unsubscribe={this.handleUnsubscribe}
                  ></Card>
              </div>
              )
          }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(LobbyPage);
