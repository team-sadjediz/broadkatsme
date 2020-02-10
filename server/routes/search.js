var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  // Query DB for all rooms with these tags, send back room name, thumbnail, and tags
  let tags = req.body.tags;
  res.send("Rooms with requested tags sent back");
});

module.exports = router;
