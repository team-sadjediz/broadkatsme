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

// import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

//TO DO
// - implement Skeleton component for card
// - fix linking click on card

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    '&:hover': {
      // transform: 'scale(1.025)',
      // opacity: 0.70,
      transition: 'opacity 350ms ease',
    },
    // flex: 2,
    // display: "flex",
    // padding: "1px",
    // margin: "10px"

  },
  media: {
    height: 0,
    paddingTop: '70%', // 16:9
  },
}));

const CardTwo = ({ roomID, name, thumbnailUrl, tags, uid, ...otherProps}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [openLink, setOpen] = React.useState(false);

  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(true);
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
  console.log(name);
  return (
    <div>
    <Card className={classes.root} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {active && <Live className="live-box" />}
      {hover && 
          <div className="buttons-container">
            {otherProps.unsubscribe &&
            <CircleBtn
            className="room-card-buttons"
            icon={<ClearIcon />}
            // onClick={this.handleUnsubscribe}
            />
            }
            {otherProps.subscribe &&
            <CircleBtn
            className="room-card-buttons"
            icon={<AddIcon />} 
            />
            }
            {otherProps.invite &&
            <CircleBtn
            className="room-card-buttons"
            icon={<PersonAddIcon />} // or use ShareIcon
            />
            }
            {otherProps.chat &&
            <CircleBtn
            className="room-card-buttons"
            icon={<ChatIcon />} 
            />
            }
            <IconButton
              className="show-more-button"
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>}

      <Link to={`/room/id=${roomID}`}>
        <CardMedia
          className={classes.media}
          image={thumbnailUrl}
        />
      </Link>
        <CardContent>
        <ListItem style={{'padding' : '0', 'zIndex': '5'}}>
          <ListItemAvatar>
            <Avatar className="profile-picture" src={thumbnailUrl} />
          </ListItemAvatar>
          <ListItemText primary={<Typography noWrap>{name}</Typography>} secondary={roomTags && roomTags.map((value, index) => {
              return <Tag type="label" text={value} />;
            })} />
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
          <Content show={expanded} name={name} thumbnailUrl={thumbnailUrl} tags={tags}/>
        </Collapse>
    </div>
  );
}


  
export default CardTwo;