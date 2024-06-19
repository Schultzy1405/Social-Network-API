const { Schema, model } = require("mongoose");

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
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
