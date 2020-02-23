const express = require("express");
const router = express.Router();

const UserProps = require("../models/userprops.model");

// ---------------------------------------------------------- IN PROGRESS ----------------------------------------------------------

router.put("/add-friend", async function(req, res) {
  let user_ID = req.body.uid;
  let friend_ID = req.body.friend_uid;

  let userprops_document, friendprops_document;
  await UserProps.findOneAndUpdate(
    { user_ID: user_ID },
    { $addToSet: { friends: friend_ID } }
  )
    .then(document => (userprops_document = document))
    .catch(error => res.status(400).send("Add friend failed."));

  if (userprops_document) {
    await UserProps.findOneAndUpdate(
      { user_ID: friend_ID },
      { $addToSet: { friends: user_ID } }
    )
      .then(document => (friendprops_document = document))
      .catch(error => res.status(400).send("Add subscriber failed."));
  }
  res.send({
    userprops_document: userprops_document,
    friendprops_document: friendprops_document
  });
});

router.put("/remove-friend", async function(req, res) {
  let user_ID = req.body.uid;
  let friend_ID = req.body.friend_uid;

  let userprops_document, friendprops_document;
  await Room.findOneAndUpdate(
    {
      user_ID: user_ID,
      friends: { $in: friend_ID }
    },
    { $pull: { friends: friend_ID } }
  )
    .then(document => (userprops_document = document))
    .catch(error => res.status(400).send("Remove friend failed."));

  if (userprops_document) {
    await UserProps.findOneAndUpdate(
      { user_ID: friend_ID, friends: { $nin: user_ID } },
      { $pull: { friends: user_ID } }
    )
      .then(document => (friendprops_document = document))
      .catch(error => res.status(400).send("Add subscriber failed."));
  }
  res.send({
    userprops_document: userprops_document,
    friendprops_document: friendprops_document
  });
});

module.exports = router;
