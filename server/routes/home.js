var express = require("express");
var router = express.Router();

const UserProfile = require("../models/userprofile.model");
const UserProps = require("../models/userprops.model");
const Room = require("../models/room.model");

// NOTE: SEND BACK UNIQUE KEYS (BETTER FOR FRONT-END)
router.get("/user", async function(req, res) {
  // User's personalized home page should display: owned rooms, subscribed rooms, favorited rooms, friends, username, notifications
  // General display: random rooms (it's thumbnail, name, and tags)
  let uid = req.body.uid;
  let userProfile = await UserProfile.find({ user_ID: uid });
  let userProps = await UserProps.find({ user_ID: uid });
  console.log(JSON.stringify(userProfile));
  console.log(JSON.stringify(userProps));
  res.send({ userProfile: userProfile, userProps: userProps });
  // res.send("Send back user props.");
  // res.send({ })
});

module.exports = router;
