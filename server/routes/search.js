var express = require("express");
var router = express.Router();

const Room = require("../models/room.model");
const UserProfile = require("../models/userprofile.model");
const User = require("../models/user.model");

// ---------------------------------------------------------- SEARCH BY TAGS & NAME ----------------------------------------------------------

// How To Use
// axios.get(`${BASE_API_URL}/search/queries`, null, { params: { tags: tags, name: name }})
// returns all documents containing at least 1 of the sent tags, an optional name (if desired), privacy set to false, and room size
// not filled to capacity (5) (as per convention)
// can be adjusted to add more variables if desired
router.get("/queries", async function(req, res) {
  let tags = req.query.tags;
  let name = req.query.name;

  let queries = {};

  if (name) {
    queries.name = name;
  }

  if (!tags) {
    tags = [];
  }

  let numberMatchingTags = 1;

  await Room.aggregate([
    {
      $match: {
        "tags.0": { $exists: true },
        "settings.privacy": false,
        "subscribers.4": { $exists: false },
        ...queries
      }
    },
    {
      $redact: {
        $cond: [
          {
            $gte: [
              { $size: { $setIntersection: ["$tags", tags] } },
              numberMatchingTags
            ]
          },
          "$$KEEP",
          "$$PRUNE"
        ]
      }
    }
  ])
    .then(rooms => res.send(rooms))
    .catch(error => res.status(400).send(error));
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
