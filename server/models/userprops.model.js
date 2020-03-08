const mongoose = require("mongoose");

// On user registration, user props is automatically created and inserted into DB with default values and appropriate user ID (retrieved from Firebase).
const UserProps = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  friends: {
    type: [String]
  },
  ownedRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  subscribedRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  favoritedRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
  notifications: [{ title: String, message: String }]
});

module.exports = mongoose.model("UserProps", UserProps);
