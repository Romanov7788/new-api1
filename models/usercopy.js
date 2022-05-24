const mongoose = require('mongoose');

//use Schema
const userSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  lastname: String,
  password: String,
  outcomingRequest: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
    },
  ],
  inputRequest: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
    },
  ],
  rejectedRequest: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
    },
  ],
  friendsList: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      name: String,
    },
  ]
});


const user = mongoose.model('User', userSchema);
module.exports = user;


// const Friends = mongoose.model('friends', friendsSchema);
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const friendsSchema = new Schema({
//     name: {
//         type: String,
//     },
//     lastname: {
//         type: String,
//     },
//     sendRequest:[
//       {
//         name: { type: String, default: '' },
//       },
//     ],
//     request:[
//       {
//         userId:{type:mongoose.Schema.Types.ObjectId},
//         name: { type: String, default: '' },
//       },
//     ],
//     friendsList: [
//       {
//         friendId: { type: mongoose.Schema.Types.ObjectId },
//         friendName: { type: String, default: '' },
//       },
//     ],
//     totalRequest: { type: Number, default: 0 },
// });

// const Friends = mongoose.model('friends', friendsSchema);

// module.exports = Friends;