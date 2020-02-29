const mongoose = require("mongoose");

const Grievance = new mongoose.Schema({
  date: Date,
  description: String
});

const RoomReport = new mongoose.Schema({
  roomID: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
  issue: [{ type: Grievance }]
});

module.exports = mongoose.model("RoomReport", RoomReport);
