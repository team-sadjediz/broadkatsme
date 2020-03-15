const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const UserProps = require("../models/userprops.model");

// ---------------------------------------------------------- IN PROGRESS ----------------------------------------------------------

// How To Use:
// axios.put(`${BASE_API_URI}/friends/${uid}/${friendID}, null, { params: { action: "" }})
// action = "add" || "delete"

router.put("/update/:uid/:friendID", async function(req, res) {
  let userID = req.params.uid;
  let friendID = req.params.friendID;
  let action = req.query.action;

  if (action == "delete") {
    try {
      let newProps = await deleteFriend(userID, friendID);
      res.send(newProps);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  } else if (action == "add") {
    try {
      let newProps = await addFriend(userID, friendID);
      res.send(newProps);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  } else {
    res.status(400).send("Action undefined.");
  }
});

async function deleteFriend(userID, friendID) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true, runValidators: true };

    let userProps = await UserProps.findOneAndUpdate(
      { userID: userID, friends: friendID },
      { $pull: { friends: friendID } },
      opts
    );

    let friendProps = await UserProps.findOneAndUpdate(
      { userID: friendID, friends: userID },
      { $pull: { friends: userID } },
      opts
    );

    await session.commitTransaction();
    console.log("Friend delete - session committed");
    return { userProps, friendProps };
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
  }
  session.endSession();
}

async function addFriend(userID, friendID) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true, runValidators: true };

    let userProps = await UserProps.findOneAndUpdate(
      { userID: userID },
      { $addToSet: { friends: friendID } },
      opts
    );

    let friendProps = await UserProps.findOneAndUpdate(
      { userID: friendID },
      { $addToSet: { friends: userID } },
      opts
    );

    await session.commitTransaction();
    console.log("Friend add - session committed.");
    return { userProps, friendProps };
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
  }
  session.endSession();

  // try {
  //   const opts = { session, new: true, runValidators: true };
  //   mongoose.startSession().then(session => {
  //     session.withTransaction(async () => {
  //       let userProps = await UserProps.findOneAndUpdate(
  //         { userID: userID },
  //         { $addToSet: { friends: friendID } },
  //         opts
  //       );

  //       let friendProps = await UserProps.findOneAndUpdate(
  //         { userID: friendID },
  //         { $addToSet: { friends: userID } },
  //         opts
  //       );
  //     });
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
}

module.exports = router;
