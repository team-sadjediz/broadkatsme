const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const uniqueValidator = require("mongoose-unique-validator");

// incase we need MULTIPLE custom validators (mongoose does not natively support this)
const username_validator = [
  // example of custom validator:
  // validate({
  //   validator: function(value) {
  //     return !value.includes("z");
  //   },
  //   message: "username must not contain the letter Z"
  // }),
  validate({
    validator: "isAlphanumeric",
    passIfEmpty: true,
    message: "Name should contain only letters and numbers",
    type: "ALPHA_NUMBERIC"
  })
];

const UserProfile = new mongoose.Schema({
  userID: String,
  username: {
    type: String,
    unique: true,
    validate: username_validator
  },
  chatColor: String,
  photoURL: String,
  biography: String,
  tags: [String],
  favorites: { movies: String, music: String, websites: String },
  privacy: Boolean
});

UserProfile.plugin(uniqueValidator);

module.exports = mongoose.model("UserProfile", UserProfile);
