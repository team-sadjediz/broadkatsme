import React from "react";
import { ReactComponent as Live } from "../../assets/icons/live.svg";
import Tag from "../../components/tag/tag.component";
import "./card.style.scss";
import { Link } from "react-router-dom";

//svgs, icons, button
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClearIcon from '@material-ui/icons/Clear';
import CircleBtn from "../circle-btn/circle-btn.component";
import ChatIcon from '@material-ui/icons/Chat';
import AddIcon from '@material-ui/icons/Add';

import axios from "axios";
// import { connect } from "react-redux";
import { BASE_API_URL } from "../../utils";

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
      delete: true,
      add: true,
      // invite: false,
      chat: true,
      zoom: false
    }

    this.user = {
      uid: this.props.uid,
      roomID: this.props.roomID,
      thumbnailUrl: this.props.thumbnailUrl,
      roomTags: this.props.tags,
      roomName: this.props.name,
    }
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleUnsubscribe = this.handleUnsubscribe.bind(this);
  }
  handleMouseEnter = event => {
    this.setState({hover: true});
    console.log(this.state.hover);
  }
  handleMouseLeave = event => {
    this.setState({hover: false});
    console.log(this.state.hover);
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
      className="card shadow"
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
            {this.state.add &&
            <CircleBtn
            className="room-card-buttons"
            icon={<AddIcon />} 
            />
            }
            {this.props.invite &&
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
  currentUser: state.user.currentUser,
  userAuth: state.user.userAuth
});

export default Card;
