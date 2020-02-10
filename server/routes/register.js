var express = require("express");
var router = express.Router();

const UserProfile = require("../models/userprofile.model");
const UserProps = require("../models/userprops.model");

router.get("/new-user", function(req, res) {
  var userID = req.body.userID;
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
  
  await userProfile
    .save()
    .then(document => console.log(document))
    .catch(error => res.status(400).send("User Profile insert failed."));

  await userProps
    .save()
    .then(document => console.log(document))
    .catch(error => res.status(400).send("User Props insert failed."));

  res.send("User profile & props created.");
});

module.exports = router;
