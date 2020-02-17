var express = require("express");
var router = express.Router();
var random = require("mongoose-simple-random");

const UserProfile = require("../models/userprofile.model");
const UserProps = require("../models/userprops.model");
const Room = require("../models/room.model");

// NOTE: SEND BACK UNIQUE KEYS (BETTER FOR FRONT-END)
router.get("/user", async function(req, res) {
  // User's personalized home page should display: owned rooms, subscribed rooms, favorited rooms, friends, username, notifications
  // General display: random rooms (it's thumbnail, name, and tags)
  let uid = req.body.uid;
  let userProfile = await UserProfile.findOne({ user_ID: uid });
  let userProps = await UserProps.findOne({ user_ID: uid });
  // console.log(JSON.stringify(userProfile));
  // console.log(JSON.stringify(userProps));
  res.send({ userProfile: userProfile, userProps: userProps });
  // res.send("Send back user props.");
  // res.send({ })
});

router.get("/get-rooms", async function(req, res) {
  Room.findRandom({}, {}, { limit: 5 }, function(error, rooms) {
    if (error) {
      res.send(error);
    } else {
      res.send(rooms);
    }
  });
});

module.exports = router;
