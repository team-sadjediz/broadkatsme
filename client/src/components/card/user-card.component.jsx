import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BASE_API_URL } from "../../utils";
import { Link } from "react-router-dom";

import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  card: {
    //   maxWidth: 345,
    margin: theme.spacing(2),
    height: "180px",
    minHeight: "180px",
    // height: "180px",
    // width: "800px",
    padding: "0 auto",
  },
  media: {
    height: "180px",
    //   width: 700,
    justifyItems: "center",
  },
  avatar: {
    height: 150,
    width: 150,
  },
  username: {
    fontSize: 50,
    fontFamily: "Alatsi",
    // fontWeight: 'bold',
  },
  bio: {
    fontSize: 30,
  },
  personAdd: {
    height: 50,
    width: 50,
  },
}));

const UserCard = ({ ...otherProps }) => {
  const { loading = false } = otherProps;
  const classes = useStyles();
  // console.log(otherProps);
  return (
    <Card className={classes.card}>
      {/* <Link to={`/userprofile/id=${otherProps.uid}`}> */}
      <CardHeader
        className={classes.media}
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circle"
              width={100}
              height={100}
            />
          ) : (
            <Avatar
              className={classes.avatar}
              alt="profile"
              src={`${BASE_API_URL}/userprofile/get-photo?photoUrl=${otherProps.avatar}`}
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <PersonAddIcon className={classes.personAdd} />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            <div className={classes.username}>{otherProps.username}</div>
          )
        }
        // subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> : (<div className={classes.username}>{otherProps.username}</div>)}
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            <div className={classes.bio}>{otherProps.bio}</div>
          )
        }
      />
      {/* </Link> */}
    </Card>
  );
};

export default UserCard;
