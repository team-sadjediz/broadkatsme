const mongoose = require("mongoose");

const Access = new mongoose.Schema({
  operator: [{ type: String }],
  invitation: [{ type: String }],
  kick: [{ type: String }],
  room_size: Number,
  privacy: Boolean
});

const Room_Settings = new mongoose.Schema({
  name: String,
  rating_label: [{ type: String }],
  access: Access
});

// Room ID is identified by the naturally generated _id value
const Room = new mongoose.Schema({
  //   room_ID: String,
  owner_ID: String,
  subscriber: [{ type: String }],
  settings: Room_Settings
});

module.exports = mongoose.model("Room", Room);
