var express = require("express");
var router = express.Router();
var random = require("mongoose-simple-random");

const UserProfile = require("../models/userprofile.model");
const UserProps = require("../models/userprops.model");
const Room = require("../models/room.model");

// ---------------------------------------------------------- GET RANDOM ROOMS ----------------------------------------------------------

router.get("/get-random-rooms", async function(req, res) {
  let number_of_rooms = req.query.size;
  Room.findRandom({}, {}, { limit: number_of_rooms }, function(error, rooms) {
    if (error) {
      res.send(error);
    } else {
      res.send(rooms);
    }
  });
});

module.exports = router;
