const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");


const UserSchema = new Schema({
  // name: {type: String, require: true},
  // email: {type: String, unique: true, required: true},
  // password: {type: String, require: true},
  // isActivated: {type: Boolean, default: false},
  // activationLink: {type: String},
  // friendship: [String]
  name: String,
  email: String,
  password: String,
  outcomingRequests: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      status: String,
    },
  ],
  incomingRequests: [
  {
    _id: Schema.ObjectId,
    status: String,
  },
  ],
  // rejectedRequests: [
  //   {
  //     _id: Schema.ObjectId,
  //     name: String,
  //     status: String,
  //   },
  // ],
  // friends: [
  //   {
  //     _id: Schema.ObjectId,
  //     name: String,
  //     status: String,
  //   },
  // ],
});

module.exports = model("User", UserSchema);
