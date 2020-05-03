import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { BASE_API_URL } from "../../utils";
import PropTypes from "prop-types";

//components
import Card from "../../components/card/card.component";
import CardTwo from "../../components/card/card-two.component";
import FormInput from "../../components/form-input/form-input.component";
import Carousel from "../../components/carousel/carousel.component";
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


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

//////////TO DO//////////
// - styling issues with the app bar not staying the same size... not dynamic to window size either
// need media query container
// - fix the grid... (idk not a priority either)
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      // id={`full-width-tabpanel-${index}`}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

const style = {
  // paddingTop: "10px",
  background : '#FFFFFF',
  // background: 'transparent',
  // position: 'static',
  width: '100%',
  boxShadow: 'none',
  // borderBottom: "1px solid red"
};

class LobbyPage extends React.Component {
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
      tabValue: 1
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
      // .get(`${BASE_API_URL}/home/get-random-rooms?size=${this.state.featureSize}`)
      .get(`${BASE_API_URL}/userprops/rooms/${this.state.uid}`)
      .then(rooms => {
        this.setState({ featureRooms: rooms.data });
      })
      .catch(error => {
        console.error(error);
      });
    // Get User Rooms
    axios
      .get(`${BASE_API_URL}/userprops/rooms/${this.state.uid}`)
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

  handleChange = (event, newValue) => {
    this.setState({tabValue: newValue});
  }
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
        <div className="lobby-tabs">
        <AppBar className="app-bar" position="static" style={style}>
        <Tabs
          value={this.state.tabValue}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="tabs"
          centered
        >
          <Tab label="Home" id={`full-width-tab-${0}`} />
          <Tab label="Your Rooms" id={`full-width-tab-${1}`} />
          <Tab label="Subscriptions" id={`full-width-tab-${2}`} />
          <Tab label="Favorites" id={`full-width-tab-${3}`} />
        </Tabs>
      </AppBar>
        <TabPanel value={this.state.tabValue} index={0}>
            <div className="featured-container">
              <Carousel
                  properties={this.state.featureRooms}
              />
            </div>
        </TabPanel>
        <TabPanel value={this.state.tabValue} index={1}>
                <div className="active-container">
                    <FormInput className="search-input" label="search" value={this.state.search} handleChange={this.handleFilter.bind(this)}></FormInput>
                    {/* <FormControl variant="outlined" >
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
                    </FormControl> */}
                  <div>
                    <Grid container spacing={1}>
                  {
                      filteredUserRooms.map(property=> 
                      // <div className="card-grid-container" key={ property.roomID }>
                      <Grid item xs={4} zeroMinWidth>
                          <CardTwo
                          style={{"margin" : "10px"}}
                          uid={ this.state.uid }
                          roomID={ property.roomID } 
                          name={ property.name }  
                          tags={ property.tags } 
                          thumbnailUrl={ `${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=${property.thumbnailUrl}` }
                          onMouseEnter={this.handleSelectRoom.bind(property.roomID)}
                          unsubscribe
                          invite
                          chat
                          // unsubscribe={this.handleUnsubscribe}
                          ></CardTwo>
                          </Grid>
                      // </div>
                      )
                  }
                  </Grid>
                  </div>
                </div>
        </TabPanel>
        <TabPanel value={this.state.tabValue} index={2}>
          Subscriptions
        </TabPanel>
        <TabPanel value={this.state.tabValue} index={3}>
          Favorites
        </TabPanel>
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

export default connect(mapStateToProps)(LobbyPage);
