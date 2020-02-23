const mongoose = require("mongoose");
const random = require("mongoose-simple-random");

const Access = new mongoose.Schema({
  delete: String, // Only room owner is allowed to delete a room / remove an operator / kick a subscriber (contains owner ID)
  roomAdmins: [{ type: String }], // ID's of those who can: add operators, change privacy...
  operator: [{ type: String }], // ID's of operators
  invitation: [{ type: String }], // ID's of those who can invite
  //   kick: [{ type: String }], // ID's of those who can kick
  banned: [{ type: String }] // ID of those who are banned
});

const Room_Settings = new mongoose.Schema({
  room_size: Number,
  private: Boolean,
  access: Access
});

// Room ID is identified by the naturally generated _id value
const Room = new mongoose.Schema({
  //   room_ID: String,
  name: String,
  owner_ID: String,
  thumbnail_url: String,
  subscriber: [{ type: String }],
  tags: [{ type: String }],
  settings: Room_Settings
});

Room.plugin(random);

module.exports = mongoose.model("Room", Room);
