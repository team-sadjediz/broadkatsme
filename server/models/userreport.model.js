const mongoose = require("mongoose");

// const Grievance = new mongoose.Schema({
//   date: {
//     type: Date,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   }
// });

// const UserReport = new mongoose.Schema({
//   reporterUID: {
//     type: String,
//     required: true
//   },
//   reportedUID: {
//     type: String,
//     required: true
//   },
//   issue: [{ type: Grievance }]
// });

const Grievance = new mongoose.Schema({
  date: Date,
  description: String
});

const UserReport = new mongoose.Schema({
  reporterUID: String,
  reportedUID: String,
  issue: [{ type: Grievance }]
});

module.exports = mongoose.model("UserReport", UserReport);
