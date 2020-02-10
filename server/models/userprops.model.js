const mongoose = require("mongoose");

// On user registration, user props is automatically created and inserted into DB with default values and appropriate user ID (retrieved from Firebase).
const UserProps = new mongoose.Schema({
  user_ID: String,
  friends: [String],
  owned_rooms: [String],
  subscribed_rooms: [String],
  favorited_rooms: [String],
  notifications: [{ title: String, message: String }]
});

module.exports = mongoose.model("UserProps", UserProps);
