import React from 'react';
import PropTypes from 'prop-types';

import "./card.style.scss";
const Card = ({property}) => {
    const {roomID, name, thumbnail, tags} = property;
    return (
        <div id={'card-' + {roomID}} className="card">
            <div className="img-container">
                <img src={thumbnail} />
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