const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.statics.register = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled!");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid!");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough!");
  }

  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("Email already in use!");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled!");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Invalid account!");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid account!");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
