var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

// const UserProfile = require("../models/userprofile.model");
const UserProps = require("../models/userprops.model");
const Room = require("../models/room.model");

// ---------------------------------------------------------- FIND PROPS ----------------------------------------------------------

// How To Use
// axios.get(`${BASE_API_URL}/userprops/props/${uid}`)
// returns user props of uid (as per convention)
router.get("/props/:uid", async function (req, res) {
  let uid = req.params.uid;
  await UserProps.findOne({ userID: uid })
    .then((userprops) => {
      res.send({ userprops });
    })
    .catch((error) => {
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
// axios.get(`${BASE_API_URL}/userprops/rooms/${uid}`)
// returns list of all rooms a user is subscribed to (as per convnetion)
router.get("/rooms/:uid", async function (req, res) {
  let uid = req.params.uid;
  console.log("uid", uid);
  await UserProps.findOne({ userID: uid })
    .then((document) => {
      return UserProps.findOne({ userID: uid }).populate("subscribedRooms");
    })
    .then((populatedProps) => {
      let rooms = populatedProps.subscribedRooms;
      let roomUrls = [];
      rooms.forEach(function (room) {
        roomUrls.push({
          "roomID": room._id,
          ...room._doc,
        });
      });
      res.send(roomUrls);
    })
    .catch((error) => {
      error.additional = "Error has occured in /userprops/rooms/:uid";
      res.status(404).send(error);
    });
});

// ---------------------------------------------------------- UN/SUBSCRIBE TO ROOM ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/userprops/search/${room}/${uid}`, null, { params: { action: "unsubscribe" || "subscribe" }})
// returns updated list of subscribed rooms (as per convention)
router.put("/subscribe/:roomID/:uid", async function (req, res) {
  let roomID = req.params.roomID;
  let userID = req.params.uid;
  let action = req.query.action;

  if (action == "unsubscribe") {
    try {
      let response = await unsubscribe(roomID, userID);
      res.send(response);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
    // ----------------------------------------------------------------------------------
  } else if (action == "subscribe") {
    try {
      let response = await subscribe(roomID, userID);
      res.send(response);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  } else {
    res
      .status(400)
      .send(
        `Bad request in /roomsettings/admins/:roomID/:admin/:uid, action is ${action}`
      );
  }
});

async function unsubscribe(roomID, userID) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true, runValidators: true };

    let updatedUserProps = await UserProps.findOneAndUpdate(
      {
        userID: userID,
        ownedRooms: { $nin: roomID },
      },
      { $pull: { subscribedRooms: roomID, favoritedRooms: roomID } },
      opts
    );

    let updatedRoom = await Room.findByIdAndUpdate(
      roomID,
      { $pull: { subscribers: userID } },
      opts
    );

    let response = {
      updatedUserProps: {
        subscribedRooms: updatedUserProps.subscribedRooms,
        favoritedRooms: updatedUserProps.favoritedRooms,
      },
      updatedRoom: {
        subscribers: updatedRoom.subscribers,
      },
    };

    await session.commitTransaction();
    session.endSession();
    return response;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    error.additional = `Error has occured in /userprops/subscribe/:roomID/:uid under action = 'unsubscribe'`;
    throw error;
  }
}

async function subscribe(roomID, userID) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true, runValidators: true };

    let updatedRoom = await Room.findOneAndUpdate(
      {
        _id: roomID,
        "settings.access.bans": { $nin: userID },
        "settings.privacy": false,
        $expr: { $lt: [{ "$size": "$subscribers" }, "$settings.roomSize"] },
        // $and: [
        //   {
        //     $expr: { $lt: [{ "$size": "$subscribers" }, "$settings.roomSize"] }
        //   },
        //   {
        //     $expr: { $gt: [{ "$size": "$subscribers" }, 1] }
        //   }
        // ]
      },
      { $addToSet: { subscribers: userID } },
      opts
    );

    let updatedUserProps = await UserProps.findOneAndUpdate(
      { userID: userID },
      { $addToSet: { subscribedRooms: roomID } },
      opts
    );

    let response = {
      updatedUserProps: { subscribedRooms: updatedUserProps.subscribedRooms },
      updatedRoom: { subscribers: updatedRoom.subscribers },
    };

    await session.commitTransaction();
    session.endSession();
    return response;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    error.additional = `Error has occured in /userprops/subscribe/:roomID/:uid under action = 'subscribe'`;
    throw error;
  }
}

// ---------------------------------------------------------- FAVORITE  ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/userprops/favorites/${roomID}/${uid}`, null, { params: { action: "" }})
// action == "exists" || "favorite" || "unfavorite"
router.put("/favorites/:roomID/:uid", async function (req, res) {
  let roomID = req.params.roomID;
  let userID = req.params.uid;
  let action = req.query.action;

  if (action == "exists") {
    try {
      let response = await checkFavoriteRoom(roomID, userID);
      res.send(response);
    } catch (error) {
      res.status(404).send(error);
    }
  } else if (action == "favorite") {
    try {
      let response = await favorite(roomID, userID);
      if (response.updatedUserProps.favoritedRooms.includes(roomID)) {
        response = true;
      } else {
        response = false;
      }
      res.send(response);
    } catch (error) {
      res.status(404).send(error);
    }
  } else if (action == "unfavorite") {
    try {
      let response = await unfavorite(roomID, userID);
      if (response.updatedUserProps.favoritedRooms.includes(roomID)) {
        response = true;
      } else {
        response = false;
      }
      res.send(response);
    } catch (error) {
      res.status(404).send(error);
    }
  } else {
    res.status(400).send("Bad request; action undefined.");
  }
});

async function checkFavoriteRoom(roomID, userID) {
  let favorited;
  try {
    favorited = await UserProps.exists({
      userID: userID,
      favoritedRooms: { $in: roomID },
    });
    return favorited;
  } catch (error) {
    error.additional = `Error has occured in userprops/favorite/:roomID/:uid with action=exists`;
    throw error;
  }
}

async function favorite(roomID, userID) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true, runValidators: true };

    let exists = await Room.exists({ _id: roomID }, opts);
    let updatedUserProps;

    if (exists) {
      updatedUserProps = await UserProps.findOneAndUpdate(
        { userID: userID },
        { $addToSet: { favoritedRooms: roomID } },
        opts
      );
    }

    await session.commitTransaction();
    session.endSession();
    return {
      updatedUserProps: { favoritedRooms: updatedUserProps.favoritedRooms },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    error.additional = `Error has occurred in /userprops/favorites/:roomID/:uid with action=favorite`;
    throw error;
  }
}

async function unfavorite(roomID, userID) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true, runValidators: true };

    let exists = await Room.exists({ _id: roomID }, opts);
    let updatedUserProps = await UserProps.findOneAndUpdate(
      { userID: userID },
      { $pull: { favoritedRooms: roomID } },
      opts
    );

    await session.commitTransaction();
    session.endSession();
    return {
      updatedUserProps: { favoritedRooms: updatedUserProps.favoritedRooms },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    error.additional = `Error has occurred in /userprops/favorites/:roomID/:uid with action=unfavorite`;
    throw error;
  }
}

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
