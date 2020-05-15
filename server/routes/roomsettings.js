const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Room = require("../models/room.model");
const UserProps = require("../models/userprops.model");

// ---------------------------------------------------------- NAME ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/roomsettings/change-name/${roomID}/${uid}`, null, { params: { name: STRING }})
// returns modified resource (as per convention)
router.put("/change-name/:roomID/:uid", async function (req, res) {
  console.log("called");
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let name = req.query.name;
  await Room.findOneAndUpdate(
    { _id: roomID, "settings.access.roomAdmins": uid },
    { $set: { name: name } },
    { runValidators: true, new: true }
  )
    .then((document) => res.send(document.name))
    .catch((error) => {
      error.additional =
        "Error has occured in /roomsettings/change-name/:roomID/:uid";
      res.status(400).send(error);
    });
});

// ---------------------------------------------------------- ROOMSIZE ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/roomsettings/change-roomsize/${roomID}/${uid}`, null, { params: { size: INT }})
// returns modified resource (as per convention)

// MODIFY SO IT ONLY ALLOWS ROOM SIZE CHANGES BEYOND? actually tbvh i think room size
// is an unnecessary feature so I will most likely remove it in the future
// so I'm not going to edit this function
router.put("/change-roomsize/:roomID/:uid", async function (req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let size = req.query.size;
  await Room.findOneAndUpdate(
    { _id: roomID, "settings.access.roomAdmins": uid },
    { $set: { "settings.roomSize": size } },
    { runValidators: true, new: true }
  )
    .then((document) => {
      res.send("" + document.settings.roomSize);
    })
    .catch((error) => {
      error.additional =
        "Error has occured in /roomsettings/change-roomsize/:roomID/:uid";
      res.status(400).send(error);
    });
});

// ---------------------------------------------------------- PRIVACY ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/roomsettings/change-privacy/${roomID}/${uid}`, null, { params: { privacy: true || false}})
// returns modified resource (as per convention)
router.put("/change-privacy/:roomID/:uid", async function (req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let privacy = req.query.privacy;
  await Room.findOneAndUpdate(
    { _id: roomID, "settings.access.roomAdmins": uid },
    { $set: { "settings.privacy": privacy } },
    { runValidators: true, new: true }
  )
    .then((document) => res.send(document.settings.privacy))
    .catch((error) => {
      error.additional =
        "Error had occured in /roomsettings/change-privacy/:roomID/:uid";
      res.status(400).send(error);
    });
});

// ---------------------------------------------------------- ADMINS ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/roomsettings/admins/${roomID}/${adminID}/${uid}`, null, { params: {action: "delete" || "add"}})
// returns modified resource (as per convention)
router.put("/admins/:roomID/:admin/:uid", async function (req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let admin = req.params.admin;
  let action = req.query.action;

  if (action == "delete") {
    await Room.findOneAndUpdate(
      {
        _id: roomID,
        ownerID: uid,
        ownerID: { $ne: admin },
        "settings.access.roomAdmins": admin,
      },
      { $pull: { "settings.access.roomAdmins": admin } },
      { runValidators: true, new: true }
    )
      .then((document) => res.send(document.settings.access.roomAdmins))
      .catch((error) => {
        error.additional =
          "Error has occured in /roomsettings/admins/:roomID/:admin/:uid under action = 'delete'";
        res.status(400).send(error);
      });
  } else if (action == "add") {
    await UserProps.exists({ userID: admin })
      .then((exists) => {
        return Room.findOneAndUpdate(
          {
            _id: roomID,
            ownerID: uid,
            subscribers: admin,
            "settings.access.bans": { $nin: admin },
          },
          {
            $addToSet: {
              "settings.access.roomAdmins": admin,
              "settings.access.operators": admin,
              "settings.access.invitations": admin,
            },
          },
          { runValidators: true, new: true }
        );
      })
      .then((document) => res.send(document.settings.access))
      .catch((error) => {
        error.additional =
          "Error has occured in /roomsettings/admins/:roomID/:admin/:uid under action = 'add'";
        res.status(400).send(error);
      });
  } else {
    res
      .status(404)
      .send(
        "Bad request in /roomsettings/admins/:roomID/:admin/:uid, no action defined"
      );
  }
});

// ---------------------------------------------------------- OPERATORS ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/roomsettings/operators/${roomID}/${operatorID}/${uid}`, null, { params: {action: "delete" || "add"}})
// returns modified resource (as per convention)
router.put("/operators/:roomID/:operator/:uid", async function (req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let operator = req.params.operator;
  let action = req.query.action;

  if (action == "delete") {
    await Room.findOneAndUpdate(
      {
        _id: roomID,
        "settings.access.roomAdmins": uid,
        ownerID: { $ne: operator },
      },
      { $pull: { "settings.access.operators": operator } },
      { runValidators: true, new: true }
    )
      .then((document) => res.send(document.settings.access.operators))
      .catch((error) => {
        error.additional =
          "Error has occured in /roomsettings/operators/:roomID/:operator/:uid under action = 'delete'";
        res.status(400).send(error);
      });
  } else if (action == "add") {
    await UserProps.exists({ userID: operator })
      .then((exists) => {
        return Room.findOneAndUpdate(
          {
            _id: roomID,
            "settings.access.roomAdmins": uid,
            subscribers: operator,
            "settings.access.bans": { $nin: operator },
          },
          { $addToSet: { "settings.access.operators": operator } },
          { runValidators: true, new: true }
        );
      })
      .then((document) => res.send(document.settings.access.operators))
      .catch((error) => {
        error.additional =
          "Error has occured in /roomsettings/operators/:roomID/:operator/:uid under action = 'add'";
        res.status(400).send(error);
      });
  } else {
    res
      .status(404)
      .send(
        "Bad request in /roomsettings/operators/:roomID/:operator/:uid, no action defined"
      );
  }
});

// ---------------------------------------------------------- INVITES ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/roomsettings/inviters/${roomID}/${inviterID}/${uid}`, null, { params: {action: "delete" || "add"}})
// returns modified resource (as per convention)
router.put("/inviters/:roomID/:inviter/:uid", async function (req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let inviter = req.params.inviter;
  let action = req.query.action;

  if (action == "delete") {
    await Room.findOneAndUpdate(
      {
        _id: roomID,
        "settings.access.roomAdmins": uid,
        ownerID: { $ne: inviter },
      },
      { $pull: { "settings.access.invitations": inviter } },
      { runValidators: true, new: true }
    )
      .then((document) => res.send(document.settings.access.invitations))
      .catch((error) => {
        error.additional =
          "Error has occured in /roomsettings/inviters/:roomID/:inviter/:uid under action = 'delete'";
        res.status(400).send(error);
      });
  } else if (action == "add") {
    await UserProps.exists({ userID: inviter })
      .then((exists) => {
        return Room.findOneAndUpdate(
          {
            _id: roomID,
            "settings.access.roomAdmins": uid,
            subscribers: inviter,
            "settings.access.bans": { $nin: inviter },
          },
          { $addToSet: { "settings.access.invitations": inviter } },
          { runValidators: true, new: true }
        );
      })
      .then((document) => res.send(document.settings.access.invitations))
      .catch((error) => {
        error.additional =
          "Error has occured in /roomsettings/inviters/:roomID/:inviter/:uid under action = 'add'";
        res.status(400).send(error);
      });
  } else {
    res
      .status(404)
      .send(
        "Bad request in /roomsettings/inviters/:roomID/:inviter/:uid, no action defined"
      );
  }
});

// ---------------------------------------------------------- BANS ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/roomsettings/ban/${roomID}/${bannedID}/${uid}`, null, { params: {action: "unban" || "ban"}})
// returns modified resource (as per convention)

router.put("/ban/:roomID/:banned/:uid", async function (req, res) {
  let roomID = req.params.roomID;
  let userID = req.params.uid;
  let bannedID = req.params.banned;
  let action = req.query.action;
  if (action == "unban") {
    try {
      let bannedUsers = await unban(roomID, userID, bannedID);
      res.send(bannedUsers);
    } catch (error) {
      error.additional = `Error has occured in /roomsettings/ban/:roomID/:banned/:uid under action = ${action}`;
      res.status(400).send(error);
    }
  } else if (action == "ban") {
    try {
      let bannedResults = await ban(roomID, userID, bannedID);
      res.send(bannedResults);
    } catch (error) {
      error.additional = `Error has occured in /roomsettings/ban/:roomID/:banned/:uid under action = '${action}'`;
      res.status(400).send(error);
    }
  } else {
    res.status(404).send("Bad request.");
  }
});

async function ban(roomID, userID, bannedID) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true, runValidators: true };

    let exists = await UserProps.exists({ userID: bannedID });
    let updatedRoom, updatedUserProps, response;

    if (exists) {
      updatedRoom = await Room.findOneAndUpdate(
        {
          _id: roomID,
          "settings.access.roomAdmins": userID,
          ownerID: { $ne: bannedID },
          // subscribers: bannedID
        },
        {
          $addToSet: { "settings.access.bans": bannedID },
          $pull: {
            "settings.access.roomAdmins": bannedID,
            "settings.access.operators": bannedID,
            "settings.access.invitations": bannedID,
            subscribers: bannedID,
          },
        },
        opts
      );

      updatedUserProps = await UserProps.findOneAndUpdate(
        { userID: bannedID },
        { $pull: { subscribedRooms: roomID, favoritedRooms: roomID } },
        opts
      );

      response = {
        bannedUser: {
          subscribedRooms: updatedUserProps.subscribedRooms,
          favoritedRooms: updatedUserProps.favoritedRooms,
        },
        updatedRoomAccess: updatedRoom.settings.access,
        updatedSubscribers: updatedRoom.subscribers,
      };

      await session.commitTransaction();
      session.endSession();
      return response;
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    // console.log(error);
    error.additional =
      "Error has occured in /roomsettings/ban/:roomID/:banned/:uid under action='add'";
    throw error;
  }
}

async function unban(roomID, userID, bannedID) {
  try {
    const opts = { new: true, runValidators: true };

    let updatedRoom = await Room.findOneAndUpdate(
      {
        _id: roomID,
        "settings.access.roomAdmins": userID,
      },
      { $pull: { "settings.access.bans": bannedID } },
      opts
    );

    return updatedRoom.settings.access.bans;
  } catch (error) {
    error.additional =
      "Error has occurred in /roomsettings/ban/:roomID/:banned/:uid with action='delete'";
    throw error;
  }
}

module.exports = router;
