import React, { Component } from 'react';
import Card from "../card/card.component";
import data from "../../pages/lobby-page/data/data"

class Carousel extends Component {
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
         return (
            <div>
            {/* <button className='back-btn' onClick={() => this.prevProperty()} disabled={property.index === 0}>
                    Prev
                </button>
                <button className='next-btn' onClick={() => this.nextProperty()} disabled={property.index === data.properties.length-1}>
                    Next
                </button> */}
                <div className="cards-carousel-wrapper">
                {
                        this.state.properties.map(property=> 
                        <div className="zoom">
                            <Card key={ property.roomID } property={ property }></Card>
                            <div className="room name"> NAME: { property.name }</div>
                            <div className="room tags"> TAGS: { property.tags } </div>
                        </div>
                        )
                    }
                </div>
            </div>
         );
     }
    
}

export default Carousel;
