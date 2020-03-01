const mongoose = require("mongoose");
const random = require("mongoose-simple-random");

const Access = new mongoose.Schema({
  delete: String, // Only room owner is allowed to delete a room / remove an operator / kick a subscriber (contains owner ID)
  roomAdmins: [String], // ID's of those who can: add operators, change privacy...
  operators: [String], // ID's of operators
  invitations: [String], // ID's of those who can invite
  //   kick: [{ type: String }], // ID's of those who can kick
  bans: [String] // ID of those who are banned
});

const RoomSettings = new mongoose.Schema({
  roomSize: Number,
  privacy: Boolean,
  access: Access
});

// Room ID is identified by the naturally generated _id value
const Room = new mongoose.Schema({
  //   room_ID: String,
  name: String,
  ownerID: String,
  thumbnailUrl: String,
  active: Boolean,
  subscribers: [{ type: String }],
  tags: [{ type: String }],
  settings: RoomSettings
});

Room.plugin(random);

module.exports = mongoose.model("Room", Room);
