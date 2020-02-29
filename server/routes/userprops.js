var express = require("express");
var router = express.Router();

const UserProfile = require("../models/userprofile.model");
const UserProps = require("../models/userprops.model");
const Room = require("../models/room.model");

// ---------------------------------------------------------- FAVORITE / UNFAVORITE ----------------------------------------------------------

// router.put("/favorite", async function(req, res) {
//   let room_ID = req.body.room_ID;
//   let uid = req.body.uid;
//   await UserProps.findOneAndUpdate(
//     // { "user_ID": uid, "favorited_rooms": { $nin: room_ID } },
//     // { $push: { "favorited_rooms": room_ID } }
//     { user_ID: uid },
//     { $addToSet: { favorited_rooms: room_ID } }
//   )
//     .then(document => res.send(document))
//     .catch(error => res.status(400).send("Favoriting room failed."));
// });

// router.put("/unfavorite", async function(req, res) {
//   let room_ID = req.body.room_ID;
//   let uid = req.body.uid;
//   await UserProps.findOneAndUpdate(
//     { user_ID: uid, favorited_rooms: { $in: room_ID } },
//     { $pull: { favorited_rooms: room_ID } }
//   )
//     .then(document => res.send(document))
//     .catch(error => res.status(400).send("Unfavoriting room failed."));
// });

router.put("/favorite", async function(req, res) {
  let roomID = req.body.roomID;
  let uid = req.body.uid;

  let favorite;
  await UserProps.findOne({ "user_ID": uid }, function(error, userprops) {
    if (userprops.favorited_rooms.includes(roomID)) {
      userprops.favorited_rooms.pull(roomID);
      favorite = false;
    } else {
      userprops.favorited_rooms.addToSet(roomID);
      favorite = true;
    }
    userprops.save();
    console.log({ userprops: userprops, favorited: favorite });
    res.json({ userprops: userprops, favorited: favorite });
  });
});

router.get("/is-favorited", async function(req, res) {
  let roomID = req.query.roomID;
  let uid = req.query.uid;
  console.log("coming from is favorited");
  console.log(roomID);
  console.log(uid);

  await UserProps.findOne({
    "user_ID": uid,
    favorited_rooms: { $in: roomID }
  })
    .then(document => {
      if (document == null) {
        res.send(false);
      } else {
        res.send(true);
      }
    })
    .catch(error => res.status(400).send("Getting favorited status failed."));
});

// ---------------------------------------------------------- ADD / REMOVE NOTIFICATIONS ----------------------------------------------------------

router.put("/new-notification", async function(req, res) {
  let uid = req.body.uid;
  let title = req.body.title;
  let message = req.body.message;
  let notification = { title: title, message: message };
  await UserProps.findOneAndUpdate(
    // { "user_ID": uid, "favorited_rooms": { $nin: room_ID } },
    // { $push: { "favorited_rooms": room_ID } }
    { user_ID: uid },
    { $push: { notifications: notification } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("New notification failed."));
});

router.put("/delete-notification", async function(req, res) {
  let uid = req.body.uid;
  let nid = req.body.nid;
  await UserProps.findOneAndUpdate(
    { user_ID: uid },
    { $pull: { notifications: { _id: nid } } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Delete notification failed."));
});

module.exports = router;
