var express = require("express");
var router = express.Router();

const Room = require("../models/room.model");

// ---------------------------------------------------------- SEARCH BY NAME ----------------------------------------------------------

// How To Use
// axios.get(`${BASE_API_URL}/search/name/${name}`)
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
// axios.get(`${BASE_API_URL}/search/tags`, null, { params: { tags: tags }})
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
    .catch(error => res.status(400).send(error));
});

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
