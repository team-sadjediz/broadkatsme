const express = require("express");
const router = express.Router();

const Room = require("../models/room.model");

// ---------------------------------------------------------- IN PROGRESS ----------------------------------------------------------

router.put("/change-name", async function(req, res) {
  let roomID = req.body.roomID;
  let newName = req.body.newName;
  await Room.findOneAndUpdate({ _id: roomID }, { $set: { name: newName } })
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Room name change failed."));
  res.send("Room name updated.");
});

router.put("/change-roomsize", async function(req, res) {
  let roomID = req.body.roomID;
  let newSize = req.body.newSize;
  await Room.findOneAndUpdate(
    { _id: roomID },
    { $set: { "settings.roomSize": newSize } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Remove tag failed."));
});

router.put("/change-privacy", async function(req, res) {
  let roomID = req.body.roomID;
  let privacy = req.body.privacy;
  await Room.findOneAndUpdate(
    { _id: roomID },
    { $set: { "settings.privacy": privacy } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Remove tag failed."));
});

router.put("/delete-room", async function(req, res) {
  let roomID = req.body.roomID;
  await Room.findByIdAndRemove(roomID, function(error) {
    if (error) {
      res.send(error);
    } else {
      res.send("Room deleted.");
    }
  });
});

router.put("/add-admins", async function(req, res) {
  let roomID = req.body.roomID;
  let newAdmin = req.body.newAdmin;
  await Room.findOneAndUpdate(
    { _id: roomID },
    { $push: { "settings.access.roomAdmins": newAdmin } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Admin addition failed."));
});

router.put("/remove-admins", async function(req, res) {
  let roomID = req.body.roomID;
  let delAdmin = req.body.delAdmin;
  await Room.findOneAndUpdate(
    { _id: roomID },
    { $pull: { "settings.access.roomAdmins": delAdmin } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Admin removal failed."));
});

router.put("/add-operators", async function(req, res) {
  let roomID = req.body.roomID;
  let newOperator = req.body.newOperator;
  await Room.findOneAndUpdate(
    { _id: roomID },
    { $push: { "settings.access.operators": newOperator } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Operator addition failed."));
});

router.put("/remove-operators", async function(req, res) {
  let roomID = req.body.roomID;
  let delOperator = req.body.delOperator;
  await Room.findOneAndUpdate(
    { _id: roomID },
    { $pull: { "settings.access.operators": delOperator } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Operator removal failed."));
});

router.put("/add-inviter", async function(req, res) {
  let roomID = req.body.roomID;
  let newInviter = req.body.newInviter;
  await Room.findOneAndUpdate(
    { _id: roomID },
    { $push: { "settings.access.invitations": newInviter } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Inviter addition failed."));
});

router.put("/remove-invite", async function(req, res) {
  let roomID = req.body.roomID;
  let delInviter = req.body.delInviter;
  await Room.findOneAndUpdate(
    { _id: roomID },
    { $pull: { "settings.access.invitations": delInviter } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Inviter removal failed."));
});

router.put("/add-banner", async function(req, res) {
  let roomID = req.body.roomID;
  let newBan = req.body.newBan;
  await Room.findOneAndUpdate(
    { _id: roomID },
    { $push: { "settings.access.bans": newBan } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Banner addition failed."));
});

router.put("/remove-banned", async function(req, res) {
  let roomID = req.body.roomID;
  let delBan = req.body.delBan;
  await Room.findOneAndUpdate(
    { _id: roomID },
    { $pull: { "settings.access.bans": delBan } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Banner removal failed."));
});

router.get("/get-chats", async function(req, res) {
  let roomID = req.body.roomID;
  await Chat.findOne({ room_ID: roomID }, function(error, chat) {
    if (error) {
      res.send(error);
    } else {
      res.send(chat);
    }
  });
});

router.put("/clear-chat", async function(req, res) {
  let roomID = req.body.roomID;
  await Chat.findOneAndUpdate({ roomID: roomID }, { $set: { log: [] } })
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Clear chat failed."));
});

module.exports = router;
