var express = require("express");
var router = express.Router();

const UserProfile = require("../models/userprofile.model");
const UserProps = require("../models/userprops.model");
const User = require("../models/user.model");

router.post("/new-user", async function(req, res) {
  let userID = req.body.uid;
  let username = req.body.username;
  let password = req.body.password;

  let user = new User({
    user_ID: userID,
    username: username,
    password: password
  });
  let userProfile = new UserProfile({
    user_ID: userID,
    biography: "",
    tags: [],
    favorites: { movies: "", music: "", websites: "" },
    privacy: true
  });
  let userProps = new UserProps({
    user_ID: userID,
    friends: [],
    owned_rooms: [],
    subscribed_rooms: [],
    favorited_rooms: [],
    notifications: []
  });

  await user
    .save()
    .then(document => console.log(document))
    .catch(error => res.status(400).send("User insert failed."));

  await userProfile
    .save()
    .then(document => console.log(document))
    .catch(error => res.status(400).send("User Profile insert failed."));

  await userProps
    .save()
    .then(document => console.log(document))
    .catch(error => res.status(400).send("User Props insert failed."));

  // res.send("User profile & props created.");
});

module.exports = router;
