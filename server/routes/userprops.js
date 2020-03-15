var express = require("express");
var router = express.Router();

// const UserProfile = require("../models/userprofile.model");
const UserProps = require("../models/userprops.model");
const Room = require("../models/room.model");

// ---------------------------------------------------------- FIND PROPS ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/userprops/props/${uid}`)
// returns user props of uid (as per convention)
router.get("/props/:uid", async function(req, res) {
  let uid = req.params.uid;
  await UserProps.findOne({ userID: uid })
    .then(userprops => {
      res.send({ userprops });
    })
    .catch(error => {
      error.additional = "Error has occured in /userprops/props/:uid";
      res.status(404).send(error);
    });
});

// router.get("/friends-list", async function(req, res) {
//   let uid = req.query.uid;

//   let friendslist = await UserProps.findOne({ userID: uid })
//     .then(document => document)
//     .catch(error => console.log(error));

//   if (friendslist) {
//     await UserProps.findOne({ userID: uid })
//       .populate("friends")
//       .exec((error, populatedProps) => {
//         let friendsListDetailed = [];
//         let friendslist = populatedProps.friends;
//         friendslist.forEach(function(room) {
//           friendsListDetailed.push({
//             "userID": room._id,
//             "username": room.name,
//             "photoURL": room.thumbnailUrl,
//             "chatColor": room.tags
//           });
//         });
//         console.log("friendslist:", friendslist);
//         res.send(friendslist);
//       });
//   } else {
//     res.send([]);
//   }
// });

// ---------------------------------------------------------- FIND USERS ROOMS ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/userprops/rooms/${uid}`)
// returns list of all rooms a user is subscribed to (as per convnetion)
router.get("/rooms/:uid", async function(req, res) {
  let uid = req.params.uid;
  console.log("uid", uid);
  await UserProps.findOne({ userID: uid })
    .then(document => {
      return UserProps.findOne({ userID: uid }).populate("subscribedRooms");
    })
    .then(populatedProps => {
      let rooms = populatedProps.subscribedRooms;
      let roomUrls = [];
      rooms.forEach(function(room) {
        roomUrls.push({
          "roomID": room._id,
          "name": room.name,
          "thumbnailUrl": room.thumbnailUrl,
          "tags": room.tags
        });
      });
      res.send(roomUrls);
    })
    .catch(error => {
      error.additional = "Error has occured in /userprops/rooms/:uid";
      res.status(404).send(error);
    });
});

// ---------------------------------------------------------- UN/SUBSCRIBE TO ROOM ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/userprops/search/${room}/${uid}`, null, { params: { action: "unsubscribe" || "subscribe" }})
// returns updated list of subscribed rooms (as per convention)

// ISSUE IN SUBSCRIBE: DOES NOT THROW ERROR IF CANNOT ADD BEYOND ROOM LIMIT
// RETURNS MOST UPDATED LIST OF SUBSCRIBED ROOMS, ETC.
// IN PROGRESS
router.put("/subscribe/:roomID/:uid", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let action = req.query.action;

  if (action == "unsubscribe") {
    let updatedUserProps;
    let updatedRoom;
    await UserProps.findOneAndUpdate(
      { "userID": uid, "ownedRooms": { $nin: roomID } },
      {
        $pull: {
          subscribedRooms: roomID,
          favoritedRooms: roomID
        }
      },
      { runValidators: true, new: true }
    )
      .then(userprops => {
        updatedUserProps = userprops;
        return Room.findByIdAndUpdate(
          roomID,
          { $pull: { subscribers: uid } },
          { runValidators: true, new: true }
        );
      })
      .then(room => {
        updatedRoom = room;
        let response = {
          updatedUserProps: {
            "subscribedRooms": updatedUserProps.subscribedRooms,
            "favoritedRooms": updatedUserProps.favoritedRooms
          },
          updatedRoom: { "subscribers": room.subscribers }
        };
        console.log("response " + response);
        res.send(response);
      })
      .catch(async error => {
        // If user's props have been updated for unsubscribe, but room has failed, readd to user props.
        // POSSIBLE LEAK: DATA CORRUPTION IF THIS FAILS. SOLUTION: LOOP - NOT IMPLEMENTED / EXPENSIVE
        let additional = `Error has occured in /userprops/subscribe/:roomID/:uid under action = '${action}'`;
        if (updatedUserProps && updatedRoom == null) {
          await UserProps.findOneAndUpdate(
            { "userID": uid, "ownedRooms": { $nin: roomID } },
            {
              $addToSet: {
                subscribedRooms: roomID,
                favoritedRooms: roomID
              }
            },
            { runValidators: true, new: true }
          ).then(
            room => (additional += ` ; ${roomID} readded to ${uid} props`)
          );
        }
        error.additional = additional;
        res.status(400).send(error);
      });
    // ----------------------------------------------------------------------------------
  } else if (action == "subscribe") {
    let updatedUserProps;
    let updatedRoom;
    await Room.findOneAndUpdate(
      {
        _id: roomID,
        "settings.access.bans": { $nin: uid },
        subscribers: { $nin: uid },
        "settings.privacy": false
      },
      {
        // CHANGE
        $push: { subscribers: { $each: [uid], $slice: 5 } }
      },
      { runValidators: true }
    )
      .then(room => {
        updatedRoom = room;
        if (room.subscribers.length == 5) {
          return UserProps.findOne({ "userID": uid });
        } else {
          updatedRoom.subscribers.push(uid);
          return UserProps.findOneAndUpdate(
            { "userID": uid },
            {
              $addToSet: {
                subscribedRooms: roomID
              }
            },
            { runValidators: true, new: true }
          );
        }
      })
      .then(userprops => {
        updatedUserProps = userprops;
        let response = {
          updatedUserProps: {
            "subscribedRooms": updatedUserProps.subscribedRooms
          },
          updatedRoom: { "subscribers": updatedRoom.subscribers }
        };
        console.log("response " + response);
        res.send(response);
      })
      // await UserProps.findOneAndUpdate(
      //   { "userID": uid },
      //   {
      //     $addToSet: {
      //       subscribedRooms: roomID
      //       // favorited_rooms: roomID
      //     }
      //   },
      //   { runValidators: true, new: true }
      // )
      //   .then(userprops => {
      //     updatedUserProps = userprops;
      //     return Room.findOneAndUpdate(
      //       {
      //         _id: roomID,
      //         "settings.access.bans": { $nin: uid },
      //         subscribers: { $ne: uid }
      //       },
      //       {
      //         // CHANGE
      //         $push: { subscribers: { $each: [uid], $slice: 5 } }
      //       },
      //       { runValidators: true, new: true }
      //     );
      //   })
      //   .then(room => {
      //     updatedRoom = room;
      //     let response = {
      //       updatedUserProps: {
      //         "subscribedRooms": updatedUserProps.subscribedRooms,
      //         "favoritedRooms": updatedUserProps.favoritedRooms
      //       },
      //       updatedRoom: { "subscribers": room.subscribers }
      //     };
      //     console.log("response " + response);
      //     res.send(response);
      //   })
      .catch(async error => {
        // If user's props have been updated for subscribe, but room has failed, remove from props.
        // POSSIBLE LEAK: DATA CORRUPTION IF THIS FAILS. SOLUTION: LOOP - NOT IMPLEMENTED / EXPENSIVE
        let additional = `Error has occured in /userprops/subscribe/:roomID/:uid under action = '${action}'`;
        if (updatedUserProps && updatedRoom == null) {
          await UserProps.findOneAndUpdate(
            { "userID": uid },
            {
              $pull: {
                subscribedRooms: roomID
              }
            },
            { runValidators: true, new: true }
          ).then(
            room => (additional += ` ; ${roomID} removed from ${uid} props`)
          );
        }
        error.additional = additional;
        res.status(400).send(error);
      });
  } else {
    res
      .status(400)
      .send(
        `Bad request in /roomsettings/admins/:roomID/:admin/:uid, action is ${action}`
      );
  }
});

// ---------------------------------------------------------- FAVORITE  ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/userprops/favorite/${roomID}/${uid}`)
// favorites room depending on current status (as per convention)
router.put("/favorite/:roomID/:uid", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;

  let favorite;
  await Room.exists({ _id: roomID })
    .then(exists => {
      return UserProps.findOne({ "userID": uid });
    })
    .then(userprops => {
      if (userprops.favoritedRooms.includes(roomID)) {
        userprops.favoritedRooms.pull(roomID);
        favorite = false;
      } else {
        userprops.favoritedRooms.addToSet(roomID);
        favorite = true;
      }
      userprops.save();
      // console.log({ userprops: userprops, favorited: favorite });
      res.json({ userprops: userprops, favorited: favorite });
    })
    .catch(error => {
      error.additional = `Error has occured in /userprops/favorite/:roomID/:uid`;
      res.status(404).send(error);
    });
});

// How To Use
// axios.put(`${BASE_API_URL}/userprops/favorited/${roomID}/${uid}`)
// returns if room is favorited(as per convention)
router.get("/favorited/:roomID/:uid", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;

  await UserProps.findOne({
    "userID": uid
  })
    .then(document => {
      if (document.favoritedRooms.includes(roomID)) {
        res.send(true);
      } else {
        res.send(false);
      }
    })
    .catch(error => res.status(400).send(error));
});

// ---------------------------------------------------------- ADD / REMOVE NOTIFICATIONS ----------------------------------------------------------

// router.put("/new-notification", async function(req, res) {
//   let uid = req.body.uid;
//   let title = req.body.title;
//   let message = req.body.message;
//   let notification = { title: title, message: message };
//   await UserProps.findOneAndUpdate(
//     { userID: uid },
//     { $push: { notifications: notification } },
//     { runValidators: true, new: true }
//   )
//     .then(document => res.send(document))
//     .catch(error => res.status(400).send("New notification failed."));
// });

// router.put("/delete-notification", async function(req, res) {
//   let uid = req.body.uid;
//   let nid = req.body.nid;
//   await UserProps.findOneAndUpdate(
//     { userID: uid },
//     { $pull: { notifications: { _id: nid } } },
//     { runValidators: true, new: true }
//   )
//     .then(document => res.send(document))
//     .catch(error => res.status(400).send("Delete notification failed."));
// });

module.exports = router;
