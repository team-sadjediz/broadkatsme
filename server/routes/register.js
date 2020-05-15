var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const UserProfile = require("../models/userprofile.model");
const UserProps = require("../models/userprops.model");

// router.post("/new-user", async function(req, res) {
//   // console.log(req);
//   const userID = req.body.uid;
//   const username = req.body.username;
//   const defaulPhotoUrl = "default1.png";
//   const defaultChatColor = "#000000";

//   let userProfile = new UserProfile({
//     "userID": userID,
//     "username": username,
//     "chatColor": defaultChatColor,
//     "photoURL": defaulPhotoUrl,
//     "biography": "",
//     "tags": [],
//     "favorites": { movies: "", music: "", websites: "" },
//     "privacy": true
//   });

//   let userProps = new UserProps({
//     "userID": userID,
//     "friends": [],
//     "ownedRooms": [],
//     "subscribedRooms": [],
//     "favoritedRooms": [],
//     "notifications": []
//   });

//   let savedProfile = await userProfile
//     .save()
//     .then(document => {
//       // console.log(document);
//       console.log("Saved UserProfile:", document);
//       return document.userID;
//     })
//     .catch(error => {
//       const errorList = error.errors;
//       const errorKeys = Object.keys(errorList);
//       console.log("ALL ERRORS", errorKeys);

//       let e;
//       errorKeys.forEach(errorType => {
//         console.log("type", errorList[errorType].properties.type);
//         console.log("msg", errorList[errorType].properties.message);
//         e = {
//           type: errorList[errorType].properties.type,
//           msg: errorList[errorType].properties.message
//         };
//       });

//       res.status(422).send(e);

//       return null;
//     });

//   if (savedProfile) {
//     await userProps
//       .save()
//       .then(document => {
//         // console.log(document);
//         console.log("Saved UserProp:", document);
//         return document.userID;
//       })
//       .catch(error => res.status(400).send("User Props insert failed."));
//   }
// });

router.post("/new-user", async function (req, res) {
  // console.log(req);
  console.log("called here");
  console.log(req.body);
  const userID = req.body.uid;
  const username = req.body.username;
  const defaulPhotoUrl = "default1.png";
  const defaultChatColor = "#000000";
  try {
    let response = await createUser(
      userID,
      username,
      defaulPhotoUrl,
      defaultChatColor
    );
    console.log(response);
    res.send(response);
  } catch (error) {
    res.status(422).send(error);
  }
});

async function createUser(userID, username, defaulPhotoUrl, defaultChatColor) {
  const session = await mongoose.startSession();

  console.log("userid", userID);
  let userProfile = new UserProfile({
    "userID": userID,
    "username": username,
    "chatColor": defaultChatColor,
    "photoURL": defaulPhotoUrl,
    "biography": "",
    "tags": [],
    "favorites": { movies: "", music: "", websites: "" },
    "privacy": true,
  });

  let userProps = new UserProps({
    "userID": userID,
    "friends": [],
    "ownedRooms": [],
    "subscribedRooms": [],
    "favoritedRooms": [],
    "notifications": [],
  });

  session.startTransaction();
  try {
    const opts = { session, runValidators: true };

    let savedProfile = await userProfile.save(opts);
    let savedProps = await userProps.save(opts);

    await session.commitTransaction();
    session.endSession();
    return { savedProfile, savedProps };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    error.additional = "Error has occurred in /register/new-user";
    throw error;
  }
}

module.exports = router;
