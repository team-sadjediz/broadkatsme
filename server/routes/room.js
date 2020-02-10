var express = require("express");
var router = express.Router();

router.get("/:roomname", function(req, res) {
  var roomID = req.body.roomID;
  res.send("Room info returned");
});

router.get("/createroom", function(req, res) {
  var name = req.body.room_name;
  var owner_ID = req.body.uid;
  var subscribers = [];
  var rating_label = req.body.tags;
  // settings
  var room_size = req.body.room_size;
  var private = req.body.private;
  // access
  var del = req.body.uid;
  var roomAdmins = [req.body.username];
  var operator = [req.body.username];
  var invitation = [req.body.username];
  var banned = [req.body.username];
});

module.exports = router;
