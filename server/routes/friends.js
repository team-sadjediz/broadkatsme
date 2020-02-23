const express = require("express");
const router = express.Router();

const UserProps = require("../models/userprops.model");

// ---------------------------------------------------------- IN PROGRESS ----------------------------------------------------------

router.put("/add-subscriber", async function(req, res) {
  let room_ID = req.body.room_ID;
  let new_subscriber = req.body.uid;

  let room_document, userprops_document;
  await Room.findOneAndUpdate(
    { _id: room_ID },
    { $addToSet: { subscriber: new_subscriber } }
  )
    .then(document => (room_document = document))
    .catch(error => res.status(400).send("Add subscriber failed."));

  if (room_document) {
    await UserProps.findOneAndUpdate(
      { user_ID: new_subscriber },
      { $addToSet: { subscribed_rooms: room_ID } }
    )
      .then(document => (userprops_document = document))
      .catch(error => res.status(400).send("Add subscriber failed."));
  }
  res.send({
    room_document: room_document,
    userprops_document: userprops_document
  });
});

router.put("/remove-subscriber", async function(req, res) {
  let room_ID = req.body.room_ID;
  let del_subscriber = req.body.uid;

  let room_document, userprops_document;
  await Room.findOneAndUpdate(
    {
      _id: room_ID,
      subscriber: { $in: del_subscriber },
      owner_ID: { $nin: del_subscriber }
    },
    { $pull: { subscriber: del_subscriber } }
  )
    .then(document => (room_document = document))
    .catch(error => res.status(400).send("Remove subscriber failed."));

  if (room_document) {
    await UserProps.findOneAndUpdate(
      { user_ID: del_subscriber, owned_rooms: { $nin: room_ID } },
      { $pull: { subscribed_rooms: room_ID } }
    )
      .then(document => (userprops_document = document))
      .catch(error => res.status(400).send("Add subscriber failed."));
  }
  res.send({
    room_document: room_document,
    userprops_document: userprops_document
  });
});

module.exports = router;
