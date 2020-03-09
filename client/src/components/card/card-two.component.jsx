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
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 400,
    // '&:hover': {
    //   transform: 'scale(1.1)',
    //   opacity: 0.85,
    //   transition: 'opacity 350ms ease',
    // }
  },
  media: {
    height: 0,
    paddingTop: '70%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const CardTwo = ({ roomID, name, thumbnailUrl, tags, uid}) => {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [openLink, setOpen] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleShareLink = () => {
    setOpen(!openLink);
  };

  // const handleClose = () => {
  //   setOpen(!openLink);
  // };


  const roomTags = tags;

  return (
    <div>
    <Card className={classes.root}>
      <Live className="live-box" />
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
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
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