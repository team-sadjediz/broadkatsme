const express = require("express");
const router = express.Router();

const Room = require("../models/room.model");

// ---------------------------------------------------------- NAME ----------------------------------------------------------

router.put("/change-name/:roomID/:uid", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let name = req.query.name;
  await Room.findOneAndUpdate(
    { _id: roomID, roomAdmins: uid },
    { $set: { name: name } },
    { new: true }
  )
    .then(document => res.send(document.name))
    .catch(error => res.status(400).send("Room name change failed."));
  res.send("Room name updated.");
});

// ---------------------------------------------------------- ROOMSIZE ----------------------------------------------------------

router.put("/change-roomsize/:roomID/:uid", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let size = req.query.size;
  await Room.findOneAndUpdate(
    { _id: roomID, roomAdmins: uid },
    { $set: { "settings.roomSize": size } },
    { new: true }
  )
    .then(document => res.send(document.settings.roomSize))
    .catch(error => res.status(400).send("Remove tag failed."));
});

// ---------------------------------------------------------- PRIVACY ----------------------------------------------------------

router.put("/change-privacy/:roomID/:uid", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let privacy = req.query.privacy;
  await Room.findOneAndUpdate(
    { _id: roomID, roomAdmins: uid },
    { $set: { "settings.privacy": privacy } },
    { new: true }
  )
    .then(document => res.send(document.privacy))
    .catch(error => res.status(400).send("Remove tag failed."));
});

// ---------------------------------------------------------- ADMINS ----------------------------------------------------------

router.put("/admins/:roomID/:uid/:admin", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let admin = req.params.admin;
  let action = req.query.action;

  if (action == "delete") {
    await Room.findOneAndUpdate(
      { _id: roomID, ownerID: uid },
      { $pull: { "settings.access.roomAdmins": admin } },
      { new: true }
    )
      .then(document => res.send(document.settings.access.roomAdmins))
      .catch(error => res.status(400).send("Admin removal failed."));
  } else if (action == "add") {
    await Room.findOneAndUpdate(
      { _id: roomID, ownerID: uid },
      { $push: { "settings.access.roomAdmins": admin } },
      { new: true }
    )
      .then(document => res.send(document.settings.access.roomAdmins))
      .catch(error => res.status(400).send("Admin addition failed."));
  } else {
    res.status(404).send("Bad request.");
  }
});

// ---------------------------------------------------------- OPERATORS ----------------------------------------------------------

router.put("/operators/:roomID/:uid/:operator", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let operator = req.params.operator;
  let action = req.query.action;

  if (action == "delete") {
    await Room.findOneAndUpdate(
      { _id: roomID, roomAdmins: uid },
      { $pull: { "settings.access.operators": operator } },
      { new: true }
    )
      .then(document => res.send(document.settings.access.operators))
      .catch(error => res.status(400).send("Operator removal failed."));
  } else if (action == "add") {
    await Room.findOneAndUpdate(
      { _id: roomID, roomAdmins: uid },
      { $push: { "settings.access.operators": operator } },
      { new: true }
    )
      .then(document => res.send(document.settings.access.operators))
      .catch(error => res.status(400).send("Operator addition failed."));
  } else {
    res.status(404).send("Bad request.");
  }
});

// ---------------------------------------------------------- INVITES ----------------------------------------------------------

router.put("/inviter/:roomID/:uid/:inviter", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let inviter = req.params.inviter;
  let action = req.query.action;

  if (action == "delete") {
    await Room.findOneAndUpdate(
      { _id: roomID, roomAdmins: uid },
      { $pull: { "settings.access.invitations": inviter } },
      { new: true }
    )
      .then(document => res.send(document.settings.access.invitations))
      .catch(error => res.status(400).send("Inviter removal failed."));
  } else if (action == "add") {
    await Room.findOneAndUpdate(
      { _id: roomID, roomAdmins: uid },
      { $push: { "settings.access.invitations": inviter } },
      { new: true }
    )
      .then(document => res.send(document.settings.access.invitations))
      .catch(error => res.status(400).send("Inviter addition failed."));
  } else {
    res.status(404).send("Bad request.");
  }
});

// ---------------------------------------------------------- BANS ----------------------------------------------------------

router.put("/ban/:roomID/:uid/:banned", async function(req, res) {
  let roomID = req.params.roomID;
  let uid = req.params.uid;
  let banned = req.params.banned;
  let action = req.query.action;

  if (action == "delete") {
    await Room.findOneAndUpdate(
      { _id: roomID },
      { $pull: { "settings.access.bans": delBan } },
      { new: true }
    )
      .then(document => res.send(document.settings.access.bans))
      .catch(error => res.status(400).send("Banner removal failed."));
  } else if (action == "add") {
    await Room.findOneAndUpdate(
      { _id: roomID },
      { $push: { "settings.access.bans": newBan } },
      { new: true }
    )
      .then(document => res.send(document.settings.access.bans))
      .catch(error => res.status(400).send("Banner addition failed."));
  } else {
    res.status(404).send("Bad request.");
  }
});

// ---------------------------------------------------------- CHATS ----------------------------------------------------------

// router.get("/get-chats", async function(req, res) {
//   let roomID = req.body.roomID;
//   await Chat.findOne({ room_ID: roomID }, function(error, chat) {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(chat);
//     }
//   });
// });

// router.put("/clear-chat", async function(req, res) {
//   let roomID = req.body.roomID;
//   await Chat.findOneAndUpdate({ roomID: roomID }, { $set: { log: [] } })
//     .then(document => res.send(document))
//     .catch(error => res.status(400).send("Clear chat failed."));
// });

module.exports = router;
