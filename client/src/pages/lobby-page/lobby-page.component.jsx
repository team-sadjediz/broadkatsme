// import React from "react";

// import "./lobby-page.styles.scss";

// const LobbyPage = () => <div className="lobby-page">Lobby Page</div>;

// export default LobbyPage;

import React, { Component } from "react";
import Card from "../../components/card/card.component";
import data from "./data/data.js";
import axios from "axios";
import { connect } from "react-redux";
import { ReactComponent as NextBtn } from "../../assets/icons/caret-right-solid.svg";
import { ReactComponent as BackBtn } from "../../assets/icons/caret-left-solid.svg";

import { BASE_API_URL } from "../../utils";

import "./lobby-page.style.scss";

class LobbyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: this.props.currentUser.uid,
      properties: []
    };
  }

  nextProperty = () => {
    const newIndex = this.state.property.index + 1;
    this.setState({
      start: this.state.start[newIndex]
    });
  };

  prevProperty = () => {
    const newIndex = this.state.property.index - 1;
    this.setState({
      start: this.state.start[newIndex]
    });
  };

  indexing(data) {
    for (const e of data) {
      this.state.index.push(e);
    }
    console.log(this.state.index);
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
        // this.setState({property: JSON.stringify(rooms.data)});
        console.log("hewo:", this.state.properties);
        // this.setState({start: this.state.index[0]});
        // console.log(Object.keys(this.state.start));
        this.setState({ property: properties[0]});

      })
      .catch(error => {
        console.error(error);
        console.log("oof");
      });
  }
  render() {
    // const {properties, property} = this.state;
    // const slide = {
    //     transform: `translateX(${-property.index*(100/properties.length)}%)`
    // };

    return (
      <div className="container">
        <div className="active-container">
          <div id="active_header" className="header">
            FEATURED ROOMS
          </div>

          <div className="cards-carousel-wrapper">
            {this.state.properties.map(property => (
              <div className="zoom">
                <Card key={property.roomID} property={property}></Card>
                {/* <div className="room-name"> NAME: { property.name }</div>
                                <div className="room-tags"> TAGS: { property.tags } </div> */}
              </div>
            ))}
          </div>
        </div>
        {/* disabled={Object.keys(this.state.start) === 0} */}
        {/* disabled={property.index === data.properties.length-1} */}
        <BackBtn className="back-btn" onClick={() => this.prevProperty()} />
        <NextBtn className="next-btn" onClick={() => this.nextProperty()} />
        {/* <img className="next-btn" src="https://image.flaticon.com/icons/svg/126/126490.svg" disabled={this.state.property.index === data.properties.length-3}
                 onClick={() => this.nextProperty()}></img> */}
        {/* <button className='back-btn' onClick={() => this.prevProperty()} disabled={property.index === 0}>
                    Prev
                </button>
                <button className='next-btn' onClick={() => this.nextProperty()} disabled={property.index === data.properties.length-1}>
                    Next
                </button> */}
        <div className="featured-container">
          <div id="featured_header" className="header">
            ACTIVE ROOMS
          </div>
          <div className="cards-grid">
            {this.state.properties.map(property => (
              <div className="zoom">
                <Card key={property.roomID} property={property}></Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      // <div>hello {this.state.properties}</div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(LobbyPage);
