import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import Tag from "../../components/tag/tag.component";
import axios from "axios";
import { BASE_API_URL } from "../../utils";
import Popper from "@material-ui/core/Popper";
import Poppity from "../poppity/poppity.component";
import { Link } from "react-router-dom";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import Content from "./card-content.component";
import { ReactComponent as Live } from "../../assets/icons/live.svg";
//Icons
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ClearIcon from "@material-ui/icons/Clear";
import CircleBtn from "../circle-btn/circle-btn.component";
import ChatIcon from "@material-ui/icons/Chat";
import AddIcon from "@material-ui/icons/Add";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// import List from '@material-ui/core/List';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

import { connect } from "react-redux";
import {
  updateSubscribedRooms,
  setSelectedRoom,
} from "../../redux/room/room.actions";

//TO DO
// - implement Skeleton component for card
// - fix linking click on card

function tagCheck(roomTags) {
  if (roomTags.length != 0){
    const allTags = roomTags.map((value, index) => {
      return <Tag type="label" text={value} />;
    })
    return allTags;
  }
  else {
    return <Tag type="label" text="No tags" />;
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    "&:hover": {
      // transform: 'scale(1.025)',
      // opacity: 0.70,
      transition: "opacity 350ms ease",
    },
    // flex: 2,
    // display: "flex",
    // padding: "1px",
    // margin: "10px"
  },
  media: {
    height: 0,
    paddingTop: "70%", // 16:9
  },
}));

const CardTwo = ({
  userAuth,
  roomID,
  name,
  thumbnailUrl,
  tags,
  uid,
  ...otherProps
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [openLink, setOpen] = React.useState(false);

  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleShareLink = () => {
    setOpen(!openLink);
  };

  // const handleClose = () => {
  //   setOpen(!openLink);
  // };

  const handleMouseEnter = (event) => {
    setHover(true);
    // console.log(tags.length);
  };
  const handleMouseLeave = (event) => {
    setHover(false);
    // console.log(hover);
  };

  const handleUnsubscribe = async (event) => {
    if (roomID) {
      console.log(roomID, userAuth.uid);
      // await axios.put(`${BASE_API_URL}/userprops/subscribed-rooms/subscribe`, {
      //   roomID: roomId,
      //   uid: currentUser.uid
      // });
      console.log("card unsub", roomID);
      console.log("card userAuth", userAuth.uid);
      await axios
        .put(
          `${BASE_API_URL}/userprops/subscribe/${roomID}/${userAuth.uid}`,
          null,
          { params: { action: "unsubscribe" } }
        )
        .catch((err) => {
          console.log("card unsubbbb", err);
        });

      // let results = await axios.get(
      //   `${BASE_API_URL}/userprops/rooms/${userAuth.uid}`
      // );

      updateSubscribedRooms(userAuth.uid);
      // setSelectedRoom(roomId);
    }
  };

  const roomTags = tags;
  // console.log(name);

  
  return (
    <div>
      <Card
        className={classes.root}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {active && <Live className="live-box" />}
        {hover && (
          <div className="buttons-container">
            {otherProps.unsubscribe &&
            <Tooltip title='Unsubscribe' placement='left'>
            <Fab className="room-card-buttons" color="primary" aria-label="unsubscribe" onClick={handleUnsubscribe}>
                <ClearIcon />
            </Fab>
            </Tooltip>
            }
            {otherProps.subscribe &&
            // <Tooltip title="Subscribe" placement="left">
            //   <CircleBtn
            //   className="room-card-buttons"
            //   icon={<AddIcon />} 
            //   />
            // </Tooltip>
            <Tooltip title='Subscribe' placement='left'>
            <Fab className="room-card-buttons" color="primary" aria-label="subscribe">
                <AddIcon />
            </Fab>
            </Tooltip>
            }
            {otherProps.invite &&
            <Tooltip title='Invite' placement='left'>
            <Fab className="room-card-buttons" color="primary" aria-label="invite">
                <PersonAddIcon />
            </Fab>
            </Tooltip>
            }
            {otherProps.chat &&
            <Tooltip title='Subscribe' placement='left'>
            <Fab className="room-card-buttons" color="primary" aria-label="chat">
                <ChatIcon />
            </Fab>
            </Tooltip>
            }
            <Tooltip title="Show More" placement="left">
              <IconButton
                className="show-more-button"
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}

        <Link to={`/room/id=${roomID}`}>
          <CardMedia className={classes.media} image={thumbnailUrl} />
        </Link>
        <CardContent>
        <ListItem style={{'padding' : '0', 'zIndex': '5'}}>
          <ListItemAvatar>
            <Avatar src={thumbnailUrl} />
          </ListItemAvatar>
          <ListItemText primary={<Typography noWrap>{name}</Typography>} secondary={roomTags && tagCheck(roomTags)} />
        </ListItem>
          {/* <Typography noWrap>{name}</Typography>
          <Typography variant="body2" color="textSecondary" component="p" noWrap>
            {roomTags && roomTags.map((value, index) => {
              return <Tag type="label" text={value} />;
            })}
          </Typography> */}
        </CardContent>

        {/* <CardActions disableSpacing>
        <IconButton
          className="show-more-button"
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions> */}
      </Card>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Content
          show={expanded}
          name={name}
          thumbnailUrl={thumbnailUrl}
          tags={tags}
        />
      </Collapse>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userAuth: state.user.userAuth,
  // currentUser: state.user.currentUser,
  // subscribedRooms: state.room.subscribedRooms,
});

const mapDispatchToProps = (dispatch) => ({
  updateSubscribedRooms: (subRoomList) =>
    dispatch(updateSubscribedRooms(subRoomList)),
  setSelectedRoom: (roomID) => dispatch(setSelectedRoom(roomID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardTwo);
