const express = require("express");
const router = express.Router();

const Room = require("../models/room.model");
const UserProps = require("../models/userprops.model");

// ---------------------------------------------------------- NAME ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/roomsettings/change-name/${roomID}/${uid}`, null, { params: { name: STRING }})
// returns modified resource (as per convention)
router.put("/change-name/:roomID/:uid", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let name = req.query.name;
  await Room.findOneAndUpdate(
    { _id: roomID, "settings.access.roomAdmins": uid },
    { $set: { name: name } },
    { runValidators: true, new: true }
  )
    .then(document => res.send(document.name))
    .catch(error => {
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
router.put("/change-roomsize/:roomID/:uid", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let size = req.query.size;
  await Room.findOneAndUpdate(
    { _id: roomID, "settings.access.roomAdmins": uid },
    { $set: { "settings.roomSize": size } },
    { runValidators: true, new: true }
  )
    .then(document => {
      res.send("" + document.settings.roomSize);
    })
    .catch(error => {
      error.additional =
        "Error has occured in /roomsettings/change-roomsize/:roomID/:uid";
      res.status(400).send(error);
    });
});

// ---------------------------------------------------------- PRIVACY ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/roomsettings/change-privacy/${roomID}/${uid}`, null, { params: { privacy: true || false}})
// returns modified resource (as per convention)
router.put("/change-privacy/:roomID/:uid", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let privacy = req.query.privacy;
  await Room.findOneAndUpdate(
    { _id: roomID, "settings.access.roomAdmins": uid },
    { $set: { "settings.privacy": privacy } },
    { runValidators: true, new: true }
  )
    .then(document => res.send(document.settings.privacy))
    .catch(error => {
      error.additional =
        "Error had occured in /roomsettings/change-privacy/:roomID/:uid";
      res.status(400).send(error);
    });
});

// ---------------------------------------------------------- ADMINS ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/roomsettings/admins/${roomID}/${adminID}/${uid}`, null, { params: {action: "delete" || "add"}})
// returns modified resource (as per convention)
router.put("/admins/:roomID/:admin/:uid", async function(req, res) {
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
        "settings.access.roomAdmins": admin
      },
      { $pull: { "settings.access.roomAdmins": admin } },
      { runValidators: true, new: true }
    )
      .then(document => res.send(document.settings.access.roomAdmins))
      .catch(error => {
        error.additional =
          "Error has occured in /roomsettings/admins/:roomID/:admin/:uid under action = 'delete'";
        res.status(400).send(error);
      });
  } else if (action == "add") {
    await UserProps.exists({ userID: admin })
      .then(exists => {
        return Room.findOneAndUpdate(
          {
            _id: roomID,
            ownerID: uid,
            subscribers: admin,
            "settings.access.bans": { $nin: admin }
          },
          { $addToSet: { "settings.access.roomAdmins": admin } },
          { runValidators: true, new: true }
        );
      })
      .then(document => res.send(document.settings.access.roomAdmins))
      .catch(error => {
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
router.put("/operators/:roomID/:operator/:uid", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let operator = req.params.operator;
  let action = req.query.action;

  if (action == "delete") {
    await Room.findOneAndUpdate(
      {
        _id: roomID,
        "settings.access.roomAdmins": uid,
        ownerID: { $ne: operator }
      },
      { $pull: { "settings.access.operators": operator } },
      { runValidators: true, new: true }
    )
      .then(document => res.send(document.settings.access.operators))
      .catch(error => {
        error.additional =
          "Error has occured in /roomsettings/operators/:roomID/:operator/:uid under action = 'delete'";
        res.status(400).send(error);
      });
  } else if (action == "add") {
    await UserProps.exists({ userID: operator })
      .then(exists => {
        return Room.findOneAndUpdate(
          {
            _id: roomID,
            "settings.access.roomAdmins": uid,
            subscribers: operator,
            "settings.access.bans": { $nin: operator }
          },
          { $addToSet: { "settings.access.operators": operator } },
          { runValidators: true, new: true }
        );
      })
      .then(document => res.send(document.settings.access.operators))
      .catch(error => {
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
router.put("/inviters/:roomID/:inviter/:uid", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let inviter = req.params.inviter;
  let action = req.query.action;

  if (action == "delete") {
    await Room.findOneAndUpdate(
      {
        _id: roomID,
        "settings.access.roomAdmins": uid,
        ownerID: { $ne: inviter }
      },
      { $pull: { "settings.access.invitations": inviter } },
      { runValidators: true, new: true }
    )
      .then(document => res.send(document.settings.access.invitations))
      .catch(error => {
        error.additional =
          "Error has occured in /roomsettings/inviters/:roomID/:inviter/:uid under action = 'delete'";
        res.status(400).send(error);
      });
  } else if (action == "add") {
    await UserProps.exists({ userID: inviter })
      .then(exists => {
        return Room.findOneAndUpdate(
          {
            _id: roomID,
            "settings.access.roomAdmins": uid,
            subscribers: inviter,
            "settings.access.bans": { $nin: inviter }
          },
          { $addToSet: { "settings.access.invitations": inviter } },
          { runValidators: true, new: true }
        );
      })
      .then(document => res.send(document.settings.access.invitations))
      .catch(error => {
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
// axios.put(`${BASE_API_URL}/roomsettings/ban/${roomID}/${bannedID}/${uid}`, null, { params: {action: "delete" || "add"}})
// returns modified resource (as per convention)
router.put("/ban/:roomID/:banned/:uid", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let banned = req.params.banned;
  let action = req.query.action;
  if (action == "delete") {
    await Room.findOneAndUpdate(
      { _id: roomID, "settings.access.roomAdmins": uid },
      { $pull: { "settings.access.bans": banned } },
      { runValidators: true, new: true }
    )
      .then(document => res.send(document.settings.access.bans))
      .catch(error => {
        error.additional = `Error has occured in /roomsettings/ban/:roomID/:banned/:uid under action = ${action}`;
        res.status(400).send(error);
      });
  } else if (action == "add") {
    let updatedRoom, updatedUserProps;
    await UserProps.exists({ userID: banned })
      .then(exists => {
        return Room.findOneAndUpdate(
          {
            _id: roomID,
            "settings.access.roomAdmins": uid,
            ownerID: { $ne: banned },
            subscribers: banned
            // "settings.access.roomAdmins": { $nin: banned }
          },
          {
            $addToSet: { "settings.access.bans": banned },
            $pull: {
              "settings.access.roomAdmins": banned,
              "settings.access.operators": banned,
              "settings.access.invitations": banned,
              subscribers: banned
            }
          },
          { runValidators: true, new: true }
        );
      })
      .then(document => {
        updatedRoom = document;
        return UserProps.findOneAndUpdate(
          { userID: banned },
          {
            $pull: { subscribedRooms: roomID, favoritedRooms: roomID }
          },
          { runValidators: true, new: true }
        );
        // res.send(document.settings.access.bans);
      })
      .then(document => {
        updatedUserProps = document;
        res.send({
          banned: {
            subscribedRooms: document.subscribedRooms,
            favoritedRooms: document.favoritedRooms
          },
          room: {
            bans: updatedRoom.settings.access.bans
          }
        });
      })
      .catch(async error => {
        let additional = `Error has occured in /roomsettings/ban/:roomID/:banned/:uid under action = '${action}'`;
        if (updatedRoom && updatedUserProps == null) {
          await Room.findOneAndUpdate(
            {
              _id: roomID,
              "settings.access.roomAdmins": uid,
              ownerID: { $ne: banned },
              subscribers: banned,
              "settings.access.roomAdmins": { $nin: banned }
            },
            {
              $pull: { "settings.access.bans": banned },
              // ISSUE: NOT PERSISTENT - SHOULD BE FIXED WITH TRANSACTIONS
              // CURRENT ISSUE IS STOPGAP FIX
              // $addToSet: { "settings.access.roomAdmins": banned },
              // $addToSet: { "settings.access.operators": banned },
              // $addToSet: { "settings.access.invitations": banned },
              $addToSet: { subscribers: banned }
            },
            { runValidators: true, new: true }
          ).then(
            room =>
              (additional += ` ; ${uid} readded to ${roomID} subscribed, etc.`)
          );
        }
        error.additional = additional;
        res.status(400).send(error);
      });
  } else {
    // YOU STILL HAVE TO FIX IF ONE SENDS BUT THE OTHER DOES NOT
    res.status(404).send("Bad request.");
  }
});

module.exports = router;
