var express = require("express");
var router = express.Router();

const UserProfile = require("../models/userprofile.model");
const UserProps = require("../models/userprops.model");

router.post("/new-user", async function(req, res) {
  // console.log(req);

  const userID = req.body.uid;
  const username = req.body.username;
  const defaulPhotoUrl = "default1.png";
  const defaultChatColor = "#000000";

  console.log("userid", userID);
  let userProfile = new UserProfile({
    "userID": userID,
    "username": username,
    "chatColor": defaultChatColor,
    "photoURL": defaulPhotoUrl,
    "biography": "",
    "tags": [],
    "favorites": { movies: "", music: "", websites: "" },
    "privacy": true
  });

  let userProps = new UserProps({
    "userID": userID,
    "friends": [],
    "ownedRooms": [],
    "subscribedRooms": [],
    "favoritedRooms": [],
    "notifications": []
  });

  let savedProfile = await userProfile
    .save()
    .then(document => {
      // console.log(document);
      console.log("Saved UserProfile:", document);
      return document.userID;
    })
    .catch(error => {
      const errorList = error.errors;
      const errorKeys = Object.keys(errorList);
      console.log("ALL ERRORS", errorKeys);

      let e;
      errorKeys.forEach(errorType => {
        console.log("type", errorList[errorType].properties.type);
        console.log("msg", errorList[errorType].properties.message);
        e = {
          type: errorList[errorType].properties.type,
          msg: errorList[errorType].properties.message
        };
      });

      res.status(422).send(e);

      return null;
    });

  if (savedProfile) {
    await userProps
      .save()
      .then(document => {
        // console.log(document);
        console.log("Saved UserProp:", document);
        res.status(200).send("perfect");
        return document.userID;
      })
      .catch(error => res.status(400).send("User Props insert failed."));
  }
});

module.exports = router;
