var express = require("express");
var router = express.Router();

// NOTE: SEND BACK UNIQUE KEYS (BETTER FOR FRONT-END)
router.get("/user", function(req, res) {
  // User's personalized home page should display: owned rooms, subscribed rooms, favorited rooms, friends, username, notifications
  // General display: random rooms (it's thumbnail, name, and tags)
  var userID = req.body.userID;
  res.send("Send back user props.");
});

module.exports = router;
