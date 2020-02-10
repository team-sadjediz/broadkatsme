var express = require("express");
var router = express.Router();

router.get("/:roomname", function(req, res) {
  var roomID = req.body.roomID;
  res.send("Room info returned");
});

module.exports = router;
