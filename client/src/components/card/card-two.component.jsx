import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tag from "../../components/tag/tag.component";
import axios from "axios";
import { BASE_API_URL } from "../../utils";
import Popper from '@material-ui/core/Popper';
import Poppity from "../poppity/poppity.component";
import { Link } from "react-router-dom";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import Content from "./card-content.component";
import { ReactComponent as Live } from "../../assets/icons/live.svg";
//Icons
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ClearIcon from '@material-ui/icons/Clear';
import CircleBtn from "../circle-btn/circle-btn.component";
import ChatIcon from '@material-ui/icons/Chat';
import AddIcon from '@material-ui/icons/Add';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    maxWidth: 300,
    maxHeight: 350,
    '&:hover': {
      // transform: 'scale(1.025)',
      opacity: 0.70,
      transition: 'opacity 350ms ease',
    }
  },
  media: {
    height: 0,
    paddingTop: '70%', // 16:9
  },
}));

const CardTwo = ({ roomID, name, thumbnailUrl, tags, uid}) => {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [openLink, setOpen] = React.useState(false);

  const [hover, setHover] = React.useState(false);
  const [unsubscribe, setUnsubscribe] = React.useState(true);
  const [subscribe, setSubscribe] = React.useState(true);
  const [invite, setInvite] = React.useState(true);
  const [chat, setChat] = React.useState(false);
  const [zoom, setZoom] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleShareLink = () => {
    setOpen(!openLink);
  };

  // const handleClose = () => {
  //   setOpen(!openLink);
  // };

  const handleMouseEnter = event => {
    setHover(true);
    console.log(hover);
  };
  const handleMouseLeave = event => {
    setHover(false);
    console.log(hover);
  };

  const roomTags = tags;

  return (
    <div>
    <Card className={classes.root} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Live className="live-box" />
      {hover && 
          <div className="buttons-container">
            {unsubscribe &&
            <CircleBtn
            className="room-card-buttons"
            icon={<ClearIcon />}
            // onClick={this.handleUnsubscribe}
            />
            }
            {subscribe &&
            <CircleBtn
            className="room-card-buttons"
            icon={<AddIcon />} 
            />
            }
            {invite &&
            <CircleBtn
            className="room-card-buttons"
            icon={<PersonAddIcon />} 
            />
            }
            {chat &&
            <CircleBtn
            className="room-card-buttons"
            icon={<ChatIcon />} 
            />
            }
          </div>}
      <CardMedia
        className={classes.media}
        image={thumbnailUrl}
      />
      <CardContent>
        <div>{name}</div>
        <Typography variant="body2" color="textSecondary" component="p">
          {roomTags && roomTags.map((value, index) => {
            return <Tag type="label" text={value} />;
          })}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Link to={`/room/id=${roomID}`}>
        <IconButton>
          <div>join</div>
        </IconButton>
        </Link>
        <IconButton aria-label="share">
        {/* <Poppity style={{'width': '100px', 'position' : 'absolute'}} alignArrow="center" content={<input value={`${BASE_API_URL}/room/id=${roomID}`}/>}> */}
          <ShareIcon onClick={handleShareLink}/>
          {/* </Poppity> */}
          {/* <ShareIcon onClick={handleShareLink}/> */}
          {/* <Popper open={openLink} anchorEl='bottom'>
            <div>The content of the Popper.</div>
          </Popper> */}
        </IconButton>
        <IconButton
          className="show-more-button"
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>


    </Card>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Content show={expanded} name={name} thumbnailUrl={thumbnailUrl} tags={tags}/>
        </Collapse>
        </div>
  );
}


  
export default CardTwo;