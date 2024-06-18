const { Schema, Types } = require("mongoose");
const thoughtSchema = require("./Thought.js");

var validateEmail = function (email) {
  var emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailValidation.test(email);
};

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "Please enter a valid email."],
  },
  thoughts: [thoughtSchema],
  friends: [userSchema],
});

const User = model("user", userSchema);

module.exports = User;
