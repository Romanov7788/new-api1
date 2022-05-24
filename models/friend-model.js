const { Schema, model } = require("mongoose");

const addFriendsSchema = new Schema({
  id: { type: String },
  _ids: { type: Array },
});

module.exports = model("addFriends", addFriendSchema);
