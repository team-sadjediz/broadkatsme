import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Live } from "../../assets/icons/live.svg";
import Tag from "../../components/tag/tag.component";
import "./card.style.scss";

const Card = ({ roomID, name, thumbnailUrl, tags}) => {
  // const { roomID, name, thumbnail_url, tags } = property;
  const roomTags = tags;
  console.log(roomTags.length);
  console.log(roomTags);
  return (
    <div className="card zoom" key={roomID}>
      <div className="img-container">
        <img src={thumbnailUrl} />
        <Live />
      </div>

      <div className="description-container">
        <p>{name}</p>
        {roomTags.length !== 0 && roomTags.map((value, index) => {
          return <Tag type="label" text={value} />;
        })}
        {/* {tags} */}
      </div>
    </div>
  );
};

// Card.propTypes = {
//   property: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default Card;