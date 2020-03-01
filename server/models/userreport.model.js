const mongoose = require("mongoose");

const Grievance = new mongoose.Schema({
  date: Date,
  description: String
});

const UserReport = new mongoose.Schema({
  userID: String,
  issue: [{ type: Grievance }]
});

module.exports = mongoose.model("UserReport", UserReport);
