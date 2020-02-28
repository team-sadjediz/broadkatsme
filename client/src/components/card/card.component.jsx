import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Live } from "../../assets/icons/live.svg";
import Tag from "../../components/tag/tag.component";
import "./card.style.scss";

// const Tagging = () => {
//     return (
//         <Tag type="label" text={tags}/>
//     )
// }

const Card = ({ property }) => {
  const { roomID, name, thumbnail_url, tags } = property;
  return (
    <div id={`card-${roomID}`} className="card">
      <div className="img-container">
        {/* <img
          src={`http://localhost:5000/api/room/get-thumbnail?thumbnail_url=${thumbnail_url}`}
        /> */}
        <img
          src={`http://broadkatsme.herokuapp.com/api/room/get-thumbnail?thumbnail_url=${thumbnail_url}`}
        />
        <Live />
      </div>

      <div className="description-container">
        <p>{name}</p>
        {tags.map((value, index) => {
          return <Tag type="label" text={value} />;
        })}
      </div>
    </div>
  );
};

Card.propTypes = {
  property: PropTypes.object.isRequired
};

export default Card;
