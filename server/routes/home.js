var express = require("express");
var router = express.Router();
// var random = require("mongoose-simple-random");

// const UserProfile = require("../models/userprofile.model");
// const UserProps = require("../models/userprops.model");
const Room = require("../models/room.model");

// ---------------------------------------------------------- GET RANDOM ROOMS ----------------------------------------------------------

// How To Use:
// axios.get(`${BASE_API_URI}/home/rooms, null, { params: { query: "" }})
// action = int (some int number)

// NOT HOOKED UP TO ERROR VALIDATION
// AUTOMATIC FUNCTION ERROR HANDLING INCLUDES NEGATIVE NUMBERS AND NON NUMBERS
// WILL RETURN NOTHING
// router.get("/rooms", async function(req, res) {
//   let roomNum = req.query.size;
//   // console.log(roomNum);
//   Room.findRandom({}, {}, { limit: roomNum }, function(error, rooms) {
//     if (error) {
//       res.send(error);
//     } else {
//       res.send(rooms);
//     }
//   });
// });

router.get("/rooms", async function(req, res) {
  let roomNum = req.query.size;
  // console.log(roomNum);
  let filter = {
    "settings.privacy": false,
    "subscribers.4": { $exists: false }
  };
  Room.findRandom(filter, {}, { limit: roomNum }, function(error, rooms) {
    if (error) {
      res.send(error);
    } else {
      res.send(rooms);
    }
  });
});

module.exports = router;
