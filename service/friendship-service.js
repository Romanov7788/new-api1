// const addFriendModel = require("../models/friend-model");

// class FriendShipService {
//   async addFriends(myId, friendsId) {
//     const candidate = await addFriendModel.create({ myId, friendsId });
//     return candidate;
//   }
// }

// module.exports = new FriendShipService();

const { resolveHostname } = require("nodemailer/lib/shared");
const UserModel = require("../models/user-model");

class FriendShipService {
  async addFriends(friendsId, myId) {
    UserModel.updateOne(
      {
        _id: friendsId,
      },
      {
        $push: {
          incomingRequests: {
            _id: myId,
            status: "Pending",
          },
        },
      },
      function () {
        UserModel.updateOne(
          {
            _id: myId,
          },
          {
            $push: {
              outcomingRequests: {
                _id: friendsId,
                status: "Pending",
              },
            },
          },
          function () {}
        );
      }
    );
  }
}

module.exports = new FriendShipService();
