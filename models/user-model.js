const { Schema, model, ObjectId } = require("mongoose");
const mongoose = require("mongoose");

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  outcomingRequests: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      status: { type: String,
      enum: []
      }
    },
  ],
  incomingRequests: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      status: String,
    },
  ],
  rejectedRequests: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      status: String,
    },
  ],
  friends: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      status: String,
    },
  ],
});

module.exports = model("User", UserSchema);
