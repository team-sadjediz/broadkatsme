// This model is for reference.

// When a user registers, firebase authentication will generate a UID with various other properties.
// Server will retrieve UID and post to default linked profile object and default linked archive object.

const mongoose = require("mongoose");

const User = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", User);
