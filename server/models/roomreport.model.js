const mongoose = require("mongoose");

const Grievance = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const RoomReport = new mongoose.Schema({
  reporterUID: {
    type: String,
    required: true
  },
  roomID: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  issue: {
    type: [Grievance],
    required: true
  }
});

module.exports = mongoose.model("RoomReport", RoomReport);
