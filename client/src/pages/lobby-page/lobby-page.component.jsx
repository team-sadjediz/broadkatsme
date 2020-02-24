// import React from "react";

// import "./lobby-page.styles.scss";

// const LobbyPage = () => <div className="lobby-page">Lobby Page</div>;

// export default LobbyPage;

import React, {Component} from "react";
import Card from "../../components/card/card.component";
import data from "./data/data.js"
import axios from "axios";
import { connect } from "react-redux";
import {ReactComponent as NextBtn} from "../../assets/icons/caret-right-solid.svg";
import {ReactComponent as BackBtn} from "../../assets/icons/caret-left-solid.svg";

import "./lobby-page.style.scss";

class LobbyPage extends React.Component{
 constructor(props){
    super(props);
    this.state = {
    uid: this.props.currentUser.uid,
    properties: []
    }
 }
 
    nextProperty = () => {
        const newIndex = this.state.property.index+1;
        this.setState({
            property: data.properties[newIndex]
        })
        
    }

    prevProperty = () => {
        const newIndex = this.state.property.index-1;
        this.setState({
            property: data.properties[newIndex]
        })
    }
    componentDidMount() {
        axios
        .get("http://localhost:5000/api/home/users-rooms?uid=" + this.state.uid)
        .then(rooms => {
            const properties = rooms.data;
            this.setState({properties: rooms.data});
            // this.setState({property: JSON.stringify(rooms.data)});
            console.log(JSON.stringify(rooms.data));
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

        return(
            <div className="container">
                <div className="active-container">
                    <div id='active_header' className='header'>FEATURED ROOMS</div>

                    <div className="cards-carousel-wrapper">
                    {
                            this.state.properties.map(property=> 
                            <div className="zoom">
                                <Card key={ property.roomID } property={ property }></Card>
                                {/* <div className="room-name"> NAME: { property.name }</div>
                                <div className="room-tags"> TAGS: { property.tags } </div> */}
                            </div>
                            )
                        }
                    </div>

                    
                </div>
                <BackBtn className="back-btn"/>
                <NextBtn className="next-btn"/> 
                {/* <img className="next-btn" src="https://image.flaticon.com/icons/svg/126/126490.svg" disabled={this.state.property.index === data.properties.length-3}
                 onClick={() => this.nextProperty()}></img> */}
                {/* <button className='back-btn' onClick={() => this.prevProperty()} disabled={property.index === 0}>
                    Prev
                </button>
                <button className='next-btn' onClick={() => this.nextProperty()} disabled={property.index === data.properties.length-1}>
                    Next
                </button> */}
                <div className="featured-container">
                    <div id="featured_header" className='header'>ACTIVE ROOMS</div>
                    <div className="cards-grid">
                    {
                        this.state.properties.map(property=> 
                        <div className="zoom">
                            <Card key={ property.roomID } property={ property }></Card>
                        </div>
                        )
                    }
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

