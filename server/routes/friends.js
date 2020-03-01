const express = require("express");
const router = express.Router();

const UserProps = require("../models/userprops.model");

// ---------------------------------------------------------- IN PROGRESS ----------------------------------------------------------

router.put("/add-friend", async function(req, res) {
  let userID = req.body.uid;
  let friendID = req.body.friendUid;

  let userpropsDoc, friendpropsDoc;
  await UserProps.findOneAndUpdate(
    { userID: userID },
    { $addToSet: { friends: friendID } }
  )
    .then(document => (userpropsDoc = document))
    .catch(error => res.status(400).send("Add friend failed."));

  if (userpropsDoc) {
    await UserProps.findOneAndUpdate(
      { userID: friendID },
      { $addToSet: { friends: userID } }
    )
      .then(document => (friendpropsDoc = document))
      .catch(error => res.status(400).send("Add subscriber failed."));
  }
  res.send({
    userpropsDoc: userpropsDoc,
    friendpropsDoc: friendpropsDoc
  });
});

router.put("/remove-friend", async function(req, res) {
  let userID = req.body.uid;
  let friendID = req.body.friend_uid;

  let userpropsDoc, friendpropsDoc;
  await Room.findOneAndUpdate(
    {
      userID: userID,
      friends: { $in: friendID }
    },
    { $pull: { friends: friendID } }
  )
    .then(document => (userpropsDoc = document))
    .catch(error => res.status(400).send("Remove friend failed."));

  if (userpropsDoc) {
    await UserProps.findOneAndUpdate(
      { userID: friendID, friends: { $nin: userID } },
      { $pull: { friends: userID } }
    )
      .then(document => (friendpropsDoc = document))
      .catch(error => res.status(400).send("Add subscriber failed."));
  }
  res.send({
    userpropsDoc: userpropsDoc,
    friendpropsDoc: friendpropsDoc
  });
});

module.exports = router;
