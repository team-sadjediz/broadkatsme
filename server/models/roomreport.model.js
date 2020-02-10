const mongoose = require("mongoose");

const Grievance = new mongoose.Schema({
  date: Date,
  description: String
});

const RoomReport = new mongoose.Schema({
  room_ID: String,
  issue: [{ type: Grievance }]
});

module.exports = mongoose.model("RoomReport", RoomReport);
