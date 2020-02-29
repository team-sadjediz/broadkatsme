var express = require("express");
var router = express.Router();

const UserProfile = require("../models/userprofile.model");
const UserProps = require("../models/userprops.model");
const User = require("../models/user.model");

router.post("/new-user", async function(req, res) {
  console.log(req);
  let userID = req.body.uid;
  let username = req.body.username;
  let photoUrl = "default1.png";

  let user = new User({
    "userID": userID,
    "username": username,
    "photoURL": photoUrl
  });

  let userProfile = new UserProfile({
    "userID": userID,
    "biography": "",
    "tags": [],
    "favorites": { movies: "", music: "", websites: "" },
    "privacy": true
  });
  let userProps = new UserProps({
    "userID": userID,
    "friends": [],
    "ownedRooms": [],
    "subscribedRooms": [],
    "favoritedRooms": [],
    "notifications": []
  });

  await user
    .save()
    .then(document => {
      console.log(document);
    })
    .catch(error => res.status(400).send("User insert failed."));

  await userProfile
    .save()
    .then(document => console.log(document))
    .catch(error => res.status(400).send("User Profile insert failed."));

  await userProps
    .save()
    .then(document => {
      console.log(document);
    })
    .catch(error => res.status(400).send("User Props insert failed."));
});

module.exports = router;
