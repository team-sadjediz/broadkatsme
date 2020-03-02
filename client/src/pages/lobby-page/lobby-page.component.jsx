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

class LobbyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.currentUser.uid,
      properties: []
    };
  }

  componentDidMount() {
    axios
      // .get("http://localhost:5000/api/home/users-rooms?uid=" + this.state.uid)
      // .get(
      //   "http://broadkatsme.herokuapp.com/api/home/users-rooms?uid=" +
      //     this.state.uid
      // )
      .get(`${BASE_API_URL}/userprops/users-rooms?uid=${this.state.uid}`)
      .then(rooms => {
        const properties = rooms.data;
        this.setState({ properties: rooms.data });
      })
      .catch(error => {
        console.error(error);
        console.log("oof");
      });
  }


  render() {
    return (
      <div className="container">
        <div className="featured-container">
          <div id="featured_header" className="header">
            FEATURED ROOMS
          </div>
          <Carousel
              properties={this.state.properties}
              cardType="two"
              uid={this.state.uid}
          />
        </div>
        {/* <BackBtn className="back-btn" onClick={() => this.prevProperty()} />
        <NextBtn className="next-btn" onClick={() => this.nextProperty()} /> */}

        <div className="active-container">
          <div id="active_header" className="header">
            ACTIVE ROOMS
          </div>
          <Carousel
              properties={this.state.properties}
              cardType="one"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(LobbyPage);
