// Chat model currently unrefined - to be edited on chat implementation.

const mongoose = require("mongoose");

// Each log represents a message sent by a user.
const Log = new mongoose.Schema({
  time_stamp: Date,
  user_ID: String,
  message: String
});

// Under the premise that chats are only available per room, each chat is associated per room ID.
const Chat = new mongoose.Schema({
  room_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  log: [{ type: Log }]
});

module.exports = mongoose.model("Chat", Chat);
