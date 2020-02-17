const express = require("express");
const router = express.Router();

const upload = require("../services/photo-upload");
const singleUpload = upload.single("image");

const UserProfile = require("../models/userprofile.model");

router.get("/user", async function(req, res) {
  let user_ID = req.body.uid;
  await UserProfile.find({ user_ID: user_ID }, function(error, userprofile) {
    console.log(JSON.stringify(userprofile));
    res.send(userprofile);
  });
});

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
