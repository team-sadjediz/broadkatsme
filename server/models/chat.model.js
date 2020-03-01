// Chat model currently unrefined - to be edited on chat implementation.

const mongoose = require("mongoose");

// Each log represents a message sent by a user.
const Log = new mongoose.Schema({
  timeStamp: Date,
  userID: String,
  message: String
});

// Under the premise that chats are only available per room, each chat is associated per room ID.
const Chat = new mongoose.Schema({
  roomID: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  log: [{ type: Log }]
});

module.exports = mongoose.model("Chat", Chat);
