var express = require("express");
var router = express.Router();

const Room = require("../models/room.model");

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

router.get("/search-by-name", async function(req, res) {
  // Query DB for all rooms with these tags, send back room name, thumbnail, and tags
  let name = req.query.name;
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
