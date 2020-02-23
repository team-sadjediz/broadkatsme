var express = require("express");
var router = express.Router();

const UserProfile = require("../models/userprofile.model");
const UserProps = require("../models/userprops.model");
const Room = require("../models/room.model");

router.put("/favorite", async function(req, res) {
  let room_ID = req.body.room_ID;
  let uid = req.body.uid;
  await UserProps.findOneAndUpdate(
    // { "user_ID": uid, "favorited_rooms": { $nin: room_ID } },
    // { $push: { "favorited_rooms": room_ID } }
    { user_ID: uid },
    { $addToSet: { favorited_rooms: room_ID } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Favoriting room failed."));
});

router.put("/unfavorite", async function(req, res) {
  let room_ID = req.body.room_ID;
  let uid = req.body.uid;
  await UserProps.findOneAndUpdate(
    { user_ID: uid, favorited_rooms: { $in: room_ID } },
    { $pull: { favorited_rooms: room_ID } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Unfavoriting room failed."));
});

module.exports = router;
