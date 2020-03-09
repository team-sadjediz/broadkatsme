var express = require("express");
var router = express.Router();

const UserProfile = require("../models/userprofile.model");
const UserProps = require("../models/userprops.model");
const Room = require("../models/room.model");

// ---------------------------------------------------------- FIND PROPS ----------------------------------------------------------

router.get("/user-props", async function(req, res) {
  let uid = req.query.uid;
  await UserProps.findOne({ userID: uid })
    .then(userprops => {
      res.send(userprops);
    })
    .catch(err => {
      console.log(err);
      res.status(404).send(`User ${uid} props is not found.`);
    });
});

// ---------------------------------------------------------- FIND USERS ROOMS ----------------------------------------------------------

router.get("/users-rooms", async function(req, res) {
  let uid = req.query.uid;
  let roomUrls = [];

  let exists = null;
  await UserProps.findOne({ userID: uid })
    .then(document => (exists = document))
    .catch(error => console.log(error));

  if (exists !== null) {
    await UserProps.findOne({ userID: uid })
      .populate("subscribedRooms")
      .exec((error, populatedProps) => {
        let rooms = populatedProps.subscribedRooms;
        rooms.forEach(function(room) {
          roomUrls.push({
            "roomID": room._id,
            "name": room.name,
            "thumbnailUrl": room.thumbnailUrl,
            "tags": room.tags
          });
        });
        console.log(roomUrls);
        res.send(roomUrls);
      });
  } else {
    res.send([]);
  }
});

// ---------------------------------------------------------- UN/SUBSCRIBE TO ROOM ----------------------------------------------------------

router.put("/subscribed-rooms/unsubscribe", async function(req, res) {
  let roomID = req.body.roomID;
  let uid = req.body.uid;

  await UserProps.findOneAndUpdate(
    { "userID": uid, "ownedRooms": { $nin: roomID } },
    {
      $pull: {
        subscribedRooms: roomID,
        favoritedRooms: roomID
      }
    },
    { new: true }
  )
    .then(async userprops => {
      await Room.findByIdAndUpdate(roomID, { $pull: { subscribers: uid } })
        .then(room => {
          let updatedUserProps = {
            "subscribedRooms": userprops.subscribedRooms,
            "favoritedRooms": userprops.favoritedRooms
          };
          let updatedRoom = { "subscribers": room.subscribers };
          let response = { updatedUserProps, updatedRoom };
          console.log("response " + response);
          res.send(response);
        })
        .catch(error =>
          res.status(400).send("Unsubscribing (in Room) failed.")
        );
    })
    .catch(error =>
      res.status(400).send("Unsubscribing in (UserProps) failed.")
    );
});

router.put("/subscribed-rooms/subscribe", async function(req, res) {
  let roomID = req.body.roomID;
  let uid = req.body.uid;

  await UserProps.findOneAndUpdate(
    { "userID": uid },
    {
      $addToSet: {
        subscribedRooms: roomID
        // favorited_rooms: roomID
      }
    },
    { new: true }
  )
    .then(async userprops => {
      await Room.findByIdAndUpdate(roomID, { $addToSet: { subscribers: uid } })
        .then(room => {
          let updatedUserProps = {
            "subscribedRooms": userprops.subscribedRooms,
            "favoritedRooms": userprops.favoritedRooms
          };
          let updatedRoom = { "subscribers": room.subscribers };
          let response = { updatedUserProps, updatedRoom };
          console.log("response " + response);
          res.send(response);
        })
        .catch(error => res.status(400).send("Subscribing (in Room) failed."));
    })
    .catch(error => res.status(400).send("Subscribing in (UserProps) failed."));
});

// ---------------------------------------------------------- FAVORITE / UNFAVORITE ----------------------------------------------------------

router.put("/favorite-rooms/favorite", async function(req, res) {
  let roomID = req.body.roomID;
  let uid = req.body.uid;

  let favorite;
  await UserProps.findOne({ "userID": uid }, function(error, userprops) {
    if (userprops.favoritedRooms.includes(roomID)) {
      userprops.favoritedRooms.pull(roomID);
      favorite = false;
    } else {
      userprops.favoritedRooms.addToSet(roomID);
      favorite = true;
    }
    userprops.save();
    console.log({ userprops: userprops, favorited: favorite });
    res.json({ userprops: userprops, favorited: favorite });
  });
});

router.get("/favorite-rooms/is-favorited", async function(req, res) {
  let roomID = req.query.roomID;
  let uid = req.query.uid;

  await UserProps.findOne({
    "userID": uid,
    favoritedRooms: { $in: roomID }
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
    { userID: uid },
    { $push: { notifications: notification } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("New notification failed."));
});

router.put("/delete-notification", async function(req, res) {
  let uid = req.body.uid;
  let nid = req.body.nid;
  await UserProps.findOneAndUpdate(
    { userID: uid },
    { $pull: { notifications: { _id: nid } } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Delete notification failed."));
});

module.exports = router;
