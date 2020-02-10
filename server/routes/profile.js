var express = require("express");
var router = express.Router();

router.get("/:username", function(req, res) {
  var username = req.params.username;
  res.send("User profile & props returned");
});

module.exports = router;
