const mongoose = require("mongoose");

// On user registration, a user profile is automatically created and inserted into DB with default values and appropriate user ID (retrieved from Firebase).
// Profile picture is stored on firebase storage (retrieved by photo URL).
// User Profile are profile values added onto user object that are not offered by firebase.
const UserProfile = new mongoose.Schema({
  user_ID: String,
  //   profile_picture: String,
  biography: String,
  tags: [String],
  favorites: { movies: String, music: String, websites: String },
  privacy: Boolean
});

module.exports = mongoose.model("UserProfile", UserProfile);
