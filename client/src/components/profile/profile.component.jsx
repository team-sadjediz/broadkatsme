

//Styles
import "./profile.style.scss";

import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TheatersIcon from '@material-ui/icons/Theaters';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 500,
    maxHeight: 500,

  },
}));

const Profile = ({movies, music, website}) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <TheatersIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Movies" secondary={movies} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LibraryMusicIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Music" secondary={music} />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WebAssetIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Website" secondary={website} />
      </ListItem>
    </List>
  );
}

export default Profile;