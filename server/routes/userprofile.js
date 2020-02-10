const express = require("express");
const router = express.Router();

const UserProfile = require("../models/userprofile.model");

router.get("/user", async function(req, res) {
  let user_ID = req.body.uid;
  await UserProfile.find({ user_ID: user_ID }, function(error, userprofile) {
    console.log(JSON.stringify(userprofile));
    res.send(userprofile);
  });
  // res.send("User profile & props returned");
});

module.exports = router;
