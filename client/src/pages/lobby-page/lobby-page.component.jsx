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
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";


import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// tabbed pages
import HomePage from "../../components/lobby/home/home.component";
import SubscribedRoomsPage from "../../components/lobby/subscription-rooms/subscription-rooms.component";
import UserRoomsPage from "../../components/lobby/user-rooms/user-rooms.component";

//svg and styling
// import { ReactComponent as NextBtn } from "../../assets/icons/caret-right-solid.svg";
// import { ReactComponent as BackBtn } from "../../assets/icons/caret-left-solid.svg";
import "./lobby-page.style.scss";
import HomeIcon from '@material-ui/icons/Home';
import AppsIcon from '@material-ui/icons/Apps';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { ReactComponent as PetAdoption } from "../../assets/graphics/undraw_pet_adoption_2qkw.svg";
// for filter
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

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
      {value === index && <Box style={{padding: 0}} p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const style = {
  // paddingTop: "10px",
  background : '#FFFFFF',
  // background: 'transparent',
  // position: 'static',
  // width: "90%",
  boxShadow: "none",
  // borderBottom: "1px solid red"
};

class LobbyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.userAuth ? this.props.userAuth.uid : "",
      // uid: "h2pO0PwXsycrNuOHKenZSAaKRl42",
      featureRooms: [],
      featureSize: 8,
      userRooms: [],
      activeRooms: [],
      tabValue: 0,
    };
  }

  handleFilter(e) {
    this.setState({ search: e.target.value });
  }

  handleSelect(e) {
    this.setState({ filterBy: e.target.value });
  }

  // handleSelectRoom = (e) => {
  //   // this.setState({selectedRoom: e.target.value});
  //   console.log(e.target.value);
  // };

  componentDidMount() {
    // if (this.props.userAuth) {
    //   // Get Random Rooms for Feature Rooms
    //   axios
    //     // .get(`${BASE_API_URL}/home/get-random-rooms?size=${this.state.featureSize}`)
    //     .get(`${BASE_API_URL}/userprops/rooms/${this.state.uid}`)
    //     .then((rooms) => {
          // this.setState({ featureRooms: this.props.subscribedRooms });
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    //   // Get User Rooms
    //   axios
    //     .get(`${BASE_API_URL}/userprops/rooms/${this.state.uid}`)
    //     .then((rooms) => {
    //       // console.log("user rooms: " + rooms);
          // this.setState({ userRooms: this.props.subscribedRooms });
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //       // console.log("oof");
    //     });
    // }
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
    this.setState({ tabValue: newValue });
  };
  render() {
    console.log("user's room: ", this.props.subscribedRooms);
    let filteredUserRooms = this.state.userRooms.filter((room) => {
      if (this.state.filterBy === "tags") {
        let found = false;
        for (let tag = 0; tag < room.tags.length; tag++) {
          if (
            room.tags[tag]
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1
          ) {
            found = true;
          }
        }
        return found;
      }
      if (this.state.filterBy === "roomName") {
        return (
          room.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1
        );
      }
      if (this.state.filterBy === "") {
        let found = false;
        for (let tag = 0; tag < room.tags.length; tag++) {
          if (
            room.tags[tag]
              .toLowerCase()
              .indexOf(this.state.search.toLowerCase()) !== -1
          ) {
            found = true;
          }
        }
        if (
          room.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
          -1
        ) {
          found = true;
        }
        return found;
      }
      return -1;
    });
    if (this.props.userAuth) {
      return (
        <div className="lobby-page-container">
          <div className="appbar-container">
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
                <Tab icon={<HomeIcon />} aria-label="home" id={`full-width-tab-${0}`} />
                <Tab icon={<PowerSettingsNewIcon />} aria-label="your Rooms" id={`full-width-tab-${1}`} />
                <Tab icon={<SubscriptionsIcon />} aria-label="Subscriptions" id={`full-width-tab-${2}`} />
              </Tabs>
            </AppBar>
          </div>
          <div className="lobby-container">
            <TabPanel className="tab-panel" value={this.state.tabValue} index={0}>
              <HomePage />
            </TabPanel>
            <TabPanel className="tab-panel" value={this.state.tabValue} index={1}>
              <UserRoomsPage />
            </TabPanel>
            <TabPanel className="tab-panel" value={this.state.tabValue} index={2}>
              <SubscribedRoomsPage />
            </TabPanel>
          </div>
        </div>
      );
    }
    else {
      return <HomePage />
    }
  }
}

const mapStateToProps = (state) => ({
  // currentUser: state.user.currentUser,
  userAuth: state.user.userAuth,
  subscribedRooms: state.room.subscribedRooms,
});

export default connect(mapStateToProps)(LobbyPage);
