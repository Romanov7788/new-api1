const { Schema, model, ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const {enumStatusType} = require("./enum/status");

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  outcomingRequests: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      status: enumStatusType,
    },
  ],
  incomingRequests: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      status: enumStatusType,
    },
  ],
  rejectedRequests: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      status: enumStatusType,
    },
  ],
  friends: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      status: enumStatusType,
    },
  ],
});

module.exports = model("User", UserSchema);
