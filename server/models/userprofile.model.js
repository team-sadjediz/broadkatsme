const mongoose = require("mongoose");

const UserProfile = new mongoose.Schema({
  userID: String,
  photoURL: String,
  biography: String,
  tags: [String],
  favorites: { movies: String, music: String, websites: String },
  privacy: Boolean
});

module.exports = mongoose.model("UserProfile", UserProfile);
