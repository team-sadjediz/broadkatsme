const mongoose = require("mongoose");

// On user registration, user props is automatically created and inserted into DB with default values and appropriate user ID (retrieved from Firebase).
const UserProps = new mongoose.Schema({
  user_ID: String,
  friends: [{ type: String }],
  owned_rooms: [{ type: String }],
  subscribed_rooms: [{ type: String }],
  favorited_rooms: [{ type: String }]
});

module.exports = mongoose.model("UserProps", UserProps);
