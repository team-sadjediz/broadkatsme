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
  let uid = req.query.uid;
  let userProfile = await UserProfile.findOne({ user_ID: uid });
  let userProps = await UserProps.findOne({ user_ID: uid });
  // console.log(JSON.stringify(userProfile));
  // console.log(JSON.stringify(userProps));
  res.send({ "userProfile": userProfile, "userProps": userProps });
  // res.send("Send back user props.");
  // res.send({ })
});

router.get("/user-props", async function(req, res) {
  let uid = req.query.uid;
  let userProps = await UserProps.findOne({ user_ID: uid });
  // console.log(JSON.stringify(userProps));
  res.send({ "userProps": userProps });
});

router.get("/users-rooms", async function(req, res) {
  let uid = req.query.uid;
  let room_urls = [];
  await UserProps.findOne({ user_ID: uid })
    .populate("subscribed_rooms")
    .exec((error, populatedProps) => {
      let rooms = populatedProps.subscribed_rooms;
      rooms.forEach(function(room) {
        room_urls.push({
          "roomID": room._id,
          "name": room.name,
          "thumbnail_url": room.thumbnail_url,
          "tags": room.tags
        });
      });
      console.log(room_urls);
      res.send(room_urls);
    });
});

router.get("/get-random-rooms", async function(req, res) {
  let number_of_rooms = req.query.size;
  Room.findRandom({}, {}, { limit: number_of_rooms }, function(error, rooms) {
    if (error) {
      res.send(error);
    } else {
      res.send(rooms);
    }
  });
  // Room.aggregate([{ $sample: { size: number_of_rooms } }]);
});

module.exports = router;
