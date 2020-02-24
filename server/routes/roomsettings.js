const express = require("express");
const router = express.Router();

const Room = require("../models/room.model");

// ---------------------------------------------------------- IN PROGRESS ----------------------------------------------------------

router.put("/change-name", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_name = req.body.new_name;
  await Room.findOneAndUpdate({ _id: room_ID }, { $set: { name: new_name } })
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Room name change failed."));
  res.send("Room name updated.");
});

router.put("/change-roomsize", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_size = req.body.new_size;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $set: { "settings.room_size": new_size } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Remove tag failed."));
});

router.put("/change-privacy", async function(req, res) {
  let room_ID = req.body.room_ID;
  let privacy = req.body.privacy;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $set: { "settings.privacy": privacy } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Remove tag failed."));
});

router.put("/delete-room", async function(req, res) {
  let room_ID = req.body.room_ID;
  await Room.findByIdAndRemove(room_ID, function(error) {
    if (error) {
      res.send(error);
    } else {
      res.send("Room deleted.");
    }
  });
});

router.put("/add-admins", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_admin = req.body.new_admin;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $push: { "settings.access.roomAdmins": new_admin } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Admin addition failed."));
});

router.put("/remove-admins", async function(req, res) {
  let room_ID = req.body.room_ID;
  let del_admin = req.body.del_admin;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $pull: { "settings.access.roomAdmins": del_admin } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Admin removal failed."));
});

router.put("/add-operators", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_operator = req.body.new_operator;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $push: { "settings.access.operator": new_operator } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Operator addition failed."));
});

router.put("/remove-operators", async function(req, res) {
  let room_ID = req.body.room_ID;
  let del_operator = req.body.del_operator;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $pull: { "settings.access.operator": del_operator } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Operator removal failed."));
});

router.put("/add-inviter", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_inviter = req.body.new_inviter;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $push: { "settings.access.invitation": new_inviter } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Inviter addition failed."));
});

router.put("/remove-invite", async function(req, res) {
  let room_ID = req.body.room_ID;
  let del_inviter = req.body.del_inviter;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $pull: { "settings.access.invitation": del_inviter } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Inviter removal failed."));
});

router.put("/add-banner", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_banner = req.body.new_banner;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $push: { "settings.access.banned": new_banner } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Banner addition failed."));
});

router.put("/remove-banned", async function(req, res) {
  let room_ID = req.body.room_ID;
  let del_banner = req.body.del_banner;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $pull: { "settings.access.banned": del_banner } }
  )
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Banner removal failed."));
});

router.get("/get-chats", async function(req, res) {
  let room_ID = req.body.room_ID;
  await Chat.findOne({ room_ID: room_ID }, function(error, chat) {
    if (error) {
      res.send(error);
    } else {
      res.send(chat);
    }
  });
});

router.put("/clear-chat", async function(req, res) {
  let room_ID = req.body.room_ID;
  await Chat.findOneAndUpdate({ room_ID: room_ID }, { $set: { log: [] } })
    .then(document => res.send(document))
    .catch(error => res.status(400).send("Clear chat failed."));
});

module.exports = router;
