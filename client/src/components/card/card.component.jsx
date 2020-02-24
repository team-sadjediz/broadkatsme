import React from 'react';
import PropTypes from 'prop-types';

import "./card.style.scss";
const Card = ({property}) => {
    const {roomID, name, thumbnail_url, tags} = property;
    return (
        <div id={`card-${roomID}`} className="card">
            <div className="img-container">
                <img src={`http://localhost:5000/api/room/get-thumbnail?thumbnail_url=${thumbnail_url}`} />
            </div>
            <div className="description-container">
                <p>{name}</p>
                <p>{tags}</p>
            </div>
        </div>
    )
}

Card.propTypes = {
    property: PropTypes.object.isRequired
}

export default Card;