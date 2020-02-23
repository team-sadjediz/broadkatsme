// import React from "react";

// import "./lobby-page.styles.scss";

// const LobbyPage = () => <div className="lobby-page">Lobby Page</div>;

// export default LobbyPage;

import React, {Component} from "react";
import Card from "../../components/card/card.component";
import data from "./data/data"

import BackArrowIcon from "../../assets/icons/back-arrow.svg";
import NextArrowIcon from "../../assets/icons/next-arrow.svg";

import Sidebar from "../../components/sidebar/sidebar.component";
import CollapsibleContent from "../../components/collapsible-content/collapsible-content.component";

import "./lobby-page.styles.scss";

class LobbyPage extends Component{
 constructor(props){
    super(props);
    this.state = {
    properties: data.properties, 
    property: data.properties[0]
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

    render() {
        const {properties, property} = this.state;
        const slide = { 
            transform: `translateX(${-property.index*(100/properties.length)}%)` 
        };
        return(
        <div className="bigger-container">
            <Sidebar side="left" visible="false">
                <CollapsibleContent
                    id="collapsible-activity"
                    label="Activity"
                    content={"WHATEVER"}
                />
                <CollapsibleContent
                    id="collapsible-friends"
                    label="Friends"
                    content={"WHATEVER2"}
                />
            </Sidebar>
            <div className="container">
                <div id='active_header' className='header'>ACTIVE ROOMS</div>
                <div className="active-container">
                    <div className="cards-carousel-wrapper" style={slide}>
                        {
                            properties.map(property=> 
                            <div className="zoom">
                                <Card key={ property.roomID } property={ property }></Card>
                            </div>
                            )
                        }
                    </div>
                </div>
                <img className="back-btn" src="https://image.flaticon.com/icons/svg/126/126492.svg" onClick={
                            () => this.prevProperty()} disabled={property.index === 0}></img>
                <img className="next-btn" src="https://image.flaticon.com/icons/svg/126/126490.svg" disabled={property.index === data.properties.length-3}
                 onClick={() => this.nextProperty()}></img>
                {/* <button className='back-btn' onClick={() => this.prevProperty()} disabled={property.index === 0}>
                    Prev
                </button>
                <button className='next-btn' onClick={() => this.nextProperty()} disabled={property.index === data.properties.length-1}>
                    Next
                </button> */}
                <div className="featured-container">
                    <div id="featured_header" className='header'>FEATURED ROOMS</div>
                    <div className="cards-grid">
                    {
                        properties.map(property=> 
                        <div className="zoom">
                            {/* <p className='title'>{property.name}</p> */}
                            <Card key={ property.roomID } property={ property }></Card>
                            {/* <p className='title'>Tags: {property.tags}</p> */}
                        </div>
                        )
                    }
                    </div>
                </div>
            </div>
            </div>
        );
    }
}


export default LobbyPage;
