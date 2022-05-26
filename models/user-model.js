const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  outcomingRequests: [
    {
      _id: Schema.ObjectId,
      name: String,
      status: String,
    },
  ],
  incomingRequests: [
    {
      _id: Schema.ObjectId,
      name: String,
      status: String,
    },
  ],
  rejectedRequests: [
    {
      _id: Schema.ObjectId,
      status: String,
    },
  ],
  friends: [
    {
      _id: Schema.ObjectId,
      status: String,
    },
  ],
});

module.exports = model("User", UserSchema);
