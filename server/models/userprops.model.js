const mongoose = require("mongoose");

// On user registration, user props is automatically created and inserted into DB with default values and appropriate user ID (retrieved from Firebase).
const UserProps = new mongoose.Schema({
  user_ID: String,
  friends: [String],
  owned_rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  // subscribed_rooms: [String],
  subscribed_rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  favorited_rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  notifications: [{ title: String, message: String }]
});

module.exports = mongoose.model("UserProps", UserProps);
