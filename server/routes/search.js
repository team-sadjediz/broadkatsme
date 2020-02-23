var express = require("express");
var router = express.Router();

const Room = require("../models/room.model");

router.get("/search-by-name", async function(req, res) {
  // Query DB for all rooms with these tags, send back room name, thumbnail, and tags
  let name = req.body.name;
  await Room.find({ name: name }, function(error, room) {
    if (error) {
      res.send(error);
    } else {
      res.send(room);
    }
  });
  res.send("Rooms with requested tags sent back");
});

router.get("/search-by-tags", async function(req, res) {
  let tags = req.body.tags;
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
