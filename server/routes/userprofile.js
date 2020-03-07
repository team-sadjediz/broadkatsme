const express = require("express");
const router = express.Router();

const upload = require("../services/photo-upload");
const singleUpload = upload.single("image");

const UserProfile = require("../models/userprofile.model");
const User = require("../models/user.model");

// ---------------------------------------------------------- USER PROFILE EXISTS ----------------------------------------------------------

// router.get("/valid/:username", async function(req, res) {
//   let username = req.params.username;
//   await User.exists({ "username": username })
//     .then(exists => {
//       res.send(exists);
//     })
//     .catch(error => res.status(404).send(`User ${username} is not found.`));
// });

// ---------------------------------------------------------- FIND USER PROFILE ----------------------------------------------------------

router.get("/user-profile/:uid", async function(req, res) {
  let uid = req.params.uid;
  await UserProfile.findOne({ userID: uid })
    .then(userprofile => {
      let response = userprofile;
      res.send(response);
    })
    .catch(res.status(404).send(`User ${uid} profile is not found.`));
});

// ---------------------------------------------------------- UPLOAD USER PROF PIC ----------------------------------------------------------

// send json with: { folder: ..., uid: ..., image: ...}
// order is required
router.post("/upload-prof-img", function(req, res, next) {
  // to-do: do a check to see if the UID exists as either png or jpg
  singleUpload(req, res, error => {
    if (error) {
      console.log(error);
      res.json({ error: error });
    } else {
      if (req.file === undefined) {
        console.log("Error: No File Selected");
        res.json("Error: No File Selected");
      } else {
        const imageName = req.file.key;
        const imageLocation = req.file.location;

        res.json({ image: imageName, location: imageLocation });
      }
    }
  });
});

router.get("/set-username", async function(req, res, next) {
  let newUsername = req.query.requestedUsername;
  await User.findOne({ username: newUsername })
    .then(userprofile => {
      let response = userprofile;
      res.send(response);
    })
    .catch(res.status(404).send(`User ${uid} profile is not found.`));
});

router.get("/validate-username", async (req, res, next) => {
  const newUsername = req.query.requestedUsername;

  const userProfile = new UserProfile({
    "userID": "",
    "username": newUsername,
    "chatColor": "",
    "photoURL": "",
    "biography": "",
    "tags": [],
    "favorites": { movies: "", music: "", websites: "" },
    "privacy": true
  });

  userProfile
    .validate()
    .then(() => {
      res.status(200).send("good");
    })
    .catch(error => {
      console.log(error);
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
    });
});

module.exports = router;
