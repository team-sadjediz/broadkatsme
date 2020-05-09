import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import Card from "../../components/card/card.component";
import CardTwo from "../../components/card/card-two.component";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../../utils";
import { ReactComponent as NextBtn } from "../../assets/icons/caret-right-solid.svg";
import { ReactComponent as BackBtn } from "../../assets/icons/caret-left-solid.svg";
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";

import "./carousel.style.scss";

class Carousel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeCard: 0,
            rooms: [],
        };
    }

  changeActiveCard = (activeCard) => this.setState({ activeCard });

    componentDidMount() {
        if (this.props.random) {
            let randomRooms = [];
            axios
                // .get(`${BASE_API_URL}/home/get-random-rooms?size=${this.state.featureSize}`)
                .get(`${BASE_API_URL}/home/rooms/?size=10`)
                .then((randomRooms) => {
                // console.log(rooms.data);
                // console.log(rooms.data);
                    // randomRooms = rooms.data;
                    this.setState({rooms: randomRooms.data})
                })
                .catch((error) => {
                console.error("Error generating rooms: ", error);
                });
            console.log("hhello", randomRooms);
        }
    }

  render() {
    // console.log(JSON.stringify(this.props.properties));
    // console.log(this.props.cardType);

    console.log("rooooooms couralkj:", this.state.rooms);
    // console.log(this.state.activeCard);
    return (
    <div className="carousel-container">
        <ItemsCarousel
            // style={{"position": "absolute"}}
            infiniteLoop={true}
            gutter={12}
            activePosition={'center'}
            chevronWidth={60}
            disableSwipe={false}
            alwaysShowChevrons={false}
            numberOfCards={this.props.cardsNumber ? this.props.cardsNumber : 5}
            slidesToScroll={this.props.scrollNumber ? this.props.scrollNumber : 5}
            outsideChevron={true}
            showSlither={false}
            firstAndLastGutter={false}
            activeItemIndex={this.state.activeCard}
            requestToChangeActive={value => this.setState({ activeCard: value })}
            rightChevron={'>'}
            leftChevron={'<'}
        >

        {this.props.properties ? Array.from(this.props.properties).map((property, index) =>
                <CardTwo
                key={index}
                roomID={property._id} 
                name={property.name} 
                thumbnailUrl={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=${property.thumbnailUrl}`}
                ownerID={property.ownerID}
                tags={property.tags}
                // subscribe
                /> 
            ) : null }

        {this.props.random ? Array.from(this.state.rooms).map((property, index) =>
                <CardTwo
                key={index}
                roomID={property._id} 
                name={property.name} 
                thumbnailUrl={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=${property.thumbnailUrl}`}
                ownerID={property.ownerID}
                tags={property.tags}
                // subscribe
                /> 
            ) : null }
        </ItemsCarousel>
    </div>
    );  
  }
} 

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default Carousel;