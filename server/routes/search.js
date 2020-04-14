var express = require("express");
var router = express.Router();

const Room = require("../models/room.model");
const UserProfile = require("../models/userprofile.model");
const User = require("../models/user.model");

// ---------------------------------------------------------- SEARCH W/NAME & TAGS ----------------------------------------------------------

// IN PROGRESS

// router.get("/search-rooms", async function(req, res) {
//   let query = {};
//   let tags = [];
//   if (req.query.name) {
//     query = { ...query, "name": req.query.name };
//   }
//   if (req.query.tags) {
//     let tagSize = req.query.tags.length;
//     tags = req.query.tags;
//     if (req.query.tags.length > 1) {
//       query = { ...query, "tags.0": { $exists: true } };
//     }
//   }
//   console.log(tags);
//   console.log(query);
//   await Room.aggregate([
//     // { $match: { "tags.1": { $exists: true } } },
//     { $match: query },
//     {
//       $redact: {
//         $cond: [
//           { $gte: [{ $size: { $setIntersection: ["$tags", tags] } }, 1] },
//           "$$KEEP",
//           "$$PRUNE"
//         ]
//       }
//     }
//   ])
//     .then(documents => res.send(documents))
//     .catch(error => res.status(400).send("Search failed."));
// });

// ---------------------------------------------------------- SEARCH BY NAME ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/search/name/${name}`)
// returns all documents matching name (as per convention)
router.get("/name/:name", async function(req, res) {
  let name = req.params.name;
  await Room.find({ name: name }, function(error, room) {
    if (error) {
      res.send(error);
    } else {
      res.send(room);
    }
  });
});

// ---------------------------------------------------------- SEARCH BY TAGS ----------------------------------------------------------

// How To Use
// axios.put(`${BASE_API_URL}/search/tags/${tags}`)
// where tags = [String]
// returns all documents containing at least 2 of the send tags (as per convention)
router.get("/tags", async function(req, res) {
  let tags = req.query.tags;
  await Room.aggregate([
    { $match: { "tags.1": { $exists: true } } },
    {
      $redact: {
        $cond: [
          { $gte: [{ $size: { $setIntersection: ["$tags", tags] } }, 2] },
          "$$KEEP",
          "$$PRUNE"
        ]
      }
    }
  ])
    .then(documents => res.send(documents))
    .catch(error => res.status(400).send("Search by tags failed."));
});

module.exports = router;

// ---------------------------------------------------------- SEARCH BY ALL ----------------------------------------------------------
router.get('/rooms', async function(req, res) {
  Room.find({}, function(err, rooms) {
    var roomUrls = [];

    rooms.forEach(function(room) {
      roomUrls.push({
        "roomID": room._id,
        "name": room.name,
        "thumbnailUrl": room.thumbnailUrl,
        "tags": room.tags
      });
    });

    res.send(roomUrls);  
  });
});

// ---------------------------------------------------------- SEARCH USERNAMES ----------------------------------------------------------
router.get("/user/:username", async function(req, res) {
  let username = req.params.username;
  await UserProfile.find({ username: username })
  .then(user => {
    res.json(user);
  }).catch(error => {
    res.status(404).send(error);
  });
});
