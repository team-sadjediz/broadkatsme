const express = require("express");
const router = express.Router();

const upload = require("../services/photo-upload");
const singleUpload = upload.single("image");

const UserProfile = require("../models/userprofile.model");

// ---------------------------------------------------------- FIND USER PROFILE ----------------------------------------------------------

router.get("/user-profile", async function(req, res) {
  let uid = req.query.uid;
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

module.exports = router;
