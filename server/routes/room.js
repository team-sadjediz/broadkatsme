var express = require("express");
var router = express.Router();

const Room = require("../models/room.model");

router.get("/:roomname", function(req, res) {
  var roomID = req.body.roomID;
  res.send("Room info returned");
});

router.get("/createroom", function(req, res) {
  let name = req.body.room_name;
  let owner_ID = req.body.uid;
  let subscribers = [];
  let tags = req.body.tags;
  // settings
  let room_size = req.body.room_size;
  let private = req.body.privacy;
  // access
  let del = req.body.uid;
  let roomAdmins = [req.body.username];
  let operator = [req.body.username];
  let invitation = [req.body.username];
  let banned = [req.body.username];
  // build models to push
});

module.exports = router;
