import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Live } from "../../assets/icons/live.svg";
import Tag from "../../components/tag/tag.component";
import "./card.style.scss";
import { Link } from "react-router-dom";

//svgs, icons, button
import { ReactComponent as NextBtn } from "../../assets/icons/caret-right-solid.svg";
import { ReactComponent as BackBtn } from "../../assets/icons/caret-left-solid.svg";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClearIcon from '@material-ui/icons/Clear';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import CircleBtn from "../circle-btn/circle-btn.component";
import ChatIcon from '@material-ui/icons/Chat';

import axios from "axios";
// import { connect } from "react-redux";
import { BASE_API_URL } from "../../utils";

// const Card = ({ roomID, name, thumbnailUrl, tags}) => {
//   // const { roomID, name, thumbnail_url, tags } = property;
//   const roomTags = tags;
//   // console.log(roomTags.length);
//   // console.log(roomTags);
//   const [hover, setHover] = React.useState(false);
//   // const handleMouse = event => {
//   //   setHover(!hover);
//   //   console.log(hover);
//   // }
//   const handleMouseEnter = event => {
//     setHover(true);
//     // console.log(hover);
//   }
//   const handleMouseLeave = event => {
//     setHover(false);
//     // console.log(hover);
//   }
//   return (
//     <div 
//     key={roomID} 
//     className="card shadow"
//     onMouseEnter={handleMouseEnter}
//     onMouseLeave={handleMouseLeave}
//     >
//       {hover && 
//         <div className="buttons-container">
//           <CircleBtn
//           className="room-card-buttons"
//           icon={<ClearIcon />}
//           />
//           <CircleBtn
//           className="room-card-buttons"
//           icon={<PersonAddIcon />} 
//           />
//         </div>}
//       <Link to={`/room/id=${roomID}`}>
//         <div className="img-container">
//           <img src={thumbnailUrl} />
//           <Live />
//           {/* <PlayCircleOutlineIcon /> */}
//         </div>
//         <div className="description-container">
//           <p>{name}</p>
//           <div className="tags">
//             {roomTags.length !== 0 && roomTags.map((value, index) => {
//               return <Tag type="label" text={value} />;
//             })}
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      uid: this.props.uid,
      roomID: this.props.roomID,
      thumbnailUrl: this.props.thumbnailUrl,
      roomTags: this.props.tags,
      roomName: this.props.name,
      hover: false,
      delete: false,
      add: false,
      invite: false,
      zoom: false
    }
  }
  handleMouseEnter = event => {
    this.setState({hover: true});
    // console.log(hover);
  }
  handleMouseLeave = event => {
    this.setState({hover: false});
    // console.log(hover);
  }
  handleUnsubscribe = event => {
    let request = {
      "uid": this.state.uid,
      // "roomID": this.state.roomID
      "roomID": this.state.roomID
    };
    console.log(request);
    axios
      .put(`${BASE_API_URL}/userprops/subscribed-rooms/unsubscribe`, request)
      .then(res => console.log(res))
      .catch(error => console.error(error));
    // console.log("hello" + roomID);
    // console.log(this.state);
    // console.log(this.props);
    // console.log(e.target.value);
  }
  render() {
    const roomTags = this.props.tags;
    return (
    <div 
      key={this.state.roomID} 
      className={this.state.zoom ? "card shadow" : "card"}
      onMouseEnter={this.handleMouseEnter}
      onMouseLeave={this.handleMouseLeave}
      >
        {this.state.hover && 
          <div className="buttons-container">
            {this.state.delete &&
            <CircleBtn
            className="room-card-buttons"
            icon={<ClearIcon />}
            onClick={this.handleUnsubscribe}
            />
            }
            {this.state.invite &&
            <CircleBtn
            className="room-card-buttons"
            icon={<PersonAddIcon />} 
            />
            }
            {this.state.chat &&
            <CircleBtn
            className="room-card-buttons"
            icon={<ChatIcon />} 
            />
            }
          </div>}
        <Link to={`/room/id=${this.state.roomID}`}>
          <div className="img-container">
            <img src={this.state.thumbnailUrl} />
            <Live />
            {/* <PlayCircleOutlineIcon /> */}
          </div>
          <div className="description-container">
            <p>{this.state.roomName}</p>
            <div className="tags">
              {roomTags.length !== 0 && roomTags.map((value, index) => {
                return <Tag type="label" text={value} />;
              })}
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default Card;
