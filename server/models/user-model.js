const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  surname: { type: String, required: true },
  birthday: { type: String, required: true },
  gender: { type: String, required: true },
  avatar: { type: String },
  profileName: { type: String, unique: true, default: "" },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
});

module.exports = model("User", UserSchema);
