const express = require("express");
const router = express.Router();

const UserProps = require("../models/userprops.model");

// ---------------------------------------------------------- IN PROGRESS ----------------------------------------------------------

// How To Use:
// axios.put(`${BASE_API_URI}/friends/${uid}/${friendID}, null, { params: { action: "" }})
// action = "add" || "delete"
router.put("/update/:uid/:friendID", async function(req, res) {
  let userID = req.params.uid;
  let friendID = req.params.friendID;
  let action = req.query.action;

  // --------------------------------------------------------------------------
  if (action == "delete") {
    let userpropsDoc, friendpropsDoc;
    // There is no need for validation of checking if friend ID is a valid ID. An error
    // will catch from attempting to find a document that does not exist when searching
    // for friend ID.
    await UserProps.findOneAndUpdate(
      {
        userID: userID,
        friends: friendID
      },
      { $pull: { friends: friendID } },
      { runValidators: true, new: true }
    )
      .then(document => {
        // Error should throw and catch before here if no document is found/updated.
        userpropsDoc = document;
        return UserProps.findOneAndUpdate(
          { userID: friendID, friends: userID },
          { $pull: { friends: userID } },
          { runValidators: true, new: true }
        );
      })
      .then(document => {
        // Error should throw and catch before here if no document is found/updated.
        friendpropsDoc = document;
        res.send({
          userpropsDoc: userpropsDoc.friends,
          friendpropsDoc: friendpropsDoc.friends
        });
      })
      .catch(async error => {
        // If friend was removed from users list, but user was not removed from friends list (error was caught in the second update), re-add friend to users list.
        // POSSIBLE LEAK: DATA CORRUPTION IF THIS FAILS. SOLUTION: LOOP - NOT IMPLEMENTED / EXPENSIVE
        if (userpropsDoc && !friendpropsDoc) {
          await UserProps.findOneAndUpdate(
            {
              userID: userID,
              friends: friendID
            },
            { $addToSet: { friends: friendID } },
            { runValidators: true, new: true }
          );
        }
        res.status(400).send(error);
      });
    // --------------------------------------------------------------------------
  } else if (action == "add") {
    let userpropsDoc, friendpropsDoc;
    // There is no need for validation of checking if friend ID is a valid ID. An error
    // will catch from attempting to find a document that does not exist when searching
    // for friend ID.
    await UserProps.findOneAndUpdate(
      { userID: userID },
      { $addToSet: { friends: friendID } },
      { new: true }
    )
      .then(document => {
        // Error should throw and catch before here if no document is found/updated.
        userpropsDoc = document;
        return UserProps.findOneAndUpdate(
          { userID: friendID },
          { $addToSet: { friends: userID } },
          { runValidators: true, new: true }
        );
      })
      .then(document => {
        // Error should throw and catch before here if no document is found/updated.
        friendpropsDoc = document;
        res.send({
          userpropsDoc: userpropsDoc.friends,
          friendpropsDoc: friendpropsDoc.friends
        });
      })
      .catch(async error => {
        // If friend was added to users list, but user was not added to friends list (error was caught in the second update), remove friend from users list.
        // POSSIBLE LEAK: DATA CORRUPTION IF THIS FAILS. SOLUTION: LOOP - NOT IMPLEMENTED / EXPENSIVE
        if (userpropsDoc && friendpropsDoc == null) {
          await UserProps.findOneAndUpdate(
            { userID: userID },
            { $pull: { friends: friendID } },
            { runValidators: true, new: true }
          );
        }
        res.status(400).send(error);
      });
  } else {
    res.status(400).send("Action undefined.");
  }
});

module.exports = router;
