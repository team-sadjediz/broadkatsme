import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import Card from "../../components/card/card.component";
import CardTwo from "../../components/card/card-two.component";
import { Link } from "react-router-dom";
import { BASE_API_URL } from "../../utils";
import { ReactComponent as NextBtn } from "../../assets/icons/caret-right-solid.svg";
import { ReactComponent as BackBtn } from "../../assets/icons/caret-left-solid.svg";
import { makeStyles } from '@material-ui/core/styles';

import "./carousel.style.scss";

class Carousel extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeCard: 0
        };
    }

  changeActiveCard = (activeCard) => this.setState({ activeCard });

  render() {
    // console.log(JSON.stringify(this.props.properties));
    // console.log(this.props.cardType);
    console.log(this.state.activeCard);
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
            slidesToScroll={2}
            outsideChevron={true}
            showSlither={false}
            firstAndLastGutter={false}
            activeItemIndex={this.state.activeCard}
            requestToChangeActive={value => this.setState({ activeCard: value })}
            rightChevron={'>'}
            leftChevron={'<'}
        >

            {Array.from(this.props.properties).map((property) =>
                // <Link to={`/room/id/${property.roomID}`}>
                    <CardTwo
                    key={property.roomID}
                    roomID={property.roomID} 
                    name={property.name} 
                    thumbnailUrl={`${BASE_API_URL}/room/get-thumbnail?thumbnailUrl=${property.thumbnailUrl}`}
                    tags={property.tags}
                    subscribe
                    /> 
                // </Link>
                )}
        </ItemsCarousel>
    </div>
    );  
  }
} 

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default Carousel;