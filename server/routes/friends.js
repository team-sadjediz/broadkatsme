const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const UserProps = require("../models/userprops.model");
const UserProfile = require("../models/userprofile.model");

// ---------------------------------------------------------- IN PROGRESS ----------------------------------------------------------

// How To Use:
// axios.put(`${BASE_API_URI}/friends/update/${uid}/${friendID}, null, { params: { action: "" }})
// action = "add" || "delete"
router.put("/update/:uid/:friendID", async function (req, res) {
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

// How To Use
// axios.put(`${BASE_API_URL}/friends/friends-list/${uid}`)
// returns list of all rooms a user is subscribed to (as per convnetion)
router.get("/friends-list/:uid", async function (req, res) {
  let uid = req.params.uid;
  console.log("uid", uid);

  let friendslist = [];
  await UserProps.findOne({ userID: uid })
    .then(async (document) => {
      // return UserProps.findOne({ userID: uid }).populate("subscribedRooms");
      // res.send(document.friends);

      await UserProfile.find({
        "userID": {
          $in: document.friends,
        },
      }).then((friendslistProfiles) => {
        console.log("friendslist profiles:", friendslistProfiles);
        res.send(friendslistProfiles);
      });

      // document.friends.forEach(async friend => {
      //   await UserProfile.findOne({ userID: friend });
      //   friendslist.push({ friendID: friend });
      // });
    })
    .catch((error) => {
      error.additional = "Error has occured in /friends-list/:uid";
      res.status(404).send(error);
    });
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
    session.endSession();
    // console.log("Friend delete - session committed");
    return { userProps, friendProps };
  } catch (error) {
    // console.log(error);
    await session.abortTransaction();
    session.endSession();
    error.additional =
      "Error has occured in /friends/update/:uid/:friendID with action='delete'";
    throw error;
    // return error;
  }
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
    session.endSession();
    // console.log("Friend add - session committed.");
    return { userProps, friendProps };
  } catch (error) {
    // console.log(error);
    await session.abortTransaction();
    session.endSession();
    error.additional =
      "Error has occured in /friends/update/:uid/:friendID with action='add'";
    throw error;
    // return error;
  }
}

module.exports = router;
