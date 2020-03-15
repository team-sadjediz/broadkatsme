const mongoose = require("mongoose");
const random = require("mongoose-simple-random");
const integerValidator = require("mongoose-integer");

// const Access = new mongoose.Schema({
//   delete: {
//     type: String,
//     required: true
//   }, // Only room owner is allowed to delete a room / remove an operator / kick a subscriber (contains owner ID)
//   roomAdmins: {
//     type: [String],
//     required: true
//   }, // ID's of those who can: add operators, change privacy...
//   operators: {
//     type: [String],
//     required: true
//   }, // ID's of operators
//   invitations: {
//     type: [String],
//     required: true
//   }, // ID's of those who can invite
//   //   kick: [{ type: String }], // ID's of those who can kick
//   bans: [String] // ID of those who are banned
// });

// const RoomSettings = new mongoose.Schema({
//   roomSize: {
//     type: Number,
//     required: true,
//     validate: {
//       validator: Number.isInteger,
//       message: "{VALUE} is not an integer value"
//     },
//     min: 1,
//     max: 5
//   },
//   privacy: {
//     type: Boolean,
//     required: true
//   },
//   access: Access
// });

// // Room ID is identified by the naturally generated _id value
// const Room = new mongoose.Schema({
//   //   room_ID: String,
//   name: {
//     type: String,
//     required: true
//   },
//   ownerID: {
//     type: String,
//     required: true
//   },
//   thumbnailUrl: {
//     type: String,
//     required: true
//   },
//   active: {
//     type: Boolean,
//     required: true
//   },
//   subscribers: {
//     type: [String],
//     required: true
//     // validate: {
//     //   // Applies only on creation (save) as validate is not applicable to $addToSet
//     //   validator: function() {
//     //     console.log(this.subscribers.length > 1 && this.subscribers.length < 5);
//     //     return this.subscribers.length > 1 && this.subscribers.length < 5;
//     //   },
//     //   message: "{PATH} exceends limit of (5)"
//     // }
//   },
//   tags: {
//     type: [String]
//   },
//   settings: RoomSettings
// });

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
  subscribers: [String],
  tags: [String],
  settings: RoomSettings
});

Room.plugin(random);

module.exports = mongoose.model("Room", Room);
